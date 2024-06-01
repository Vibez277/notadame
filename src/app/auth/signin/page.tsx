"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/contexts/AuthContextProvider";

function SignIn() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
  const auth = useAuthContext();
  return (
    <main className="w-screen min-h-screen bg-slate-900 flex items-center justify-center p-2">
      <div className="w-full max-w-[500px] border-[2px] border-slate-600 rounded-lg p-5 overflow-hidden">
        <div className={`flex items-center w-full gap-5`}>
          <form className=" flex-none w-full">
            <h1 className="my-3 text-center text-2xl font-bold text-white">
              Sign In
            </h1>
            <div className="flex items-center gap-2 border-[2px] border-slate-600 rounded-md">
              <div className="border-r-[2px] border-slate-800 p-3">
                <User size={28} color="white" />
              </div>

              <Input
                className="bg-transparent border-none text-white"
                placeholder="Email"
                value={form.email}
                name="email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                type="email"
                required={true}
              />
            </div>
            <div className="flex items-center gap-2 border-[2px] border-slate-600 rounded-md mt-5">
              <div className="border-r-[2px] border-slate-800 p-3">
                <Lock size={28} color="white" />
              </div>

              <Input
                className="bg-transparent border-none text-white"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                value={form.password}
                type="password"
                required={true}
              />
            </div>
            <p className="text-right my-3">
              <a className=" text-blue-600 text-sm" href="#">
                Forgot Password
              </a>
            </p>
            <Button
              variant={"outline"}
              className="w-full"
              onClick={(e)=>{
                e.preventDefault();
                setLoading(true);
                auth?.LoginUser(form);
                setLoading(false)
              }}
              disabled={loading}
            >
              <p className="text-xl font-semibold">
                {loading ? "loading..." : "Sign In"}
              </p>
            </Button>
            <p className="text-white font-semibold my-3">
              Don't have an account?{" "}
              <span
                onClick={() => navigation.push('/auth/signup')}
                className="text-blue-600 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
