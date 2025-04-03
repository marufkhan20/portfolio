"use client";

import { ProjectForm } from "@/components/admin/project-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useDeleteProject, useProject } from "@/hooks/use-projects";
import { ArrowLeft, Eye, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: project, isLoading } = useProject(id);
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteProject(id, {
      onSuccess: () => {
        toast({
          title: "Project deleted",
          description: "The project has been deleted successfully.",
        });
        router.push("/admin/projects");
      },
      onError: () => {
        toast({
          title: "Deletion failed",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/projects">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-5 w-64 mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Edit Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/admin/projects">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="text-3xl font-bold tracking-tight">
                Project Not Found
              </h2>
            </div>
            <p className="text-muted-foreground mt-2">
              The project you're looking for doesn't exist or was deleted.
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h2>
          </div>
          <p className="text-muted-foreground mt-2">
            Edit project details or view analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/projects/${project.id}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Live
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Edit Project</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm project={project} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <MetricCard title="Total Views" value="1,234" change="+12%" />
                  <MetricCard
                    title="Unique Visitors"
                    value="856"
                    change="+8%"
                  />
                  <MetricCard
                    title="Avg. Time on Page"
                    value="2m 45s"
                    change="-5%"
                  />
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <h3 className="text-lg font-medium mb-4">Views Over Time</h3>
                  <div className="h-[300px] flex items-end gap-2">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary/80 w-full rounded-t-sm"
                        style={{
                          height: `${Math.max(
                            15,
                            Math.floor(Math.random() * 100)
                          )}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Traffic Sources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Direct</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "45%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Social Media</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "30%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Search</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "15%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Referral</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "10%" }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Visitor Devices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Mobile</span>
                          <span className="font-medium">55%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "55%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Desktop</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "35%" }}
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span>Tablet</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: "10%" }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Visibility</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked={project.published}
                    />
                    <label htmlFor="published">
                      Published (visible on your portfolio)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked={project.featured}
                    />
                    <label htmlFor="featured">
                      Featured (shown in featured section)
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Display Order</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      id="order"
                      className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue={project.order}
                      min="1"
                    />
                    <label htmlFor="order">
                      Order (lower numbers appear first)
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <div className="rounded-md border border-destructive/50 p-4">
                    <h4 className="font-medium text-destructive mb-2">
                      Delete Project
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete a project, there is no going back. Please
                      be certain.
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      Delete Project
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="text-sm font-medium text-muted-foreground">{title}</div>
      <div className="mt-2 flex items-baseline">
        <div className="text-3xl font-semibold">{value}</div>
        <div
          className={`ml-2 text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </div>
      </div>
    </div>
  );
}
