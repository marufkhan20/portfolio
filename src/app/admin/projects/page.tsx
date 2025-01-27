/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// This would come from your database
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js",
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com/username/project",
    demo: "https://demo.project.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A React-based task management application",
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com/username/project",
    demo: "https://demo.project.com",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js",
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com/username/project",
    demo: "https://demo.project.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/add-project">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="grid md:grid-cols-[300px_1fr] overflow-hidden">
              <div className="relative h-[200px] md:h-full">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Link href={`/admin/projects/${project.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
