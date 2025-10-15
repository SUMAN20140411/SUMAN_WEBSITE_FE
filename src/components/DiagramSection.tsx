// components/DiagramSection.tsx
"use client";

import { motion } from "framer-motion";
import { Factory, Handshake, BarChart3 } from "lucide-react";

export default function DiagramSection() {
  return (
    <section className="w-full bg-[#2C3E50] py-16 px-4 md:px-8 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text */}
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white">Biz Model</h2>
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            확신(Confidence)의 &ldquo;종합 솔루션 서비스&rdquo;를<br />
            제공하는 &ldquo;신뢰의 강한 기업&rdquo;
          </p>
        </div>

        {/* Right Side: Circular Diagram */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-[400px] h-[400px]">
            
            {/* Outer Ring Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700/20 to-slate-900/30"></div>
            
            {/* Section 01 - Manufacturing (Upper Left Arc) */}
            <div className="absolute inset-0">
              <svg width="400" height="400" className="absolute inset-0">
                <defs>
                  <linearGradient id="manufacturingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                </defs>
                <path
                  d="M 200 40 A 160 160 0 0 1 340 140 L 260 160 A 80 80 0 0 0 200 120 Z"
                  fill="url(#manufacturingGrad)"
                />
              </svg>
              <div className="absolute top-16 left-16 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-cyan-300">01</span>
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold mb-1">Manufacturing</h4>
                <p className="text-xs leading-tight">
                  제조부품/개발부문<br />
                  ITEM 조기 정착 /<br />
                  Mass Product 안정화
                </p>
              </div>
            </div>

            {/* Section 02 - Partnerships (Upper Right Arc) */}
            <div className="absolute inset-0">
              <svg width="400" height="400" className="absolute inset-0">
                <defs>
                  <linearGradient id="partnershipsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
                <path
                  d="M 340 140 A 160 160 0 0 1 360 200 A 160 160 0 0 1 340 260 L 260 240 A 80 80 0 0 0 280 200 A 80 80 0 0 0 260 160 Z"
                  fill="url(#partnershipsGrad)"
                />
              </svg>
              <div className="absolute top-24 right-8 text-white text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Handshake className="w-5 h-5" />
                  <span className="text-2xl font-bold">02</span>
                </div>
                <h4 className="text-sm font-bold mb-1">Partnerships</h4>
                <p className="text-xs leading-tight">
                  신사업Biz / R&D<br />
                  신사업 발굴/ITEM PJT<br />
                  R&BD Base / 차별화
                </p>
              </div>
            </div>

            {/* Section 03 - R&BD Development (Bottom Arc) */}
            <div className="absolute inset-0">
              <svg width="400" height="400" className="absolute inset-0">
                <defs>
                  <linearGradient id="rndGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a7f3d0" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60 140 A 160 160 0 0 1 340 260 L 260 240 A 80 80 0 0 0 140 160 Z"
                  fill="url(#rndGrad)"
                />
              </svg>
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#1e40af]">03</span>
                  <BarChart3 className="w-5 h-5 text-[#1e40af]" />
                </div>
                <h4 className="text-sm font-bold text-[#1e40af] mb-1">R&BD / Development</h4>
                <p className="text-xs text-[#1e40af] leading-tight">
                  R&BD 조기사업화 /<br />
                  차세대 성장동력 확보
                </p>
              </div>
            </div>

            {/* Center Circle - Open Innovation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex flex-col items-center justify-center border-4 border-white/20">
              <h3 className="text-lg font-bold text-white text-center leading-tight">
                Open<br />Innovation
              </h3>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
