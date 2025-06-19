'use client';

import React from 'react';
import ProjectTemplate from '@/components/work/ProjectTemplate';

export default function CurbProjectPage() {
  return (
    <ProjectTemplate
      title="CURBCPH"
      subtitle="A new appearance"
      description={[
        "CURBCPH is a dynamic media platform celebrating urban culture, fashion, and lifestyle in Copenhagen. We worked with them to elevate their digital presence and create a fresh new appearance for their brand.",

        "The objective was to create a visual identity and website that captures the vibrant energy of Copenhagen's urban culture scene while providing an intuitive platform for content discovery.",

        "Our approach focused on bold typography, a dynamic color palette, and an immersive user experience that showcases CURBCPH's diverse content in an engaging way.",

        "The responsive website features fluid animations, dynamic content blocks, and a custom content management system that makes it easy for the CURBCPH team to publish and manage their expanding library of articles, videos, and photo essays."
      ]}
      videoUrl="https://ext.same-assets.com/152564834/2466347151.mp4"
    />
  );
}
