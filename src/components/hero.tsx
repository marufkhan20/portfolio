"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/yourusername",
    },
    {
      name: "Fiverr",
      icon: ExternalLink,
      url: "https://fiverr.com/yourusername",
    },
    {
      name: "Upwork",
      icon: ExternalLink,
      url: "https://upwork.com/yourusername",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="container px-4 py-32 mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, {"I'm"}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                Maruf
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Next.js Developer
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Crafting digital experiences through clean code and creative
              design
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" asChild>
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto lg:ml-auto"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-2 border-primary/20 overflow-hidden">
                <Image
                  src="/me.png"
                  alt="Maruf"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
