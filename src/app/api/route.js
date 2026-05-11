import { NextResponse } from "next/server";
import { loginSchema, signupSchema } from "@/lib/validation";
import pool from "@/lib/db";