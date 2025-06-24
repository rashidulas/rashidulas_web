"use client";

import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  github?: string;
  website?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  github,
  website,
}: ProjectCardProps) {
  return (
    <div className="cursor-pointer flex flex-col h-full">
      <Link
        href={`/portfolio/${id}`}
        className="block overflow-hidden rounded-lg shadow"
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
          initial={{ scale: 1.1, rotate: 2, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </Link>

      <div className="flex-1 mt-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex gap-3 text-gray-600 text-base">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}
