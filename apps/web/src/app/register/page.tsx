"use client"

import { apiRequest } from "@/lib/api";
// import {useRouter  } from "next/router";
import {redirect, useRouter} from "next/navigation"
import { FormEvent, useState } from "react"

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await apiRequest(`/api/v1/auth/register`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
            });

            localStorage.setItem("token", response.data.accessToken);
            router.push("/dashboard");

        } catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed");

        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">
                    <h1 className="text-3xl font-bold capitalize text-slate-100">
                        Create Your Account
                    </h1>

                    <p className="mt-2  text-slate-400">
                        Start using DevFlow AI
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="">
                            <label className="text-sm text-slate-300">
                                Name
                            </label>
                            <input type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3  text-white outline-none"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="">
                            <label className="text-sm text-slate-300">
                                Email
                            </label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3  text-white outline-none"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="">
                            <label className="text-sm text-slate-300">
                                Password
                            </label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                                placeholder="Minimum 8 characters Password"
                                required
                            />
                        </div>
                        {error && (
                            <p className="rounded-lg bg-red-950 p-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50 capitalize">
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        <p onClick={()=>(router.push("/login"))} className="text-amber-50 text-center cursor-pointer">Alredy have an Account? login here</p>
                    </form>
                </div>

            </main>
        </>
    )
}