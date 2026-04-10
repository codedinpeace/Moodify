import { Mail, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../context/auth.context";

export default function Login() {
    
    const [email, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    const {handleLogin} = useAuth()
    const context = useContext(AuthContext)

    const {loading, isLoggedIn, user} = context

    const userData = {
      identifier: email,
      password
    }

  async function handleSubmit(e) {
    e.preventDefault()
    await handleLogin(userData)

    console.log(loading, isLoggedIn, user)
  }

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#171717] border border-[#222] rounded-2xl p-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap size={15} className="text-[#111]" strokeWidth={2.5} />
            </div>
            <span className="text-[#ccc] text-sm font-semibold tracking-tight">
              acme
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[#f5f5f5] text-xl font-semibold mb-1">
            Welcome back
          </h1>
          <p className="text-[#666] text-[13px] mb-7">
            Sign in to continue to your dashboard.
          </p>

          {/* Fields */}
            <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-[#888] text-[12px] font-medium mb-1.5 tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]"
                />
                <input
                    
                  onChange={(e)=>setEmailOrUsername(e.target.value)}
                  placeholder="email or username"
                  className="w-full bg-[#0e0e0e] border border-[#272727] rounded-[9px] py-2.5 pl-9 pr-3 text-[14px] text-[#e5e5e5] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[#888] text-[12px] font-medium tracking-wide">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#555] text-[12px] hover:text-[#888] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]"
                />
                <input
                  type="password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="••••••••"
                  className="w-full bg-[#0e0e0e] border border-[#272727] rounded-[9px] py-2.5 pl-9 pr-3 text-[14px] text-[#e5e5e5] placeholder-[#444] outline-none focus:border-[#444] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <button type="submit" className="w-full mt-6 py-2.5 bg-[#f5f5f5] text-[#111] text-[14px] font-semibold rounded-[9px] hover:bg-white transition-colors">
            Sign in
          </button>
    </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-[#444] text-[12px]">or continue with</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* OAuth */}
          <div className="space-y-2.5">
            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-[#272727] rounded-[9px] text-[#ccc] text-[13px] font-medium hover:border-[#333] hover:bg-[#1f1f1f] transition-colors">
              {/* Google icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-[#272727] rounded-[9px] text-[#ccc] text-[13px] font-medium hover:border-[#333] hover:bg-[#1f1f1f] transition-colors">
              {/* <Github size={15} className="text-[#aaa]" /> */}
              Continue with GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-center mt-6 text-[13px] text-[#555]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#aaa] font-medium hover:text-white transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
