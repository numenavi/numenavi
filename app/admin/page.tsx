

import { isAdmin } from "@/lib/admin";
import { AdminClient } from "./admin-client";
import { redirect } from "next/navigation";

const AdminPage = async () => {
    const isAdminUser = await isAdmin();

    if (!isAdminUser) {
        redirect("/");
    }

    return (
        <AdminClient />
    );
};

export default AdminPage;