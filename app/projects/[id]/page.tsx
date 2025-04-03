"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProject } from "@/hooks/use-projects";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Layers,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: project, isLoading, error } = useProject(id);

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Failed to load project</h2>
          <p className="text-muted-foreground mb-6">
            There was an error loading this project.
          </p>
          <Button asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/20 text-primary border border-primary/30">
                <span className="text-sm font-medium">
                  {project.category || "Web Development"}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2 justify-center">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-background/10 backdrop-blur-sm text-white rounded-full text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container px-4 mx-auto py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <motion.div
            className="flex-1 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <section>
              <h2 className="text-2xl font-bold mb-6 inline-block relative">
                Project Overview
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h2>
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 inline-block relative">
                Key Features
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h2>
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="p-6 border border-primary/10 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: feature.content }}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            {project.gallery.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 inline-block relative">
                  Project Gallery
                  <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="rounded-lg overflow-hidden border border-primary/10 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || `${project.title} screenshot`}
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-white">
                            {image.alt ||
                              `${project.title} screenshot ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="md:w-80 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <h3 className="text-lg font-medium mb-2 inline-block relative">
                Project Links
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h3>
              <div className="flex flex-col gap-3">
                {project.demo && (
                  <Button
                    className="w-full rounded-lg relative overflow-hidden group"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="relative z-10 flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button
                    variant="outline"
                    className="w-full rounded-lg border-primary/20"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <h3 className="text-lg font-medium mb-2 inline-block relative">
                Technologies
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <h3 className="text-lg font-medium mb-2 inline-block relative">
                Project Details
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 text-primary mr-3" />
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">
                      {project.category || "Web Development"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-primary mr-3" />
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Layers className="h-4 w-4 text-primary mr-3" />
                  <div>
                    <p className="text-muted-foreground">Project Type</p>
                    <p className="font-medium">
                      {project.featured
                        ? "Featured Project"
                        : "Standard Project"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 bg-muted/30">
              <h3 className="text-lg font-medium mb-4 inline-block relative">
                Interested in a similar project?
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-primary/20 rounded-full"></span>
              </h3>
              <p className="text-muted-foreground mb-4">
                Let's discuss how I can help bring your ideas to life.
              </p>
              <Button
                className="w-full rounded-lg relative overflow-hidden group"
                asChild
              >
                <Link href="/#contact">
                  <span className="relative z-10">Get in Touch</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container px-4 mx-auto text-center">
            <div className="space-y-6">
              <Skeleton className="h-8 w-32 mx-auto rounded-full" />
              <Skeleton className="h-16 w-3/4 mx-auto" />
              <div className="flex flex-wrap gap-2 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container px-4 mx-auto py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-12">
            <Skeleton className="h-6 w-32" />

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="md:w-80 space-y-8">
            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <Skeleton className="h-6 w-32" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 space-y-6 bg-muted/30">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/10 p-6 bg-muted/30">
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
