'use client';

import React from 'react';
import ProjectTemplate from '@/components/work/ProjectTemplate';

export default function BirdieProjectPage() {
  return (
    <ProjectTemplate
      title="Birdie"
      subtitle="A Fresh Air Monitor"
      description={[
        "Birdie is an innovative fresh air monitor designed to help people ensure they have healthy indoor air quality. The device monitors CO2 levels and alerts users when it's time to ventilate.",

        "We worked with Birdie to create a brand identity and website that reflects the product's clean, minimalist design and focus on health and wellbeing.",

        "The website showcases the product's features and benefits, with a focus on simplicity and ease of use. We used a clean, modern design with plenty of white space to reflect the product's aesthetic.",

        "The visual identity uses a fresh, contemporary color palette with soft gradients and minimal design elements to convey the product's focus on clean air and healthy living."
      ]}
      imageUrl="https://ext.same-assets.com/152564834/1725000487.webp"
    />
  );
}
