"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-white text-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg" // 👈 Replace with your image
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-4">
        <div className="w-36 h-36 md:w-40 md:h-40 border-4 border-white rounded-full overflow-hidden mb-6">
          <Image
            src="/profile.jpg" // 👈 Replace with your profile image
            alt="Profile"
            width={160}
            height={160}
            objectFit="cover"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold">
          Hello I'm Jorge Gabriel Azevedo
        </h1>
        <p className="text-base md:text-lg mt-2">
          I'm a passionate Web Developer
        </p>
      </div>
    </section>
  );
}
