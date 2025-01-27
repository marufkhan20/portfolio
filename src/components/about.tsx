"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  CodepenIcon as Css3,
  Database,
  Heading5Icon as Html5,
  CodepenIcon as Javascript,
  CodepenIcon as React,
  Server,
} from "lucide-react";

const skills = [
  { name: "HTML", icon: Html5 },
  { name: "CSS", icon: Css3 },
  { name: "JavaScript", icon: Javascript },
  { name: "React", icon: React },
  { name: "Database", icon: Database },
  { name: "Backend", icon: Server },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground">
            {"I'm"} a full-stack developer passionate about building digital
            experiences that are both beautiful and functional. With expertise
            in modern web technologies, I create solutions that make a
            difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-primary/20">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <skill.icon className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-medium">{skill.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
