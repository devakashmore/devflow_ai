"use client";
import Image from "next/image";
import { motion } from "motion/react";
import LoginPage from "./login/page";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div >

          {/* <motion.h1 animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-center text-7xl uppercase font-extrabold" >
            Coming Soon<span className="text-amber-200">...</span>
          </motion.h1> */}
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="text-start text-blue-300 text-4xl uppercase font-bold mt-5 ms-3">
              Devflow_<span className="text-emerald-500">AI</span>
            </p>
          </motion.h1>

          <div className="mt-10 flex gap-5">
            {/* <LoginPage /> */}
            <Link href="/login" className="bg-amber-500 text-white px-6 py-2 capitalize text-2xl border  border-amber-500 rounded-4xl hover:bg-black  hover:border-white">
              login
            </Link>

            <Link href="/register" className="bg-black border-amber-50 text-white px-6 py-2 capitalize text-2xl border rounded-4xl hover:bg-amber-500 hover:border-amber-500 ">
              Register
            </Link>

          </div>

        </div>

      </main>
    </div>
  );
}
