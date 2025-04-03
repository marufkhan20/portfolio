"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useCreateProject, useUpdateProject } from "@/hooks/use-projects";
import { Loader2, Plus, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    description: string;
    image?: string;
    github?: string;
    demo?: string;
    category?: string;
    technologies: Technology[];
    features: Feature[];
    gallery: GalleryItem[];
    order?: number;
    published?: boolean;
    featured?: boolean;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const [description, setDescription] = useState(project?.description || "");
  const [newTech, setNewTech] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const [formData, setFormData] = useState({
    id: project?.id || "",
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    github: project?.github || "",
    demo: project?.demo || "",
    category: project?.category || "",
    order: project?.order || 0,
    published: project?.published !== false,
    featured: project?.featured || false,
    technologies: project?.technologies || [],
    features: project?.features || [],
    gallery: project?.gallery || [],
  });

  // Update description when it changes in the rich text editor
  useEffect(() => {
    setFormData((prev) => ({ ...prev, description }));
  }, [description]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleGalleryUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { url, alt: "Project image" }],
    }));
  };

  const handleAddTech = () => {
    if (!newTech.trim()) return;

    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, { name: newTech }],
    }));
    setNewTech("");
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;

    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { content: newFeature }],
    }));
    setNewFeature("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (project?.id) {
      updateProject(formData, {
        onSuccess: () => {
          toast({
            title: "Project updated",
            description: "Your project has been updated successfully.",
          });
          router.push("/admin/projects");
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "Failed to update project. Please try again.",
            variant: "destructive",
          });
        },
      });
    } else {
      createProject(formData, {
        onSuccess: () => {
          toast({
            title: "Project created",
            description: "Your project has been created successfully.",
          });
          router.push("/admin/projects");
        },
        onError: () => {
          toast({
            title: "Creation failed",
            description: "Failed to create project. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <p className="text-sm text-muted-foreground">
          Give your project a clear and concise title.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <RichTextEditor content={description} onChange={setDescription} />
        <p className="text-sm text-muted-foreground">
          Describe your project in detail. What problems does it solve? What
          technologies did you use?
        </p>
      </div>

      <div className="space-y-2">
        <Label>Project Image</Label>
        <ImageUploader
          value={formData.image}
          onChange={handleImageChange}
          previewClassName="w-20 h-20 rounded-md"
        />
        <p className="text-sm text-muted-foreground">
          Upload a screenshot or preview image of your project. Recommended
          size: 1200x800px
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            type="url"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo">Live Demo URL</Label>
          <Input
            id="demo"
            name="demo"
            type="url"
            value={formData.demo}
            onChange={handleChange}
            placeholder="https://project-demo.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="mobile">Mobile App</SelectItem>
            <SelectItem value="desktop">Desktop Application</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Technologies Used</Label>
        <div className="flex items-center space-x-2 mb-2">
          <Input
            placeholder="Add a technology..."
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTech}
            disabled={!newTech.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech, index) => (
            <div
              key={tech.id || index}
              className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
            >
              <span>{tech.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleRemoveTech(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Key Features</Label>
        <div className="flex items-center space-x-2 mb-2">
          <Input
            placeholder="Add a feature..."
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddFeature}
            disabled={!newFeature.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <span>{feature.content}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFeature(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Project Gallery</Label>
        <div className="mb-2">
          <ImageUploader
            value=""
            onChange={handleGalleryUpload}
            previewClassName="w-20 h-20 rounded-md"
            buttonClassName="w-full"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.gallery.map((image, index) => (
            <div key={image.id || index} className="relative group">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt || "Gallery image"}
                className="w-full h-32 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveGalleryImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            value={formData.order.toString()}
            onChange={handleChange}
            min="0"
          />
          <p className="text-sm text-muted-foreground">
            Lower numbers appear first
          </p>
        </div>

        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="published">Published</Label>
          </div>
        </div>

        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Project
          </>
        )}
      </Button>
    </form>
  );
}
