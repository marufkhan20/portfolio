"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useReviews } from "@/hooks/use-reviews";
import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const { data: reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
              <span className="text-sm font-medium">Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Client Reviews
            </h2>
            <p className="text-muted-foreground text-lg">
              Here's what my clients say about working with me
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <TestimonialSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !reviews || reviews.length === 0) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          No reviews available
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-muted/50 -z-10" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-20 left-[20%] w-12 h-12 border-2 border-primary/10 rounded-full z-0"
        animate={{ x: [0, 20, 0] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-16 h-16 border-2 border-primary/10 rotate-45 z-0"
        animate={{ rotate: [45, 90, 45] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full bg-primary/10 text-primary border border-primary/20">
            <span className="text-sm font-medium">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Client Reviews
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's what my clients say about working with me
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="border-primary/10 overflow-hidden group">
                      <CardContent className="flex flex-col p-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Quote className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <p className="text-center mb-6 text-muted-foreground">
                            {review.content}
                          </p>
                          <div className="flex justify-center mb-6">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-primary text-primary"
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                              <img
                                src={review.image || "/placeholder.svg"}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold">{review.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {review.role || "Client"}
                              </p>
                            </div>
                          </div>

                          {review.verifyUrl && (
                            <div className="mt-4 flex justify-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                asChild
                              >
                                <a
                                  href={review.verifyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />{" "}
                                  Verify Review
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialSkeleton() {
  return (
    <Card className="border-primary/10 overflow-hidden">
      <CardContent className="flex flex-col p-6 relative">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-muted animate-pulse rounded mx-auto" />
          <div className="h-4 w-4/6 bg-muted animate-pulse rounded mx-auto" />
        </div>
        <div className="flex justify-center mb-6 gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-5 w-5 bg-muted animate-pulse rounded-full"
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse mr-4" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
