import { User, Mail, Lock, ShieldCheck, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Register() {

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-[#171717] border border-[#222] rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-[#1a1a1a] border-b border-[#222] px-8 pt-7 pb-6">

            <h1 className="text-[#f0f0f0] text-[20px] font-semibold mb-1">Create your account</h1>
            <p className="text-[#666] text-[13px]">Fill in your details to get started.</p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
        <form action="">
            {/* Name row */}
              <div className="mb-5">
                <label className="block text-[#888] text-[12px] font-medium mb-1.5 tracking-wide">
                  First name
                </label>
                <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#0e0e0e] border border-[#272727] rounded-[9px] py-2.5 pl-9 pr-3 text-[14px] text-[#e5e5e5] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
                />
              </div>
              </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[#888] text-[12px] font-medium mb-1.5 tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#0e0e0e] border border-[#272727] rounded-[9px] py-2.5 pl-9 pr-3 text-[14px] text-[#e5e5e5] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-[#888] text-[12px] font-medium mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative mb-5">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full bg-[#0e0e0e] border border-[#272727] rounded-[9px] py-2.5 pl-9 pr-3 text-[14px] text-[#e5e5e5] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
                />
              </div>
            </div>

            {/* CTA */}
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#f5f5f5] text-[#111] text-[14px] font-semibold rounded-[9px] hover:bg-white transition-colors">
              Create account
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>

            {/* Footer */}
            <p className="text-center mt-5 text-[13px] text-[#555]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#aaa] font-medium hover:text-white transition-colors">
                Log in
              </Link>
            </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}