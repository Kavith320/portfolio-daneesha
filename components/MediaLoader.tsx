"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaLoaderProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function MediaLoader({
  src,
  alt,
  className = "",
  imageClassName = "",
  fill = true,
  priority = false,
}: MediaLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const isVideo = src ? src.match(/\.(mp4|webm|ogg|mov)$/i) : false;

  return (
    <div key={src} className={`relative overflow-hidden ${className}`}>
      {/* Rose Gold Shimmer Skeleton */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10 w-full h-full shimmer-bg"
          />
        )}
      </AnimatePresence>

      {/* Actual Media Content */}
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      ) : (
        <Image
          src={src || "/images/placeholder.png"}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 800px"
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
          onError={() => setIsLoaded(true)} // Dismiss skeleton on error
        />
      )}
    </div>
  );
}
