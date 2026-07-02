import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminEmails";
import { Sidebar } from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-cream">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">{children}</main>
      <Toaster />
    </div>
  );
}
