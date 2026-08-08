"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[#FCF8F5] overflow-hidden">
      {/* Left Form Section */}
      <div className="flex-1 flex flex-col p-6  overflow-y-auto h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-120 bg-white rounded-2xl shadow-xl shadow-orange-900/5 p-8  m-auto"
        >
          {children}
        </motion.div>
      </div>

      {/* Right Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-black h-screen overflow-hidden">
        {/* Layer 1: Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-img.png"
            alt="Fixera Background"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Layer 2: Animated Text */}
        <div className="absolute inset-0 z-10 p- flex pt-4  justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight text-center drop-shadow-xl">
              Metale nefes,<br />
              işinize yön verin.
            </h1>
          </motion.div>
        </div>

        {/* Layer 3: Foreground Image (Transparent PNG) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Image
            src="/removed-img.png"
            alt="Fixera Foreground"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
        </div>

        {/* Layer 4: Logo */}
        <div className="absolute bottom-12 right-12 z-30 pointer-events-none">
          <Image
            src="/logos/logo.png"
            alt="Fixera Logo"
            width={180}
            height={60}
            className="object-contain object-right"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
