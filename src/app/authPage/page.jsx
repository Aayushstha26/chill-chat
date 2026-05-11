"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, signupSchema } from "../../lib/validation";
import { useForm } from "react-hook-form";

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



function Eye() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}