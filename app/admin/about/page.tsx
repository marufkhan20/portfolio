"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAbout, useCreateAbout, useUpdateAbout } from "@/hooks/use-about";
import { Loader2, Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { data: about, isLoading: isLoadingAbout } = useAbout();
  const { mutate: updateAbout, isPending: isUpdating } = useUpdateAbout();
  const { mutate: createAbout, isPending: isCreating } = useCreateAbout();

  const [formData, setFormData] = useState({
    id: "",
    title: "About Me",
    description: "",
    skills: [] as { id?: string; name: string; icon?: string }[],
  });

  const [newSkill, setNewSkill] = useState("");

  // Update form data when about data is loaded
  useEffect(() => {
    if (about) {
      setFormData({
        id: about.id,
        title: about.title || "About Me",
        description: about.description || "",
        skills: about.skills || [],
      });
    }
  }, [about]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: newSkill, icon: "Database" }],
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      updateAbout(formData, {
        onSuccess: () => {
          toast({
            title: "About section updated",
            description: "Your about section has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "Failed to update about section. Please try again.",
            variant: "destructive",
          });
        },
      });
    } else {
      createAbout(formData, {
        onSuccess: () => {
          toast({
            title: "About section created",
            description: "Your about section has been created successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Creation failed",
            description: "Failed to create about section. Please try again.",
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
        <h2 className="text-3xl font-bold tracking-tight">About Section</h2>
        <p className="text-muted-foreground">
          Update your about section content and skills.
        </p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>About Content</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingAbout ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Content</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-[200px]"
                    placeholder="Write about yourself..."
                    required
                  />
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Content
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-40 md:w-60"
              />
              <Button
                size="sm"
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingAbout ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                {formData.skills.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No skills added yet. Add your first skill above.
                  </p>
                ) : (
                  formData.skills.map((skill, index) => (
                    <div
                      key={skill.id || index}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <span>{skill.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}

                {formData.skills.length > 0 && (
                  <Button
                    className="w-full mt-4"
                    onClick={handleSubmit}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Skills...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Skills
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
