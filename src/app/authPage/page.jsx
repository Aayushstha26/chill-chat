"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, signupSchema } from "../../lib/validation";
import { useForm } from "react-hook-form";
import GoogleIcon from "@/components/googleIcon";
import Field from "@/components/Field";
import {Eye, EyeOff} from "@/components/eye/eye";



export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    mode: "onTouched",
  });

  const switchMode = (m) => {
    setMode(m);
    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
    // TODO: wire up to your API route
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a]">

      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-[#111] border-r border-[#222] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_25%_65%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

        {/* Brand */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-8 h-8 rounded-[10px] bg-[#e0e0e0] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#111">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <span className="text-[#e8e8e8] text-[1.05rem] tracking-tight font-medium">
            ChillChat
          </span>
        </div>

        {/* Chat preview */}
        <div className="flex-1 flex flex-col justify-center gap-3 py-8 z-10">
          {[
            { from: "SR", text: "Hey, is ChillChat live yet?", time: "9:41 AM", me: false },
            { from: "ME", text: "Just shipped it. Check it out 🚀", time: "9:42 AM", me: true },
            { from: "SR", text: "The UI looks clean. Love the dark theme!", time: "9:43 AM", me: false },
            { from: "ME", text: "Thanks! File sharing is in too.", time: "9:44 AM", me: true },
            { from: "SR", text: "Let's move the whole team here 😄", time: "9:45 AM", me: false },
          ].map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-end ${msg.me ? "flex-row-reverse" : ""}`}
              style={{ animation: `floatIn 0.5s ease both ${0.1 + i * 0.15}s` }}
            >
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-medium ${
                msg.me ? "bg-[#d0d0d0] text-[#111]" : "bg-[#1e1e1e] text-[#888] border border-[#2e2e2e]"
              }`}>
                {msg.from}
              </div>
              <div className={`flex flex-col ${msg.me ? "items-end" : "items-start"}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed ${
                  msg.me
                    ? "bg-[#d0d0d0] text-[#111] rounded-br-[3px]"
                    : "bg-[#1c1c1c] text-[#aaa] border border-[#2a2a2a] rounded-bl-[3px]"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#3a3a3a] mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="z-10">
          <p className="text-[2rem] font-light text-[#e8e8e8] leading-tight tracking-tight mb-2">
            Talk to your team,<br />
            <em className="italic text-white">without the noise.</em>
          </p>
          <p className="text-[13px] text-[#555] leading-relaxed max-w-[300px]">
            Real-time chat built for focus. No distractions — just the conversations that matter.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#0a0a0a]">
        <div className="w-full max-w-sm">

          {/* Heading */}
          <h1 className="text-[1.85rem] font-semibold text-[#e8e8e8] tracking-tight mb-1">
            {mode === "login" ? "Welcome back." : "Create account."}
          </h1>
          <p className="text-[13.5px] text-[#555] mb-8">
            {mode === "login"
              ? "Sign in to continue to ChillChat."
              : "Join ChillChat and start chatting."}
          </p>

          {/* Mode toggle */}
          <div className="flex bg-[#141414] border border-[#222] rounded-xl p-1 mb-8">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-[9px] text-[13.5px] font-medium transition-all duration-200 cursor-pointer border-none ${
                  mode === m
                    ? "bg-[#e0e0e0] text-[#0a0a0a]"
                    : "bg-transparent text-[#555] hover:text-[#aaa]"
                }`}
              >
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            key={mode}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            style={{ animation: "fadeUp 0.25s ease both" }}
          >
            {/* Full name — signup only */}
            {mode === "signup" && (
              <Field label="Full name" error={errors.fullname?.message}>
                <input
                  type="text"
                  placeholder="Alex Johnson"
                  autoComplete="name"
                  {...register("fullname")}
                  className={inputCls(!!errors.fullname)}
                />
              </Field>
            )}

            {/* Email */}
            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                className={inputCls(!!errors.email)}
              />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password?.message}>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  {...register("password")}
                  className={`${inputCls(!!errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#aaa] transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </Field>

            {/* Confirm password — signup only */}
            {mode === "signup" && (
              <Field label="Confirm password" error={errors.confirmPassword?.message}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className={inputCls(!!errors.confirmPassword)}
                />
              </Field>
            )}

            {/* Forgot password — login only */}
            {mode === "login" && (
              <div className="flex justify-end -mt-1">
                <a
                  href="/forgot-password"
                  className="text-[12px] text-[#444] hover:text-[#ccc] transition-colors no-underline"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#e0e0e0] hover:bg-white text-[#0a0a0a] rounded-xl text-[14.5px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none mt-1"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/20 border-t-[#111] rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : "Creating account…"}
                </>
              ) : (
                mode === "login" ? "Sign in" : "Create account"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1e1e1e]" />
              <span className="text-[11.5px] text-[#333]">or continue with</span>
              <div className="flex-1 h-px bg-[#1e1e1e]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-[10px] bg-[#141414] border border-[#222] hover:border-[#555] rounded-xl text-[14px] text-[#888] hover:text-[#ddd] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-[13px] text-[#444] mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-[#ccc] underline underline-offset-2 cursor-pointer bg-transparent border-none text-[13px] p-0"
            >
              {mode === "login" ? "Register" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Helpers ── */

const inputCls = (hasError) =>
  `w-full px-3.5 py-[10px] bg-[#141414] border rounded-[9px] text-[14px] text-[#e0e0e0] placeholder-[#333] outline-none transition-all
  ${hasError
    ? "border-red-500/60 focus:border-red-500"
    : "border-[#222] hover:border-[#333] focus:border-[#888] focus:bg-[#1a1a1a]"
  }`;



