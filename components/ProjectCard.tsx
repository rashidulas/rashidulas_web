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
  tags?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  github,
  website,
  tags,
}: ProjectCardProps) {
  return (
    <div className="cursor-pointer">
      <Link href={`/portfolio/${id}`}>
        <div className="overflow-hidden w-full h-64 rounded-sm">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.3, rotate: 5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
      </Link>

      <div className="mt-4">
        <p className="text-sm italic text-gray-500">{tags}</p>

        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold mt-1">{title}</h3>
          <div className="flex gap-3 text-gray-600 text-base mt-1">
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
