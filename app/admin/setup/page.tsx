import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setupAdmin } from "./actions";

export default async function AdminSetupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="font-serif text-2xl font-bold text-navy text-center mb-1">Create Admin Account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Only the designated admin email can be used here.
        </p>

        {error && (
          <p className="mb-4 text-sm text-center text-destructive bg-destructive/10 rounded-md py-2 px-3">
            {error}
          </p>
        )}

        <form action={setupAdmin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
          </div>
          <Button type="submit" className="bg-navy hover:bg-navy-dark mt-2">Create Account</Button>
        </form>
      </div>
    </div>
  );
}
