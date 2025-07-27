"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const navLinks = [
  { id: "home", title: "HOME", url: "/" },
  { id: "about", title: "ABOUT ME", url: "/about" },
  { id: "portfolio", title: "PORTFOLIO", url: "/portfolio" },
  { id: "resume", title: "RESUME", url: "/resume.pdf", external: true },
  { id: "contacts", title: "CONTACTS", url: "/contacts" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div
            className={`text-xl font-bold ${
              isHome ? "text-black" : "text-gray-800"
            }`}
          >
            RashidulAS
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.id}>
              {link.external ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium transition-colors ${
                    isHome
                      ? "text-black hover:text-gray-700"
                      : pathname === link.url
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  href={link.url}
                  className={`text-sm font-medium transition-colors ${
                    isHome
                      ? "text-black hover:text-gray-700"
                      : pathname === link.url
                      ? "text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
          <li className="flex space-x-4">
            <a
              href="https://github.com/rashidulas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                className={
                  isHome
                    ? "text-black hover:text-gray-700"
                    : "text-gray-700 hover:text-black"
                }
                size={18}
              />
            </a>
            <a
              href="https://linkedin.com/in/rashidulas"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className={
                  isHome
                    ? "text-black hover:text-gray-700"
                    : "text-gray-700 hover:text-black"
                }
                size={18}
              />
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="sm:hidden">
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? <IoMdClose size={24} /> : <RxHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div className="sm:hidden mt-4 px-4 py-4 bg-white shadow rounded-b-xl transition-all duration-300">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.external ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-sm font-medium ${
                      pathname === link.url ? "text-black" : "text-gray-700"
                    }`}
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    href={link.url}
                    className={`block text-sm font-medium ${
                      pathname === link.url ? "text-black" : "text-gray-700"
                    }`}
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
            <li className="flex space-x-4">
              <a
                href="https://github.com/rashidulas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub
                  className="text-gray-700 hover:text-black"
                  size={18}
                />
              </a>
              <a
                href="https://linkedin.com/in/rashidulas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="text-gray-700 hover:text-black"
                  size={18}
                />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
