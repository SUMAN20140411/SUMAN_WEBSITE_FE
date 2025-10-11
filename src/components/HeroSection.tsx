// src/components/HeroSection.tsx
import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  backgroundImage: string;
  trimTopCm?: number;           // default 0
  trimBottomCm?: number;        // default 0
}


export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="hero-section relative h-[230px] md:h-[309px] lg:h-[333px] flex items-center text-white overflow-hidden">
      <Image
        src={backgroundImage}
        alt={`${title} 배경 이미지`}
        fill
        priority
        className="object-cover object-center"
      />

      {/* 어둡게 오버레이 - motion.div는 z-index, position, w-full 역할만 남김 */}
      <motion.div
        className="relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Container untuk max-w-7xl mx-auto dan header dengan padding seimbang */}
        <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-lg md:text-xl font-medium">{subtitle}</p>
        </div>
      </motion.div>
    </section>
  );
}
