"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import {useRouter} from 'next/navigation';

type Props = {}

function SignUp({}: Props) {
    const { toast } = useToast();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
  async function SignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body = form;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        toast({
          title: "SignUp Error",
          description: data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "SignUp Successfull",
          variant: "default",
          style: {
            backgroundColor: "green",
          },
        });
        navigation.push("/auth/signin");
      }
    } catch (error: any) {
      console.log("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="w-screen min-h-screen bg-slate-900 flex items-center justify-center p-2">
      <div className="w-full max-w-[500px] border-[2px] border-slate-600 rounded-lg p-5 overflow-hidden">
        <div
          className={`flex items-center w-full gap-5`}
        >

          <form className="flex-none w-full">
            <h1 className="my-3 text-center text-2xl font-bold text-white">
              Sign Up
            </h1>
            <div className="flex items-center gap-2 border-[2px] mb-5 border-slate-600 rounded-md">
              <div className="border-r-[2px] border-slate-800 p-3">
                <User size={28} color="white" />
              </div>

              <Input
                className="bg-transparent border-none text-white"
                placeholder="User Name"
                name="username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
                type="text"
                required={true}
              />
            </div>
            <div className="flex items-center gap-2 border-[2px] border-slate-600 rounded-md">
              <div className="border-r-[2px] border-slate-800 p-3">
                <Mail size={28} color="white" />
              </div>

              <Input
                className="bg-transparent border-none text-white"
                placeholder="Email"
                name="email"
                value={form.email}
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
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                type="password"
                required={true}
              />
            </div>
            <Button
              onClick={SignUp}
              variant={"outline"}
              className="w-full my-3"
              disabled={loading}
            >
              <p className="text-xl font-semibold">
                {loading ? "loading..." : "Sign Up"}
              </p>
            </Button>
            <p className="text-white font-semibold my-3">
              Already have an account?{" "}
              <span
                onClick={() =>navigation.push('/auth/signin') }
                className="text-blue-600 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SignUp