"use client";

interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

const certifications: Certification[] = [
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "June 2025",
    credentialUrl: "https://www.credly.com/badges/your-link",
  },
  {
    name: "CS50: Computer Science Courses and Programs from Harvard",
    issuer: "Harvard University",
    issueDate: "April 2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/your-link",
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Certifications</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Verified certificates of achievement and professional growth.
          </p>
        </div>

        <div className="space-y-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border-l-4 border-grey-600 pl-6 relative"
            >
              <div className="absolute top-0 -left-2 w-4 h-4 bg-white rounded-full shadow-lg" />
              <h3 className="text-xl font-semibold">{cert.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Issued by <strong>{cert.issuer}</strong> · {cert.issueDate}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-white-600 hover:underline text-sm font-medium"
                >
                  View Credential →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
