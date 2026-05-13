"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, signupSchema } from "../../lib/validation";
import { useForm } from "react-hook-form";
import GoogleIcon from "@/components/googleIcon";
import Field from "@/components/Field";
import { Eye, EyeOff } from "@/components/eye/eye";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    mode: "onTouched",
  });

  const switchMode = (m: string) => { setMode(m); reset(); };
  const onSubmit   = (data: any) => console.log(data);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a]">

      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-[#111] border-r border-[#222] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_25%_65%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

        <div className="flex items-center gap-3 z-10">
          <div className="w-8 h-8 rounded-[10px] bg-[#e0e0e0] flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#111">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <span className="text-[#e8e8e8] text-[1.05rem] tracking-tight font-medium">ChillChat</span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3 py-8 z-10">
          {[
            { from: "SR", text: "Hey, is ChillChat live yet?",            time: "9:41 AM", me: false },
            { from: "ME", text: "Just shipped it. Check it out 🚀",        time: "9:42 AM", me: true  },
            { from: "SR", text: "The UI looks clean. Love the dark theme!", time: "9:43 AM", me: false },
            { from: "ME", text: "Thanks! File sharing is in too.",          time: "9:44 AM", me: true  },
            { from: "SR", text: "Let's move the whole team here 😄",        time: "9:45 AM", me: false },
          ].map((msg, i) => (
            <div key={i} className={`flex gap-2 items-end ${msg.me ? "flex-row-reverse" : ""}`}
              style={{ animation: `floatIn 0.5s ease both ${0.1 + i * 0.15}s` }}>
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-medium ${
                msg.me ? "bg-[#d0d0d0] text-[#111]" : "bg-[#1e1e1e] text-[#888] border border-[#2e2e2e]"}`}>
                {msg.from}
              </div>
              <div className={`flex flex-col ${msg.me ? "items-end" : "items-start"}`}>
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed ${
                  msg.me ? "bg-[#d0d0d0] text-[#111] rounded-br-[3px]"
                         : "bg-[#1c1c1c] text-[#aaa] border border-[#2a2a2a] rounded-bl-[3px]"}`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#3a3a3a] mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="z-10">
          <p className="text-[2rem] font-light text-[#e8e8e8] leading-tight tracking-tight mb-2">
            Talk to your team,<br /><em className="italic text-white">without the noise.</em>
          </p>
          <p className="text-[13px] text-[#555] leading-relaxed max-w-[300px]">
            Real-time chat built for focus. No distractions — just the conversations that matter.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex items-center justify-center px-6 py-12 bg-[#0a0a0a] relative overflow-hidden">

        {/* ══════════════════════════════════════
            GLOW PATTERN LAYER
        ══════════════════════════════════════ */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

          {/* Large ambient blobs — foundational glow */}
          <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,200,200,0.11) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,200,200,0.08) 0%, transparent 70%)" }} />

          {/* Full-panel SVG */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>

              {/* ── Glow filters ── */}
              <filter id="glow-xs" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>

              <filter id="glow-md" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b"/><feMergeNode in="b"/>
                  <feMergeNode in="b"/><feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id="glow-xl" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="14" result="b" />
                <feMerge>
                  <feMergeNode in="b"/><feMergeNode in="b"/>
                  <feMergeNode in="b"/><feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* ── Grid pattern ── */}
              <pattern id="grid" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
                <line x1="44" y1="0" x2="0"  y2="0"  stroke="rgba(210,210,210,0.13)" strokeWidth="0.7"/>
                <line x1="0"  y1="0" x2="0"  y2="44" stroke="rgba(210,210,210,0.13)" strokeWidth="0.7"/>
              </pattern>

              {/* ── Diagonal pattern ── */}
              <pattern id="diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="40" x2="40" y2="0" stroke="rgba(210,210,210,0.055)" strokeWidth="0.7"/>
              </pattern>

              {/* Vignette — softened so pattern stays visible */}
              <radialGradient id="vig" cx="50%" cy="50%" r="65%">
                <stop offset="0%"   stopColor="transparent"/>
                <stop offset="100%" stopColor="rgba(10,10,10,0.72)"/>
              </radialGradient>
            </defs>

            {/* Grid layers */}
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#diag)" />

            {/* ════════════ TOP-RIGHT RINGS ════════════ */}
            {/* Outer faint halos */}
            <g filter="url(#glow-xl)">
              <circle cx="93%" cy="6%" r="155" fill="none" stroke="rgba(200,200,200,0.18)" strokeWidth="1"/>
              <circle cx="93%" cy="6%" r="112" fill="none" stroke="rgba(210,210,210,0.25)" strokeWidth="1.2"/>
              <circle cx="93%" cy="6%" r="72"  fill="none" stroke="rgba(218,218,218,0.35)" strokeWidth="1.5"/>
              <circle cx="93%" cy="6%" r="38"  fill="none" stroke="rgba(228,228,228,0.45)" strokeWidth="1.8"/>
              <circle cx="93%" cy="6%" r="14"  fill="none" stroke="rgba(238,238,238,0.6)"  strokeWidth="2"/>
            </g>
            {/* Bright inner rings (no extra filter — sharp + crisp) */}
            <circle cx="93%" cy="6%" r="72"  fill="none" stroke="rgba(215,215,215,0.28)" strokeWidth="1"/>
            <circle cx="93%" cy="6%" r="38"  fill="none" stroke="rgba(225,225,225,0.38)" strokeWidth="1"/>
            <circle cx="93%" cy="6%" r="14"  fill="none" stroke="rgba(235,235,235,0.5)"  strokeWidth="1.2"/>

            {/* Crosshair on top-right ring */}
            <g filter="url(#glow-md)">
              <line x1="93%" y1="-5%"  x2="93%" y2="20%"  stroke="rgba(210,210,210,0.7)" strokeWidth="0.8"/>
              <line x1="76%" y1="6%"   x2="110%" y2="6%"  stroke="rgba(210,210,210,0.7)" strokeWidth="0.8"/>
              <line x1="82%" y1="-4%"  x2="108%" y2="18%" stroke="rgba(210,210,210,0.3)" strokeWidth="0.6"/>
              <line x1="108%"y1="-4%"  x2="82%"  y2="18%" stroke="rgba(210,210,210,0.3)" strokeWidth="0.6"/>
            </g>
            {/* Sharp crosshair lines on top */}
            <line x1="93%" y1="-5%"  x2="93%" y2="20%"  stroke="rgba(220,220,220,0.45)" strokeWidth="0.6"/>
            <line x1="76%" y1="6%"   x2="110%" y2="6%"  stroke="rgba(220,220,220,0.45)" strokeWidth="0.6"/>

            {/* ════════════ BOTTOM-LEFT RINGS ════════════ */}
            <g filter="url(#glow-xl)">
              <circle cx="7%" cy="94%" r="125" fill="none" stroke="rgba(200,200,200,0.14)" strokeWidth="1"/>
              <circle cx="7%" cy="94%" r="88"  fill="none" stroke="rgba(210,210,210,0.21)" strokeWidth="1.2"/>
              <circle cx="7%" cy="94%" r="54"  fill="none" stroke="rgba(218,218,218,0.3)"  strokeWidth="1.5"/>
              <circle cx="7%" cy="94%" r="26"  fill="none" stroke="rgba(228,228,228,0.42)" strokeWidth="1.8"/>
              <circle cx="7%" cy="94%" r="10"  fill="none" stroke="rgba(238,238,238,0.55)" strokeWidth="2"/>
            </g>
            <circle cx="7%" cy="94%" r="54"  fill="none" stroke="rgba(215,215,215,0.22)" strokeWidth="1"/>
            <circle cx="7%" cy="94%" r="26"  fill="none" stroke="rgba(225,225,225,0.32)" strokeWidth="1"/>

            {/* Crosshair on bottom-left ring */}
            <g filter="url(#glow-md)">
              <line x1="7%"  y1="80%"  x2="7%"  y2="110%" stroke="rgba(210,210,210,0.65)" strokeWidth="0.8"/>
              <line x1="-7%" y1="94%"  x2="22%" y2="94%"  stroke="rgba(210,210,210,0.65)" strokeWidth="0.8"/>
            </g>
            <line x1="7%"  y1="80%"  x2="7%"  y2="110%" stroke="rgba(220,220,220,0.4)"  strokeWidth="0.6"/>
            <line x1="-7%" y1="94%"  x2="22%" y2="94%"  stroke="rgba(220,220,220,0.4)"  strokeWidth="0.6"/>

            {/* ════════════ CORNER BRACKETS ════════════ */}
            <g filter="url(#glow-md)">
              {/* top-left */}
              <path d="M 32 68 L 32 32 L 68 32"
                fill="none" stroke="rgba(195,195,195,0.75)" strokeWidth="1.4" strokeLinecap="round"/>
            </g>
            <path d="M 32 68 L 32 32 L 68 32"
              fill="none" stroke="rgba(210,210,210,0.45)" strokeWidth="1" strokeLinecap="round"/>

            {/* ════════════ DIAGONAL ACCENT LINES ════════════ */}
            <g filter="url(#glow-md)">
              <line x1="0"    y1="32%" x2="18%" y2="18%"  stroke="rgba(205,205,205,0.6)" strokeWidth="0.8"/>
              <line x1="100%" y1="68%" x2="82%" y2="82%"  stroke="rgba(205,205,205,0.6)" strokeWidth="0.8"/>
            </g>
            <line x1="0"    y1="32%" x2="18%" y2="18%"  stroke="rgba(215,215,215,0.3)" strokeWidth="0.6"/>
            <line x1="100%" y1="68%" x2="82%" y2="82%"  stroke="rgba(215,215,215,0.3)" strokeWidth="0.6"/>

            {/* Vignette — on top of everything */}
            <rect width="100%" height="100%" fill="url(#vig)"/>
          </svg>

          {/* Bottom-right bracket — separate SVG */}
          <svg className="absolute bottom-0 right-0 w-28 h-28" viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-br" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path d="M 44 80 L 80 80 L 80 44"
              fill="none" stroke="rgba(195,195,195,0.75)" strokeWidth="1.4"
              strokeLinecap="round" filter="url(#glow-br)"/>
            <path d="M 44 80 L 80 80 L 80 44"
              fill="none" stroke="rgba(210,210,210,0.42)" strokeWidth="1" strokeLinecap="round"/>
          </svg>

        </div>
        {/* ══════════════════════════════════════ */}

        {/* ── FORM ── */}
        <div className="w-full max-w-sm relative z-10">

          <h1 className="text-[1.85rem] font-semibold text-[#e8e8e8] tracking-tight mb-1">
            {mode === "login" ? "Welcome back." : "Create account."}
          </h1>
          <p className="text-[13.5px] text-[#555] mb-8">
            {mode === "login" ? "Sign in to continue to ChillChat." : "Join ChillChat and start chatting."}
          </p>

          {/* Mode toggle */}
          <div className="flex bg-[#141414] border border-[#222] rounded-xl p-1 mb-8">
            {["login", "signup"].map((m) => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-[9px] text-[13.5px] font-medium transition-all duration-200 cursor-pointer border-none ${
                  mode === m ? "bg-[#e0e0e0] text-[#0a0a0a]" : "bg-transparent text-[#555] hover:text-[#aaa]"}`}>
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          <form key={mode} onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4" style={{ animation: "fadeUp 0.25s ease both" }}>

            {mode === "signup" && (
              <Field label="Full name" error={errors.fullname?.message}>
                <input type="text" placeholder="Alex Johnson" autoComplete="name"
                  {...register("fullname")} className={inputCls(!!errors.fullname)} />
              </Field>
            )}

            <Field label="Email" error={errors.email?.message}>
              <input type="email" placeholder="you@example.com" autoComplete="email"
                {...register("email")} className={inputCls(!!errors.email)} />
            </Field>
            {mode === 'signup' && (
            <Field label="Phone number" error={errors.phone?.message}>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  autoComplete="phone"
                  {...register('phone')}
                  className={inputCls(!!errors.phone)}
                />
              </Field>
            )}

            <Field label="Password" error={errors.password?.message}>
              <div className="relative">
                <input type={showPass ? "text" : "password"}
                  placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  {...register("password")} className={`${inputCls(!!errors.password)} pr-10`} />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#aaa] transition-colors cursor-pointer bg-transparent border-none p-0">
                  {showPass ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </Field>

            {mode === "signup" && (
              <Field label="Confirm password" error={errors.confirmPassword?.message}>
                <input type={showPass ? "text" : "password"} placeholder="••••••••"
                  autoComplete="new-password" {...register("confirmPassword")}
                  className={inputCls(!!errors.confirmPassword)} />
              </Field>
            )}

            {mode === "login" && (
              <div className="flex justify-end -mt-1">
                <a href="/forgot-password"
                  className="text-[12px] text-[#444] hover:text-[#ccc] transition-colors no-underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="w-full py-3 bg-[#e0e0e0] hover:bg-white text-[#0a0a0a] rounded-xl text-[14.5px] font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none mt-1">
              {isSubmitting ? (
                <><span className="w-4 h-4 border-2 border-black/20 border-t-[#111] rounded-full animate-spin" />
                  {mode === "login" ? "Signing in…" : "Creating account…"}</>
              ) : (mode === "login" ? "Sign in" : "Create account")}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1e1e1e]" />
              <span className="text-[11.5px] text-[#333]">or continue with</span>
              <div className="flex-1 h-px bg-[#1e1e1e]" />
            </div>

            <button type="button"
              className="w-full py-[10px] bg-[#141414] border border-[#222] hover:border-[#555] rounded-xl text-[14px] text-[#888] hover:text-[#ddd] flex items-center justify-center gap-2 transition-all cursor-pointer">
              <GoogleIcon />Continue with Google
            </button>
          </form>

          <p className="text-center text-[13px] text-[#444] mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
              className="text-[#ccc] underline underline-offset-2 cursor-pointer bg-transparent border-none text-[13px] p-0">
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

const inputCls = (hasError: boolean) =>
  `w-full px-3.5 py-[10px] bg-[#141414] border rounded-[9px] text-[14px] text-[#e0e0e0] placeholder-[#333] outline-none transition-all
  ${hasError
    ? "border-red-500/60 focus:border-red-500"
    : "border-[#222] hover:border-[#333] focus:border-[#888] focus:bg-[#1a1a1a]"}`;