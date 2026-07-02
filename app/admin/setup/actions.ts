"use server";

import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminEmails";
import { redirect } from "next/navigation";

export async function setupAdmin(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!isAdminEmail(email)) {
    redirect("/admin/setup?error=That email is not authorized for the admin account.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/admin/setup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/login?created=1");
}
