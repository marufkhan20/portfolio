"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Technology {
  id?: string;
  name: string;
}

interface Feature {
  id?: string;
  content: string;
}

interface GalleryItem {
  id?: string;
  url: string;
  alt?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  github?: string;
  demo?: string;
  category?: string;
  order: number;
  published: boolean;
  featured: boolean;
  technologies: Technology[];
  features: Feature[];
  gallery: GalleryItem[];
  createdAt: Date;
}

export function useProjects(options?: {
  featured?: boolean;
  published?: boolean;
}) {
  const { featured, published } = options || {};

  let queryString = "";
  if (featured) queryString += "featured=true&";
  if (published) queryString += "published=true&";

  return useQuery<Project[]>({
    queryKey: ["projects", { featured, published }],
    queryFn: async () => {
      const res = await fetch(`/api/projects?${queryString}`);
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      return res.json();
    },
  });
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Project, "id">) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Project>) => {
      const res = await fetch(`/api/projects/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update project");
      }

      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.id] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
