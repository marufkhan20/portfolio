"use client";

import { Button } from "@/components/ui/button";
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
import { ImagePlus, Loader2, Save } from "lucide-react";
import { useState } from "react";

export function ProjectForm() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    console.log("Description HTML:", description);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" name="title" required />
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
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline">
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <p className="text-sm text-muted-foreground">
            Upload a screenshot or preview image of your project. Recommended
            size: 1200x800px
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input
            id="github"
            name="github"
            type="url"
            placeholder="https://github.com/username/project"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo">Live Demo URL</Label>
          <Input
            id="demo"
            name="demo"
            type="url"
            placeholder="https://project-demo.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select>
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
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "TypeScript", "Node.js", "Tailwind"].map(
            (tech) => (
              <Button
                key={tech}
                type="button"
                variant="secondary"
                className="rounded-full"
                size="sm"
              >
                {tech}
              </Button>
            )
          )}
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            size="sm"
          >
            + Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Key Features</Label>
        <RichTextEditor content="" onChange={() => {}} />
        <p className="text-sm text-muted-foreground">
          List the main features of your project.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
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
