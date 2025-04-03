import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error fetching hero:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const hero = await prisma.hero.create({
      data,
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error creating hero:", error);
    return NextResponse.json(
      { error: "Failed to create hero data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const hero = await prisma.hero.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error updating hero:", error);
    return NextResponse.json(
      { error: "Failed to update hero data" },
      { status: 500 }
    );
  }
}
