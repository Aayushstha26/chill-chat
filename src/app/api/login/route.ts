import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateJwt } from "@/lib/jwt";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
        }

        const token = await generateJwt({ id: user.id, email: user.email, phone: user.phone });

        const res = NextResponse.json({ success: true, message: "User logged in successfully", user }, { status: 200 });
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }

}