"use client";

import { isAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./app"), { ssr: false });

export const AdminClient = () => {
    return (
        <App />
    );
};