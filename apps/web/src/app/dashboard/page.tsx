"use client";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}
export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadUser() {

            const token = localStorage.getItem("accessToken");
// console.log("DASHBOARD TOKEN:", token);
            if (!token) {
                router.push("/login");
                return;
            }

            try {
                const response = await apiRequest("/api/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });



                // console.log("ME RESPONSE:", response);
                // console.log("USER DATA:", response?.data?.user);
                setUser(response.data.user);
            } catch (error) {
                localStorage.removeItem("accessToken");
                router.push("/login");
                // console.error("ME API ERROR:", error);
            } finally {
                setLoading(false);
            }

        }
        loadUser();
    }, [router])

    function logout() {
        localStorage.removeItem("accessToken");
        router.push("/login");
    }

    if (loading) {
        return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            Loading...
        </main>
    }

    return (
        <>
            <main className="min-h-screen bg-slate-950 p-8 text-white">
                <div className="mx-auto mx-w-6xl">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <p className="text-sm text-slate-400">
                                DevFlow AI
                            </p>
                            <h1 className="mt-2 text-3xl font-bold">
                                Wlecome, {user?.name}
                            </h1>
                            <p className="mt-2 text-slate-400">
                                {user?.email}
                            </p>
                            <button
                                onClick={logout}
                                className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
                                logout
                            </button>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-3  ">
                            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                                <p className="text-slate-400">
                                    Projects
                                </p>
                                <p className="mt-3 text-3xl font-bold">
                                    0
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                                <p className="text-slate-400">
                                    Tasks
                                </p>
                                <p className="mt-3 text-3xl font-bold">
                                    0
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
                                <p className="text-slate-400">
                                    AI Assistant
                                </p>
                                <p className="mt-3 text-3xl font-bold">
                                    Ready
                                </p>
                            </div>
                        </div>



                    </div>
                </div>

            </main>
        </>
    )
}

