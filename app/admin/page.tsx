import React from "react";
import dynamic from "next/dynamic";
import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  if (!getIsAdmin()) return redirect("/");

  return <App />;
};

export default AdminPage;
