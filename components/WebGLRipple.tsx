"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  GLSL — shared full-screen quad vertex shader
// ─────────────────────────────────────────────────────────────────────────────
const VERT_SRC = /* glsl */ `
  attribute vec2 a_pos;
  varying   vec2 v_uv;
  void main() {
    // v_uv is in [0,1]² — (0,0) = bottom-left in GL convention
    v_uv        = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  GLSL — wave-equation simulation pass
//
//  Solves the discrete 2-D wave equation each frame:
//    next = damping * (2*curr - prev + c² * ∇²curr)
//  then stamps a Gaussian impulse at the mouse position.
// ─────────────────────────────────────────────────────────────────────────────
const SIM_FRAG_SRC = /* glsl */ `
  precision highp float;

  uniform sampler2D uCurr;         // current   height field  (R channel)
  uniform sampler2D uPrev;         // previous  height field  (R channel)
  uniform vec2      uTexel;        // vec2(1/simW, 1/simH)
  uniform vec2      uMouse;        // cursor in [0,1]² GL-coords (y flipped)
  uniform float     uSplash;       // 1.0 while mouse is over canvas
  uniform float     uSplashRadius; // Gaussian sigma (normalised)
  uniform float     uDamping;      // energy decay per frame
  uniform float     uWaveSpeed;    // c² coefficient for Laplacian

  varying vec2 v_uv;

  void main() {
    // ── 5-point Laplacian ──────────────────────────────────────────────────
    float curr = texture2D(uCurr, v_uv).r;
    float prev = texture2D(uPrev, v_uv).r;

    float n = texture2D(uCurr, v_uv + vec2( 0.0,        uTexel.y)).r;
    float s = texture2D(uCurr, v_uv + vec2( 0.0,       -uTexel.y)).r;
    float e = texture2D(uCurr, v_uv + vec2( uTexel.x,   0.0     )).r;
    float w = texture2D(uCurr, v_uv + vec2(-uTexel.x,   0.0     )).r;

    float laplacian = n + s + e + w - 4.0 * curr;

    // ── Wave equation ──────────────────────────────────────────────────────
    float next = uDamping * (2.0 * curr - prev + uWaveSpeed * laplacian);

    // ── Mouse impulse — smooth Gaussian stamp ──────────────────────────────
    if (uSplash > 0.5) {
      vec2  d  = v_uv - uMouse;
      float r2 = dot(d, d);
      float s2 = uSplashRadius * uSplashRadius;
      // Cubic-attenuated Gaussian for a softer, rounder edge
      float gauss  = exp(-r2 / s2);
      float smooth = gauss * gauss * (3.0 - 2.0 * gauss); // smoothstep-like profile
      next -= smooth * 0.45;
    }

    // Prevent runaway amplification
    next = clamp(next, -1.0, 1.0);

    gl_FragColor = vec4(next, next, next, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  GLSL — display / displacement pass
//
//  Reads the height-field gradient (surface normal) and uses it to offset
//  the scene image UVs — producing a liquid refraction effect.
//
//  UV mapping:  "object-fit: cover" is replicated in GLSL so the image
//  always fills the canvas correctly regardless of aspect-ratio mismatch.
//  Y is corrected for WebGL's bottom-up convention (UNPACK_FLIP_Y ensures the
//  texture itself is stored the right way, matching v_uv.y = 0 = bottom).
// ─────────────────────────────────────────────────────────────────────────────
const DISP_FRAG_SRC = /* glsl */ `
  precision highp float;

  uniform sampler2D uScene;       // background image (flipped at upload)
  uniform sampler2D uHeight;      // current height field
  uniform vec2      uSimTexel;    // 1/simResolution — for gradient sampling
  uniform float     uStrength;    // displacement magnitude
  uniform float     uAspectCanvas;// W/H of the display canvas
  uniform float     uAspectImage; // W/H of the source image

  varying vec2 v_uv;

  // Map [0,1]² screen UV → "object-fit: cover" image UV
  vec2 coverUV(vec2 uv) {
    if (uAspectCanvas > uAspectImage) {
      // Canvas is wider: height is the limiting axis → compress v
      float ratio = uAspectImage / uAspectCanvas;
      uv.y = (uv.y - 0.5) * ratio + 0.5;
    } else {
      // Canvas is taller: width is the limiting axis → compress u
      float ratio = uAspectCanvas / uAspectImage;
      uv.x = (uv.x - 0.5) * ratio + 0.5;
    }
    return uv;
  }

  void main() {
    // ── 9-tap weighted gradient (smoother than 4-tap central diff) ─────────
    vec2 tx = uSimTexel;

    // Cardinal neighbours (weight 2)
    float hN  = texture2D(uHeight, v_uv + vec2( 0.0,  tx.y)).r;
    float hS  = texture2D(uHeight, v_uv + vec2( 0.0, -tx.y)).r;
    float hE  = texture2D(uHeight, v_uv + vec2( tx.x,  0.0)).r;
    float hW  = texture2D(uHeight, v_uv + vec2(-tx.x,  0.0)).r;

    // Diagonal neighbours (weight 1)
    float hNE = texture2D(uHeight, v_uv + vec2( tx.x,  tx.y)).r;
    float hNW = texture2D(uHeight, v_uv + vec2(-tx.x,  tx.y)).r;
    float hSE = texture2D(uHeight, v_uv + vec2( tx.x, -tx.y)).r;
    float hSW = texture2D(uHeight, v_uv + vec2(-tx.x, -tx.y)).r;

    // Sobel-style gradient (normalised by kernel weight sum = 8)
    vec2 gradient = vec2(
      (2.0*(hE - hW) + (hNE - hNW) + (hSE - hSW)) / 8.0,
      (2.0*(hN - hS) + (hNE - hSE) + (hNW - hSW)) / 8.0
    );

    // ── Apply cover-UV mapping, then add displacement ─────────────────────
    vec2 baseUV = coverUV(v_uv);
    vec2 dispUV = clamp(baseUV + gradient * uStrength, 0.0, 1.0);

    vec4 color = texture2D(uScene, dispUV);

    // Subtle specular shimmer on wave crests (additive white highlight)
    float height = texture2D(uHeight, v_uv).r;
    float spec   = smoothstep(0.015, 0.12, height) * 0.14;
    color.rgb   += spec;

    gl_FragColor = color;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
    throw new Error("Shader compile error:\n" + gl.getShaderInfoLog(sh));
  return sh;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, vs, gl.VERTEX_SHADER));
  gl.attachShader(prog, compileShader(gl, fs, gl.FRAGMENT_SHADER));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
    throw new Error("Program link error:\n" + gl.getProgramInfoLog(prog));
  return prog;
}

type FBO = { fb: WebGLFramebuffer; tex: WebGLTexture };

function createFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fb, tex };
}

/**
 * Upload an HTMLImageElement as a WebGL texture.
 * UNPACK_FLIP_Y_WEBGL = true  →  origin is top-left (matches CSS / normal image
 * convention) so v_uv.y = 1 samples the TOP of the image, which is what we want
 * when rendering a full-screen quad where v_uv.y = 1 = screen top.
 */
function imageToTexture(
  gl: WebGLRenderingContext,
  img: HTMLImageElement
): WebGLTexture {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // Flip Y so texture rows match CSS image orientation
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); // restore default
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface WebGLRippleProps {
  /** Relative or absolute URL of the background image (same-origin). */
  src: string;
  className?: string;
}

export default function WebGLRipple({ src, className = "" }: WebGLRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── WebGL context ────────────────────────────────────────────────────────
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;

    if (!gl) { console.warn("WebGL unavailable"); return; }

    if (!gl.getExtension("OES_texture_float")) {
      console.warn("OES_texture_float unavailable – ripple disabled");
      return;
    }
    gl.getExtension("OES_texture_float_linear"); // graceful fallback

    // ── Full-screen quad ──────────────────────────────────────────────────────
    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    // ── Programs ──────────────────────────────────────────────────────────────
    const simProg = createProgram(gl, VERT_SRC, SIM_FRAG_SRC);
    const dispProg = createProgram(gl, VERT_SRC, DISP_FRAG_SRC);

    // ── Mutable render state ──────────────────────────────────────────────────
    let W = 0, H = 0, SW = 0, SH = 0;
    let fbos: [FBO, FBO, FBO] | null = null;
    let curr = 0, prev = 1, older = 2; // ring-buffer indices

    // Scene image context
    let sceneTex: WebGLTexture | null = null;
    let imgW = 1, imgH = 1; // natural image dimensions

    let raf = 0;
    const mouse = { x: 0.5, y: 0.5, active: false };

    // ── Re-allocate FBOs on canvas resize ────────────────────────────────────
    const initBuffers = () => {
      W = Math.max(1, canvas.offsetWidth);
      H = Math.max(1, canvas.offsetHeight);
      canvas.width = W;
      canvas.height = H;

      // Simulation at ½ res — plenty for smooth waves, huge perf saving
      SW = Math.max(1, W >> 1);
      SH = Math.max(1, H >> 1);

      if (fbos) {
        fbos.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tex); });
      }
      fbos = [createFBO(gl, SW, SH), createFBO(gl, SW, SH), createFBO(gl, SW, SH)];
      curr = 0; prev = 1; older = 2;
    };
    initBuffers();

    // ── Load scene image ──────────────────────────────────────────────────────
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;
      sceneTex = imageToTexture(gl, img);
    };
    img.src = src;

    // ── Input handling ────────────────────────────────────────────────────────
    const onMove = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (cx - r.left) / r.width;
      // Flip Y: CSS y=0 is top; GL v_uv y=0 is bottom
      mouse.y = 1.0 - (cy - r.top) / r.height;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };

    const onMM = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTM = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); };

    canvas.addEventListener("mousemove", onMM, { passive: true });
    canvas.addEventListener("mouseleave", onLeave, { passive: true });
    canvas.addEventListener("touchmove", onTM, { passive: false });
    canvas.addEventListener("touchend", onLeave, { passive: true });

    const ro = new ResizeObserver(initBuffers);
    ro.observe(canvas);

    // ── Rendering helpers ─────────────────────────────────────────────────────
    const bindQuad = (prog: WebGLProgram) => {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
      const loc = gl.getAttribLocation(prog, "a_pos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const bindTex = (prog: WebGLProgram, name: string, tex: WebGLTexture, unit: number) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(gl.getUniformLocation(prog, name), unit);
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!sceneTex || !fbos) return;

      const f = fbos;

      // ── SIMULATION PASS (write into "older" slot) ─────────────────────────
      gl.bindFramebuffer(gl.FRAMEBUFFER, f[older].fb);
      gl.viewport(0, 0, SW, SH);
      bindQuad(simProg);
      bindTex(simProg, "uCurr", f[curr].tex, 0);
      bindTex(simProg, "uPrev", f[prev].tex, 1);
      gl.uniform2f(gl.getUniformLocation(simProg, "uTexel"), 1 / SW, 1 / SH);
      gl.uniform2f(gl.getUniformLocation(simProg, "uMouse"), mouse.x, mouse.y);
      gl.uniform1f(gl.getUniformLocation(simProg, "uSplash"), mouse.active ? 1.0 : 0.0);
      // ↓ 60% smaller radius than the original 0.06  →  0.024
      gl.uniform1f(gl.getUniformLocation(simProg, "uSplashRadius"), 0.008);
      // ↓ Higher damping  →  ripples settle much faster (~0.4 s)
      gl.uniform1f(gl.getUniformLocation(simProg, "uDamping"), 0.991);
      // ↓ Lower wave speed  →  soft, viscous propagation
      gl.uniform1f(gl.getUniformLocation(simProg, "uWaveSpeed"), 0.18);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // advance ring buffer
      const nxt = older; older = prev; prev = curr; curr = nxt;

      // ── DISPLAY PASS (to screen) ──────────────────────────────────────────
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, W, H);
      bindQuad(dispProg);
      bindTex(dispProg, "uScene", sceneTex, 0);
      bindTex(dispProg, "uHeight", f[curr].tex, 1);
      // 9-tap Sobel gradient is sampled at sim-resolution texel size
      gl.uniform2f(gl.getUniformLocation(dispProg, "uSimTexel"), 1 / SW, 1 / SH);
      // Slightly reduced displacement strength for a delicate, subtle look
      gl.uniform1f(gl.getUniformLocation(dispProg, "uStrength"), 2.8);
      // Aspect ratios for CSS object-fit:cover UV mapping
      gl.uniform1f(gl.getUniformLocation(dispProg, "uAspectCanvas"), W / H);
      gl.uniform1f(gl.getUniformLocation(dispProg, "uAspectImage"), imgW / imgH);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    loop();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMM);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTM);
      canvas.removeEventListener("touchend", onLeave);
      ro.disconnect();
      gl.deleteBuffer(quadBuf);
      gl.deleteProgram(simProg);
      gl.deleteProgram(dispProg);
      fbos?.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tex); });
      if (sceneTex) gl.deleteTexture(sceneTex);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block", cursor: "crosshair" }}
    />
  );
}
