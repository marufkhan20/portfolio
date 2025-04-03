"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHero } from "@/hooks/use-hero";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const { data: hero, isLoading, error } = useHero();
  const [scrollIndicator, setScrollIndicator] = useState(true);

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

        {/* Animated background gradient */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="container px-4 py-32 mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content skeleton */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="w-40 h-8 bg-primary/10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-12 w-1/2" />
              </div>
              <Skeleton className="h-8 w-5/6" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </div>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-36 rounded-full" />
                <Skeleton className="h-12 w-36 rounded-full" />
              </div>
            </div>

            {/* Profile image skeleton */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-xl bg-primary/10 -z-10" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-purple-400/10 -z-10" />

                {/* Main image container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-400/20 to-pink-400/20 blur-xl" />

                  {/* Image frame */}
                  <div className="relative w-full h-full rounded-3xl border-2 border-primary/20 overflow-hidden backdrop-blur-sm bg-background/30 p-4">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-muted animate-pulse" />
                  </div>

                  {/* Experience badge */}
                  <div className="absolute -right-4 top-1/4 bg-background border border-border shadow-lg rounded-full px-4 py-2">
                    <Skeleton className="h-6 w-32" />
                  </div>

                  {/* Projects completed badge */}
                  <div className="absolute -left-4 bottom-1/4 bg-background border border-border shadow-lg rounded-full px-4 py-2">
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !hero) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Failed to load hero section
          </h2>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      {/* Animated background gradient */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 right-[20%] w-16 h-16 border-2 border-primary/20 rounded-lg z-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[15%] w-20 h-20 border-2 border-primary/20 rounded-full z-0"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-[30%] left-[10%] w-12 h-12 border-2 border-primary/20 rotate-45 z-0"
        initial={{ y: -20 }}
        animate={{ y: 20 }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="container px-4 py-32 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 text-primary border border-primary/20">
                <span className="text-sm font-medium">
                  Available for freelance work
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                  {hero.name}
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 rounded-lg -z-10"></span>
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {hero.title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {hero.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              {hero?.fiverr && (
                <motion.a
                  href={hero.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-colors bg-[#1DBF73]/10 text-[#1DBF73] hover:bg-[#1DBF73]/20`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + 0 * 0.1, duration: 0.5 }}
                >
                  <img src="/fiverr.png" alt="" />
                  <span className="sr-only">Fiverr</span>
                </motion.a>
              )}

              {hero?.upwork && (
                <motion.a
                  href={hero.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-colors bg-[#6FDA44]/10 text-[#6FDA44] hover:bg-[#6FDA44]/20`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + 0 * 0.1, duration: 0.5 }}
                >
                  <img src="/upwork.png" alt="" />
                  <span className="sr-only">Upwork</span>
                </motion.a>
              )}

              {hero?.github && (
                <motion.a
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-colors bg-gray-500/10 text-gray-500 hover:bg-gray-500/20`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + 0 * 0.1, duration: 0.5 }}
                >
                  <Github />
                  <span className="sr-only">Github</span>
                </motion.a>
              )}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              {/* <Button size="lg" variant="outline" className="rounded-full px-8">
                Download CV
              </Button> */}
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-xl bg-primary/10 -z-10"
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl bg-purple-400/10 -z-10"
                animate={{ rotate: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-purple-400/20 to-pink-400/20 blur-xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Image frame */}
                <div className="relative w-full h-full rounded-3xl border-2 border-primary/20 overflow-hidden backdrop-blur-sm bg-background/30 p-4">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={hero.image || "/placeholder.svg"}
                      alt={hero.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Experience badge */}
                <motion.div
                  className="absolute -right-4 top-2/4 bg-background border border-border shadow-lg rounded-full px-4 py-2 flex items-center"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.7 }}
                >
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span className="font-medium">4+ Years Experience</span>
                </motion.div>

                {/* Projects completed badge */}
                <motion.div
                  className="absolute -left-4 bottom-1/4 bg-background border border-border shadow-lg rounded-full px-4 py-2 flex items-center"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.7 }}
                >
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                  <span className="font-medium">40+ Projects</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      {scrollIndicator && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          <span className="text-sm text-muted-foreground mb-2">
            Scroll down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
