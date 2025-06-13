"use client";

import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X (formerly Twitter)

export default function Footer() {
  return (
    <footer className="text-white text-center">
      {/* White section */}
      <div className="bg-[#F5F6F7] text-[#0B0F1A] py-16">
        <h2 className="text-3xl font-semibold mb-4">Social Media</h2>
        <p className="mb-6 text-lg">Find me on social media</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl hover:text-gray-700" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <SiX className="text-2xl hover:text-black" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-pink-500" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-blue-600" />
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-[#0B0F1A] text-sm text-gray-400 py-6">
        © 2025 Jorge Gabriel Azevedo.{" "}
        <a href="/legal" className="text-blue-400 hover:underline">
          Legal Disclaimer
        </a>
      </div>
    </footer>
  );
}
