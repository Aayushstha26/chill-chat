import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, phone } = body;

    if (!fullName || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { fullName, email, password: hashedPassword, phone },
    });

    return NextResponse.json(
      { success: true, message: 'User registered successfully', user },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
}