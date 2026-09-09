"use client";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";


type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}
interface User {
    id: string;
    name: string;
    email: string;
}

const columns: {
    id: TaskStatus;
    title: string;
}[] = [
        { id: "TODO", title: "To Do" },
        { id: "IN_PROGRESS", title: "In Progress" },
        { id: "IN_REVIEW", title: "In Review" },
        { id: "DONE", title: "Done" },
    ];

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [task, setTasks] = useState<Task[]>([]);
    const [projectId, setProjectId] = useState("");
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


    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                window.location.href = "/login";
                return;
            }
            /*
            * Temporary:
            * Replace this with actual project ID.
            */
            const id = localStorage.getItem("projectId");
            if (!id) {
                console.log("No projectId found in localStorage");
                setLoading(false);
                return;
            }

            setProjectId(id);

            const response = await apiRequest(`/api/v1/projects/${id}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks(response.data.task);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDragEnd(result: any) {

        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId) {
            return;
        }

        const newStatus = destination.droppableId as TaskStatus;

        // Optimistic UI update
        setTasks((currentTasks) =>
            currentTasks.map((task) => task.id === draggableId ? {
                ...task,
                status: newStatus,
            }
                : task
            )
        );


        try {
            const token = localStorage.getItem("accessToken");
            await apiRequest(`/api/v1/projects/${projectId}/tasks/${draggableId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

        } catch (error) {
            console.error("Failed to update task status:", error);

            // Reload if API update fails
            loadTasks();
        }
    }




    function logout() {
        localStorage.removeItem("accessToken");
        router.push("/login");
    }





    if (loading) {
        return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
            <h1>Loading DevFlow...</h1>
        </main>
    }

    return (
        <>
            <main className="min-h-screen bg-slate-950 p-8 text-white">
                <div className="mx-auto mx-w-6xl">
                    <div className="flex  items-center justify-between">
                        {/* Header */}
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

                        {/* Stats */}
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
                                    {task?.length ?? 0}
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
                    {/* KANBAN */}
                    <div className="mt-10">
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold">
                                Project Task Board
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Drag and drop tasks to update their status.
                            </p>
                        </div>
                        {!projectId ? (
                            <div className="rounded-xl border border-yellow-800 bg-yellow-950/30 p-6">
                                <p className="text-yellow-400">
                                    No project selected.
                                </p>
                                <p className="mt-2 text-sm text-slate-400">
                                    Add your project ID to localStorage:
                                </p>
                                <code className="mt-3 rounded-lg block bg-slate-900 p-3 text-sm text-blue-400">
                                    localStorage.setItem(
                                    &quot;projectId&quot;,
                                    &quot;YOUR_PROJECT_ID&quot;
                                    )
                                </code>
                            </div>
                        ) : (
                            <DragDropContext
                                onDragEnd={handleDragEnd}
                            >
                                <div className="grid gap-5 overflow-x-auto md:grid-cols-2 xl:grid-cols-4">
                                    {columns.map((column) => {

                                        const columnTasks =
                                            task.filter(
                                                (task) =>
                                                    task.status === column.id
                                            );

                                        return (

                                            <Droppable
                                                key={column.id}
                                                droppableId={column.id}
                                            >

                                                {(provided, snapshot) => (

                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className={`min-h-[420px] rounded-xl border p-4 transition ${snapshot.isDraggingOver
                                                            ? "border-blue-500 bg-blue-950/30"
                                                            : "border-slate-800 bg-slate-900"
                                                            }`}
                                                    >

                                                        {/* COLUMN HEADER */}

                                                        <div className="mb-5 flex items-center justify-between">

                                                            <h3 className="font-semibold">
                                                                {column.title}
                                                            </h3>

                                                            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                                                                {columnTasks.length}
                                                            </span>

                                                        </div>

                                                        {/* TASKS */}

                                                        <div className="space-y-3">

                                                            {columnTasks.map(
                                                                (task, index) => (

                                                                    <Draggable
                                                                        key={task.id}
                                                                        draggableId={task.id}
                                                                        index={index}
                                                                    >

                                                                        {(provided, snapshot) => (

                                                                            <div
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                style={
                                                                                    provided
                                                                                        .draggableProps
                                                                                        .style
                                                                                }
                                                                                className={`rounded-lg border border-slate-700 bg-slate-800 p-4 transition ${snapshot.isDragging
                                                                                    ? "rotate-2 shadow-2xl"
                                                                                    : "hover:border-slate-600"
                                                                                    }`}
                                                                            >

                                                                                {/* TASK TITLE */}

                                                                                <h4 className="font-semibold">
                                                                                    {task.title}
                                                                                </h4>

                                                                                {/* DESCRIPTION */}

                                                                                {task.description && (
                                                                                    <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                                                                                        {task.description}
                                                                                    </p>
                                                                                )}

                                                                                {/* PRIORITY */}

                                                                                <div className="mt-4">

                                                                                    <span
                                                                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${task.priority ===
                                                                                            "URGENT"
                                                                                            ? "bg-red-500/20 text-red-400"
                                                                                            : task.priority ===
                                                                                                "HIGH"
                                                                                                ? "bg-orange-500/20 text-orange-400"
                                                                                                : task.priority ===
                                                                                                    "MEDIUM"
                                                                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                                                                    : "bg-green-500/20 text-green-400"
                                                                                            }`}
                                                                                    >
                                                                                        {task.priority}
                                                                                    </span>

                                                                                </div>

                                                                            </div>

                                                                        )}

                                                                    </Draggable>

                                                                )
                                                            )}

                                                        </div>

                                                        {provided.placeholder}

                                                        {/* EMPTY COLUMN */}

                                                        {columnTasks.length === 0 && (
                                                            <div className="mt-10 text-center text-sm text-slate-600">
                                                                Drop tasks here
                                                            </div>
                                                        )}

                                                    </div>

                                                )}

                                            </Droppable>

                                        );
                                    })}

                                </div>

                                {/* }
                                    </div> */}
                            </DragDropContext>
                        )}
                    </div>
                </div>

            </main>
        </>
    )
}

