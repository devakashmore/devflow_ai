"use client";

import Link from "next/link";
import { motion } from "motion/react";

const features = [
  {
    icon: "◈",
    title: "AI-Powered Workflow",
    description:
      "Use AI assistance to make your development workflow faster, smarter, and more organized.",
  },
  {
    icon: "▦",
    title: "Project Management",
    description:
      "Create projects, organize tasks, and keep your development work structured in one place.",
  },
  {
    icon: "↔",
    title: "Kanban Workflow",
    description:
      "Move tasks from To Do to In Progress, In Review, and Done with an intuitive Kanban board.",
  },
  {
    icon: "◎",
    title: "Team Collaboration",
    description:
      "Manage project members, assign tasks, and keep everyone aligned with the same workflow.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create a project",
    description: "Start a workspace for your next development project.",
  },
  {
    number: "02",
    title: "Create & assign tasks",
    description: "Break your project into actionable tasks and assign them to your team.",
  },
  {
    number: "03",
    title: "Track progress",
    description: "Move tasks through your Kanban workflow and always know what is happening.",
  },
  {
    number: "04",
    title: "Ship smarter",
    description: "Use DevFlow AI to bring your development workflow together.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-0 top-[700px] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold shadow-lg shadow-blue-600/20">
              D
            </div> */}

            <span className="text-xl font-bold tracking-tight">
              DevFlow<span className="text-emerald-400">AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              AI-powered development workflow
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Build.
              <span className="text-blue-500"> Manage.</span>
              <br />
              <span className="text-emerald-400">Ship smarter.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              DevFlow AI brings project management, task tracking,
              team collaboration, and AI-powered development workflows
              together in one workspace.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Get Started →
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-3.5 text-base font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-20 max-w-6xl"
        >
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl shadow-black/40">
            <div className="rounded-xl border border-slate-800 bg-slate-950">
              {/* Browser header */}
              <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />

                <div className="ml-4 flex-1 rounded-lg bg-slate-900 px-4 py-2 text-xs text-slate-600">
                  app.devflow-ai.local/dashboard
                </div>
              </div>

              {/* Dashboard preview */}
              <div className="p-5 sm:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      DevFlow AI
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Project Task Board
                    </h3>
                  </div>

                  <div className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold">
                    + Create Task
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4">
                  {[
                    {
                      title: "To Do",
                      count: 3,
                      tasks: [
                        "Design authentication UI",
                        "Create project API",
                        "Add user settings",
                      ],
                    },
                    {
                      title: "In Progress",
                      count: 2,
                      tasks: [
                        "Build dashboard",
                        "Implement task API",
                      ],
                    },
                    {
                      title: "In Review",
                      count: 1,
                      tasks: ["Review authentication"],
                    },
                    {
                      title: "Done",
                      count: 3,
                      tasks: [
                        "Database setup",
                        "User registration",
                        "Project creation",
                      ],
                    },
                  ].map((column) => (
                    <div
                      key={column.title}
                      className="min-h-[220px] rounded-xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {column.title}
                        </span>

                        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-500">
                          {column.count}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {column.tasks.map((task, index) => (
                          <div
                            key={task}
                            className="rounded-lg border border-slate-800 bg-slate-800/70 p-3"
                          >
                            <p className="text-xs font-medium text-slate-200">
                              {task}
                            </p>

                            <div className="mt-3 flex items-center justify-between">
                              <span
                                className={`rounded-full px-2 py-1 text-[10px] ${index % 3 === 0
                                    ? "bg-blue-500/10 text-blue-400"
                                    : index % 3 === 1
                                      ? "bg-yellow-500/10 text-yellow-400"
                                      : "bg-emerald-500/10 text-emerald-400"
                                  }`}
                              >
                                {index % 3 === 0
                                  ? "MEDIUM"
                                  : index % 3 === 1
                                    ? "HIGH"
                                    : "LOW"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="relative z-10 border-y border-slate-800/70 bg-slate-950/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Everything in one place
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A better way to manage development
            </h2>

            <p className="mt-5 text-slate-400">
              DevFlow AI gives developers and teams the tools they need
              to organize projects and keep development moving.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-slate-700"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Simple workflow
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            From idea to shipped product
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Keep your development workflow organized from the first
            task to the final delivery.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map((item) => (
            <div
              key={item.number}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <span className="text-sm font-bold text-blue-500">
                {item.number}
              </span>

              <h3 className="mt-5 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AI section */}
      <section
        id="about"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-950/50 via-slate-900 to-emerald-950/20 p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
                Built for developers
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Your development workflow,
                <span className="text-blue-400">
                  {" "}
                  upgraded with AI.
                </span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-400">
                DevFlow AI is designed to bring project management
                and intelligent development assistance together,
                helping teams spend less time managing work and more
                time building.
              </p>

              <Link
                href="/register"
                className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Start Building →
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    ✦
                  </div>

                  <div>
                    <p className="font-semibold">DevFlow AI</p>
                    <p className="text-xs text-slate-500">
                      Development Assistant
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-slate-900 p-4">
                    <p className="text-xs text-slate-500">
                      Project insight
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Your team has 6 active tasks. 3 are currently
                      in progress and 2 are ready for review.
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <p className="text-xs text-blue-400">
                      AI suggestion
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      Consider reviewing the authentication tasks
                      before starting another feature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-slate-800/70">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Ready to build smarter?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Start organizing your development workflow with DevFlow AI.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-8 py-3.5 font-semibold shadow-xl shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Create your workspace →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} DevFlow AI | Akash More (devakashmore@gmail.com)
          </div>

          {/* <div className="flex gap-6">
            <Link
              href="/login"
              className="transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="transition hover:text-white"
            >
              Register
            </Link>
          </div> */}
        </div>
      </footer>
    </main>
  );
}
