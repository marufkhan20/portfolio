"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCreateHero, useHero, useUpdateHero } from "@/hooks/use-hero";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroPage() {
  const { data: hero, isLoading: isLoadingHero } = useHero();
  const { mutate: updateHero, isPending: isUpdating } = useUpdateHero();
  const { mutate: createHero, isPending: isCreating } = useCreateHero();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    title: "",
    description: "",
    image: "",
    linkedin: "",
    github: "",
    instagram: "",
    twitter: "",
    fiverr: "",
    upwork: "",
  });

  // Update form data when hero data is loaded
  useEffect(() => {
    if (hero) {
      setFormData({
        id: hero.id,
        name: hero.name || "",
        title: hero.title || "",
        description: hero.description || "",
        image: hero.image || "",
        linkedin: hero.linkedin || "",
        github: hero.github || "",
        instagram: hero.instagram || "",
        twitter: hero.twitter || "",
        fiverr: hero.fiverr || "",
        upwork: hero.upwork || "",
      });
    }
  }, [hero]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      updateHero(formData, {
        onSuccess: () => {
          toast({
            title: "Hero updated",
            description: "Your hero section has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "Failed to update hero section. Please try again.",
            variant: "destructive",
          });
        },
      });
    } else {
      createHero(formData, {
        onSuccess: () => {
          toast({
            title: "Hero created",
            description: "Your hero section has been created successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Creation failed",
            description: "Failed to create hero section. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  };

  const isPending = isUpdating || isCreating;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hero Section</h2>
        <p className="text-muted-foreground">
          Update your hero section content here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingHero ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Creative Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description about yourself"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <ImageUploader
                  value={formData.image}
                  onChange={handleImageChange}
                  previewClassName="w-16 h-16 rounded-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    type="url"
                    placeholder="LinkedIn profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    type="url"
                    placeholder="GitHub profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    type="url"
                    placeholder="Instagram profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    type="url"
                    placeholder="Twitter profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiverr">Fiverr URL</Label>
                  <Input
                    id="fiverr"
                    name="fiverr"
                    value={formData.fiverr}
                    onChange={handleChange}
                    type="url"
                    placeholder="Fiverr profile URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upwork">Upwork URL</Label>
                  <Input
                    id="upwork"
                    name="upwork"
                    value={formData.upwork}
                    onChange={handleChange}
                    type="url"
                    placeholder="Upwork profile URL"
                  />
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
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
