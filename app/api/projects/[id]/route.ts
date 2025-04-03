import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true,
        features: true,
        gallery: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()
    const { technologies, features, gallery, ...updateData } = data

    // Update the project
    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    })

    // If technologies are provided, update them
    if (technologies) {
      // Delete existing technologies
      await prisma.technology.deleteMany({
        where: { projectId: id },
      })

      // Create new technologies
      await prisma.technology.createMany({
        data: technologies.map((tech: any) => ({
          ...tech,
          projectId: id,
        })),
      })
    }

    // If features are provided, update them
    if (features) {
      // Delete existing features
      await prisma.feature.deleteMany({
        where: { projectId: id },
      })

      // Create new features
      await prisma.feature.createMany({
        data: features.map((feature: any) => ({
          ...feature,
          projectId: id,
        })),
      })
    }

    // If gallery is provided, update it
    if (gallery) {
      // Delete existing gallery
      await prisma.gallery.deleteMany({
        where: { projectId: id },
      })

      // Create new gallery
      await prisma.gallery.createMany({
        data: gallery.map((item: any) => ({
          ...item,
          projectId: id,
        })),
      })
    }

    // Fetch the updated project with all relations
    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true,
        features: true,
        gallery: true,
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

