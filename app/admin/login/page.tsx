import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAdmin } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; created?: string }>;
}) {
  const { error, created } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="font-serif text-2xl font-bold text-navy text-center mb-1">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">ELCSA CDYL content dashboard</p>

        {created && (
          <p className="mb-4 text-sm text-center text-green-700 bg-green-50 rounded-md py-2 px-3">
            Account created. Check your email to confirm, then sign in.
          </p>
        )}
        {error && (
          <p className="mb-4 text-sm text-center text-destructive bg-destructive/10 rounded-md py-2 px-3">
            {error}
          </p>
        )}

        <form action={signInAdmin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <Button type="submit" className="bg-navy hover:bg-navy-dark mt-2">Sign In</Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          First time here? <Link href="/admin/setup" className="text-navy underline">Create the admin account</Link>
        </p>
      </div>
    </div>
  );
}
