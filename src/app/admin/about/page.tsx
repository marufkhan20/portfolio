import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";

export default function AboutPage() {
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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Section Title</Label>
                <Input id="title" defaultValue="About Me" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  className="min-h-[200px]"
                  placeholder="Write about yourself..."
                />
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Content
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["HTML", "CSS", "JavaScript", "React", "Node.js"].map(
                (skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span>{skill}</span>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
