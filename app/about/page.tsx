// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Intro Section */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">
          About Bruce Rashid
        </h2>
        <div className="md:flex md:justify-between md:items-start gap-10">
          <div className="md:w-1/2 space-y-4">
            <p>
              I strive to build meaningful software that solves real-world
              problems. From automating student life with Lumina to building
              KarmaCredit to gamify social good, every project I create is a
              reflection of purpose and creativity.
            </p>
            <p>
              I'm deeply passionate about the intersection of AI and software,
              currently pursuing software engineering while actively
              contributing to tech-forward startups. Whether it's writing code,
              leading projects, or mentoring peers, I find joy in creating,
              learning, and growing.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 mt-8 md:mt-0">
            <Image
              src="/about/bruce1.jpg"
              alt="Bruce portrait"
              width={500}
              height={500}
              className="rounded-lg object-cover h-full w-full"
            />
            <Image
              src="/about/bruce2.jpg"
              alt="Bruce working"
              width={500}
              height={500}
              className="rounded-lg object-cover h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-2">Awards & Recognition</h3>
          <ul className="space-y-2 text-sm">
            <li>🏆 MavPitch Finalist - AI for Academic Success</li>
            <li>🚀 HackDartmouth Winner - Smart Healthcare Assistant</li>
            <li>🎖️ BRAC Top 3 Student Projects (2025)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">GitHub</h3>
          <p className="text-sm">
            50+ repositories
            <br />
            10,000+ total contributions
            <br />
            <a
              href="https://github.com/rashidulas"
              target="_blank"
              className="text-blue-500 underline"
            >
              github.com/rashidulas
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
          <p className="text-sm">
            2.3K+ connections
            <br />
            <a
              href="https://linkedin.com/in/rashidulas"
              target="_blank"
              className="text-blue-500 underline"
            >
              linkedin.com/in/rashidulas
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
