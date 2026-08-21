"use client"

import { apiRequest } from "@/lib/api";
import { useRouter } from "next/router"
import { FormEvent, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await apiRequest(`/api/v1/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            localStorage.setItem("token", response.data.accessToken);
            router.push("/dashboard");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 ">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Sign in to DevFLow Ai
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="">
                            <label className="text-sm text-slate-300 capitalize">
                                Email
                            </label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3  text-white outline-none"
                                placeholder="your@example.com"
                                required
                            />
                        </div>
                        <div className="">
                            <label className="text-sm text-slate-300 capitalize">
                                Password
                            </label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassowrd(e.target.value)}
                                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3  text-white outline-none"
                                placeholder="password!"
                                required
                            />
                        </div>
                        {error && (
                            <p className="rounded-lg bg-red-950 p-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                        >
                            {loading ? "Singing in..." : "Sign in"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
