"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects({ published: true });

  if (isLoading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="text-sm font-medium">My Work</span>
            </div>
            <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full mx-auto" />
              <Skeleton className="h-5 w-5/6 mx-auto" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Skeleton className="h-12 w-40 rounded-full mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !projects) {
    return (
      <section id="projects" className="py-20">
        <div className="container px-4 mx-auto text-center">
          Failed to load projects
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-40 right-[10%] w-16 h-16 border-2 border-primary/10 rounded-full z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[15%] w-12 h-12 border-2 border-primary/10 rotate-45 z-0"
        animate={{ rotate: [45, 90, 45] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
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
            <span className="text-sm font-medium">My Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Here are some of my recent projects. Each one is crafted with
            attention to detail and modern best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden h-full flex flex-col border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <Link href={`/projects/${project.id}`}>
                  <div className="overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-48 w-full"
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <span className="text-white font-medium">
                          View Details
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </Link>
                <CardContent className="p-6 flex-grow">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {project.category || "Web Development"}
                    </span>
                  </div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground mb-4">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech.id}
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0 border-t border-border/50">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-primary hover:underline flex items-center text-sm"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="rounded-full px-8 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              View All Projects
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col border-primary/10">
      <div className="h-48 w-full bg-muted animate-pulse" />
      <CardContent className="p-6 flex-grow">
        <div className="mb-2">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-7 w-3/4 mb-3" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0 border-t border-border/50">
        <Skeleton className="h-5 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}
