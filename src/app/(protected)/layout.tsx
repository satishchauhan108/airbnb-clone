import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Navbar from "@/components/navbar/Navbar";

export default async function GroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="mt-20 px-4 py-2 md:px-20 lg:mt-24">{children}</div>
    </>
  );
}
