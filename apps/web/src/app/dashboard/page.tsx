"use client";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react";
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

    type Project = {
        id: string;
        name: string;
        description?: string;
    }

    const [projects, setProjects] = useState<Project[]>([]);


    const [showCreateTask, setShowCreateTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState<"LOW" | "MEDIUM" | "HIGH" | "URGENT">("MEDIUM");
    const [creatingTask, setCreatingTask] = useState(false);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
        async function initializeDashboard() {
            await loadProjects();
        }

        initializeDashboard();
    }, []);



    async function loadProjects() {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                window.location.href = "/login";
                return;
            }

            const response = await apiRequest("/api/v1/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const projectList = response.data.projects;
            setProjects(projectList);
            // Automatically select the first project
            if (projectList.length > 0) {
                const savedProjectId = localStorage.getItem("projectId");
                const projectExists = projectList.some(
                    (project: Project) => project.id === savedProjectId
                );
                const selectedProjectId = projectExists
                    ? savedProjectId!
                    : projectList[0].id;

                // localStorage.setItem("projectId", selectedProjectId);

                // setProjectId(selectedProjectId);

                localStorage.setItem("projectId", selectedProjectId);

                setProjectId(selectedProjectId);

                // Load tasks for the selected project
                await loadTasks(selectedProjectId);

            } else {
                localStorage.removeItem("projectId");
                setProjectId("");
            }
        } catch (error) {
            console.error(
                "Failed to load projects:",
                error
            );
        }
    }


    // useEffect(() => {
    //     loadTasks();
    // }, []);
    //  useEffect(() => {
    //     if (projectId) {
    //         loadTasks(projectId);
    //     }
    // }, [projectId]);


    async function loadTasks(selectedProjectId?: string) {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                window.location.href = "/login";
                return;
            }


            /*
            * Temporary:
            * Replace this with actual project ID.(note :replaced 16-09-2026)
            */
            const id =
                selectedProjectId ||
                localStorage.getItem("projectId");

            if (!id) {
                console.log("No projectId found");
                setLoading(false);
                return;
            }

            console.log(
                "PROJECT ID:",
                id
            );

            setProjectId(id);

            const response = await apiRequest(`/api/v1/projects/${id}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // setTasks(response.data.task);
            setTasks(response.data.task);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleProjectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = e.target.value;

        if (!selectedId) return;

        localStorage.setItem("projectId", selectedId);

        setProjectId(selectedId);
        setSelectedTask(null);

        await loadTasks(selectedId);
    }

    async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!projectId) {
            alert("No project selected");
            return;
        }

        if (!taskTitle.trim()) {
            return;
        }


        try {
            setCreatingTask(true);
            const token = localStorage.getItem("accessToken");
            const response = await apiRequest(`/api/v1/projects/${projectId}/tasks`,

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: taskTitle,
                        description: taskDescription,
                        priority: taskPriority,
                    }),
                }
            );
            console.log("PROJECT ID:", projectId);
            console.log("ACCESS TOKEN EXISTS:", !!token);
            // adding newly created task to Kanban
            setTasks((currentTasks) => [
                response.data.task,
                ...currentTasks
            ]);

            // clearing form
            setTaskTitle("");
            setTaskDescription("");
            setTaskPriority("MEDIUM");

            //close modal
            setShowCreateTask(false);
        } catch (error) {
            console.error(
                "Failed to create task:",
                error
            );

            alert("Failed to create task");
        } finally {
            setCreatingTask(false);
        }


    }

    async function handleUpdateTask() {
        if (!selectedTask || !projectId) {
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            const response = await apiRequest(
                `/api/v1/projects/${projectId}/tasks/${selectedTask.id}`,
                {
                    method: "PATCH",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({
                    //     title: selectedTask.title,
                    //     description: selectedTask.priority,
                    //     status: selectedTask.status,
                    // }),
                    body: JSON.stringify({
                        title: selectedTask.title,
                        description: selectedTask.description || "",
                        priority: selectedTask.priority,
                        status: selectedTask.status,
                    }),
                }
            );
            const updatedTask = response.data.task;

            // update task in kanban
            setTasks((currentTasks) => currentTasks
                .map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                )
            );

            // update selected task
            setSelectedTask(updatedTask);
            alert("Task updated successfully!");
        } catch (error) {
            console.error("Failed to update task :",
                error
            );
            alert("Failed to update task");
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
                            <p className="text-md text-slate-400">
                                DevFlow AI
                            </p>
                            <h1 className="mt-2 text-3xl font-bold">
                                Wlecome, <span className="capitalize">{user?.name}</span>
                            </h1>
                            <p className="mt-2 text-slate-400">
                                {user?.email}
                            </p>
                            <button
                                onClick={logout}
                                className="rounded-lg border mt-5 cursor-pointer text-md border-slate-700 px-6 py-2 hover:bg-slate-800">
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

                    <hr className="mt-5" />
                    {/* projects LIST */}
                    <div className="flex items-center mt-5 gap-3 ">
                        <label
                            htmlFor="project-select"
                            className=" text-white uppercase">
                            Projects
                        </label>

                        <select
                            id="project-select"
                            value={projectId}
                            onChange={handleProjectChange}
                            className="rounded-lg border border-slate-700 bg-slate-900 px-6 py-2 text-sm text-white outline-none focus:border-blue-500"
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr className="mt-5" />
                    {/* KANBAN */}
                    <div className="mt-10">
                        <div className="mb-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Project Task Board
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Drag and drop tasks to update their status.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowCreateTask(true)}
                                    disabled={!projectId}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    + Create Task
                                </button>
                            </div>
                        </div>
                        {!projectId ? (
                            <div className="rounded-xl border border-yellow-800 bg-yellow-950/30 p-6">
                                {/* <p className="text-yellow-400">
                                    No project selected.
                                </p> */}
                                {/* <p className="mt-2 text-sm text-slate-400">
                                    Add your project ID to localStorage:
                                </p> */}
                                {/* <code className="mt-3 rounded-lg block bg-slate-900 p-3 text-sm text-blue-400">
                                    localStorage.setItem(
                                    &quot;projectId&quot;,
                                    &quot;YOUR_PROJECT_ID&quot;
                                    )
                                </code> */}
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

                                                                            <div ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                onClick={() => setSelectedTask(task)}
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
                                                                                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium
                                           ${task.priority === "URGENT" ? "bg-red-500/20 text-red-400" : task.priority ===
                                                                                            "HIGH"
                                                                                            ? "bg-orange-500/20 text-orange-400"
                                                                                            : task.priority ===
                                                                                                "MEDIUM"
                                                                                                ? "bg-yellow-500/20 text-yellow-400"
                                                                                                : "bg-green-500/20 text-green-400"}`} >
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

                {selectedTask && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                        onClick={() => setSelectedTask(null)}
                    >
                        <div
                            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}>
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-400">
                                        Task Details
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-white">
                                        Edit Task
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setSelectedTask(null)}
                                    className="text-2xl text-slate-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Title */}
                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={selectedTask.title}
                                    onChange={(e) =>
                                        setSelectedTask({
                                            ...selectedTask,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Description
                                </label>

                                <textarea
                                    rows={4}
                                    value={selectedTask.description || ""}
                                    onChange={(e) =>
                                        setSelectedTask({
                                            ...selectedTask,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Status */}
                            <div className="mt-5">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Status
                                </label>

                                <select
                                    value={selectedTask.status}
                                    onChange={(e) =>
                                        setSelectedTask({
                                            ...selectedTask,
                                            status: e.target.value as TaskStatus,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>
                                    <option value="IN_REVIEW">
                                        In Review
                                    </option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>

                            {/* Priority */}
                            <div className="mt-5">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Priority
                                </label>

                                <select
                                    value={selectedTask.priority}
                                    onChange={(e) =>
                                        setSelectedTask({
                                            ...selectedTask,
                                            priority: e.target.value as Task["priority"],
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedTask(null)}
                                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleUpdateTask}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showCreateTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

                        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-xl font-bold">
                                        Create Task
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Add a new task to your project.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowCreateTask(false)}
                                    className="text-2xl text-slate-400 hover:text-white"
                                >
                                    ×
                                </button>

                            </div>

                            {/* Form */}

                            <form
                                onSubmit={handleCreateTask}
                                className="mt-6 space-y-5"
                            >

                                {/* Title */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Task Title
                                    </label>

                                    <input
                                        type="text"
                                        value={taskTitle}
                                        onChange={(e) =>
                                            setTaskTitle(e.target.value)
                                        }
                                        placeholder="e.g. Build authentication UI"
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Description */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Description
                                    </label>

                                    <textarea
                                        value={taskDescription}
                                        onChange={(e) =>
                                            setTaskDescription(e.target.value)
                                        }
                                        placeholder="Describe what needs to be done..."
                                        rows={4}
                                        className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Priority */}

                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Priority
                                    </label>

                                    <select
                                        value={taskPriority}
                                        onChange={(e) =>
                                            setTaskPriority(
                                                e.target.value as
                                                | "LOW"
                                                | "MEDIUM"
                                                | "HIGH"
                                                | "URGENT"
                                            )
                                        }
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                    >
                                        <option value="LOW">
                                            Low
                                        </option>

                                        <option value="MEDIUM">
                                            Medium
                                        </option>

                                        <option value="HIGH">
                                            High
                                        </option>

                                        <option value="URGENT">
                                            Urgent
                                        </option>
                                    </select>
                                </div>

                                {/* Buttons */}

                                <div className="flex justify-end gap-3 pt-2">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCreateTask(false)
                                        }
                                        className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium hover:bg-slate-800"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={creatingTask}
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {creatingTask
                                            ? "Creating..."
                                            : "Create Task"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )}
            </main>
        </>
    )
}


