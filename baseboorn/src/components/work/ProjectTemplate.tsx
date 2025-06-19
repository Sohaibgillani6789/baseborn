'use client';

import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectTemplateProps {
  title: string;
  subtitle: string;
  description: string[];
  imageUrl?: string;
  videoUrl?: string;
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  videoUrl,
}) => {
  // Create a unique hash for each paragraph to use as a key
  const createHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  };

  return (
    <div className="px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <Link href="/work" className="text-secondary hover:text-white transition-colors duration-300 inline-flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>

          <h1 className="baseborn-title text-4xl md:text-5xl lg:text-6xl mb-4">{title}</h1>
          <p className="text-xl text-secondary">{subtitle}</p>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-lg mb-16">
          {videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-accent/20 flex items-center justify-center">
              <p className="text-secondary">Project Preview</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {description.map((paragraph) => (
              <p key={createHash(paragraph)} className="mb-6 text-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <div className="bg-accent/10 p-6 rounded-lg">
              <h3 className="text-xl mb-4">Project Details</h3>
              <div className="text-secondary">
                <p className="mb-2">Client: {title}</p>
                <p className="mb-2">Year: 2024</p>
                <p className="mb-2">Services:</p>
                <ul className="list-disc pl-5">
                  <li>Branding</li>
                  <li>Web Design</li>
                  <li>Web Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
