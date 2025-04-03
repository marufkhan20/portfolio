"use client";

import type React from "react";

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
import { ImageUploader } from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  useCreateReview,
  useDeleteReview,
  useReviews,
  useUpdateReview,
} from "@/hooks/use-reviews";
import {
  ExternalLink,
  Loader2,
  Plus,
  Save,
  Star,
  Trash,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ReviewsPage() {
  const { data: reviews, isLoading } = useReviews();
  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview();
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    content: "",
    image: "",
    verifyUrl: "",
    rating: 5,
  });

  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editMode) {
      updateReview(formData, {
        onSuccess: () => {
          toast({
            title: "Review updated",
            description: "The review has been updated successfully.",
          });
          resetForm();
        },
        onError: () => {
          toast({
            title: "Update failed",
            description: "Failed to update review. Please try again.",
            variant: "destructive",
          });
        },
      });
    } else {
      createReview(formData, {
        onSuccess: () => {
          toast({
            title: "Review added",
            description: "The review has been added successfully.",
          });
          resetForm();
        },
        onError: () => {
          toast({
            title: "Creation failed",
            description: "Failed to add review. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  };

  const handleEdit = (review: any) => {
    setFormData({
      id: review.id,
      name: review.name,
      role: review.role || "",
      content: review.content,
      image: review.image || "",
      verifyUrl: review.verifyUrl || "",
      rating: review.rating,
    });
    setEditMode(true);
  };

  const handleDeleteClick = (id: string) => {
    setReviewToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!reviewToDelete) return;

    deleteReview(reviewToDelete, {
      onSuccess: () => {
        toast({
          title: "Review deleted",
          description: "The review has been deleted successfully.",
        });
        setDeleteDialogOpen(false);
        setReviewToDelete(null);
      },
      onError: () => {
        toast({
          title: "Deletion failed",
          description: "Failed to delete review. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      role: "",
      content: "",
      image: "",
      verifyUrl: "",
      rating: 5,
    });
    setEditMode(false);
  };

  const isPending = isCreating || isUpdating || isDeleting;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
          <p className="text-muted-foreground">
            Manage client reviews and testimonials.
          </p>
        </div>
        {editMode && (
          <Button variant="outline" onClick={resetForm}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{editMode ? "Edit Review" : "Add New Review"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Client Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Client Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. CEO at Company"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write the review content..."
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="verifyUrl">Verification URL</Label>
                <Input
                  id="verifyUrl"
                  name="verifyUrl"
                  value={formData.verifyUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://fiverr.com/review/123456"
                  type="url"
                />
                <p className="text-sm text-muted-foreground">
                  Add a URL where this review can be verified (e.g. Fiverr,
                  Upwork, LinkedIn)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Client Image</Label>
                <ImageUploader
                  value={formData.image}
                  onChange={handleImageChange}
                  previewClassName="w-12 h-12 rounded-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant={
                        formData.rating >= rating ? "default" : "outline"
                      }
                      size="icon"
                      onClick={() => handleRatingChange(rating)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          formData.rating >= rating
                            ? "fill-primary-foreground"
                            : ""
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editMode ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {editMode ? "Update Review" : "Save Review"}
                    </>
                  )}
                </Button>
                {editMode && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                        {review.image && (
                          <img
                            src={review.image || "/placeholder.svg"}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {review.role || "Client"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(review)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleDeleteClick(review.id)}
                        disabled={isDeleting && reviewToDelete === review.id}
                      >
                        {isDeleting && reviewToDelete === review.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="mb-4">"{review.content}"</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    {review.verifyUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={review.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> Verify
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              No reviews found. Add your first review above.
            </p>
          </Card>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
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

function ReviewSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-3 w-16 bg-muted animate-pulse rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4/6 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-4 w-4 bg-muted animate-pulse rounded-full"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
