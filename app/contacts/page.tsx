"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const form = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    setLoading(true);

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setSubmitted(true);
        form.current?.reset();
        setLoading(false);

        // Hide message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-black mb-4">
          Contact Me
        </h2>
        <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
          I’m happy you decided to reach out. Please fill the form below with
          your message.
        </p>

        {/* Success Message */}
        {submitted && (
          <p className="text-center text-green-600 font-medium mb-6">
            ✅ Your message has been sent successfully!
          </p>
        )}

        {/* Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-white border border-gray-300 text-black px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full bg-white border border-gray-300 text-black px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
            />
            <input
              type="text"
              name="title"
              placeholder="Subject"
              required
              className="w-full bg-white border border-gray-300 text-black px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500"
            />
          </div>

          {/* Right Column */}
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows={9}
              required
              className="w-full bg-white border border-gray-300 text-black px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder-gray-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-start col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-md font-semibold transition duration-300 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black hover:bg-gray-900 text-white"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
