"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAbout } from "@/hooks/use-about";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  CodepenIcon as Css3,
  Database,
  Globe,
  Heading5Icon as Html5,
  CodepenIcon as Javascript,
  Layers,
  CodepenIcon as React,
  Server,
} from "lucide-react";

// Map of icon names to components
const iconMap: Record<string, any> = {
  Html5,
  Css3,
  Javascript,
  React,
  Database,
  Server,
  Code,
  Layers,
  Cpu,
  Globe,
};

export default function About() {
  const { data: about, isLoading, error } = useAbout();

  if (isLoading) {
    return (
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/50 -z-10" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="text-sm font-medium">About Me</span>
            </div>
            <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full mx-auto" />
              <Skeleton className="h-5 w-5/6 mx-auto" />
              <Skeleton className="h-5 w-4/6 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="border-primary/10">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-primary/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Skeleton className="h-10 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !about) {
    return (
      <section id="about" className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          Failed to load about section
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-muted/50 -z-10" />
      <div className="absolute top-40 right-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-16 h-16 border-2 border-primary/10 rounded-lg z-0"
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-12 h-12 border-2 border-primary/10 rotate-45 z-0"
        animate={{ y: [-10, 10] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
            <span className="text-sm font-medium">About Me</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{about.title}</h2>
          <p className="text-muted-foreground text-lg">{about.description}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {about.skills.map((skill, index) => {
            const IconComponent = skill.icon ? iconMap[skill.icon] : Database;

            return (
              <motion.div
                key={skill.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-primary/10 hover:border-primary/30 transition-colors overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg">{skill.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <StatCard number="4+" label="Years Experience" />
          <StatCard number="40+" label="Projects Completed" />
          <StatCard number="25+" label="Happy Clients" />
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <Card className="border-primary/10 overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            {number}
          </div>
          <p className="text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
