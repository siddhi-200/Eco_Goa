'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "@/firebase";
import { Logo } from "@/components/logo";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Auth service not available",
        description: "Please try again later.",
      });
      setIsLoading(false);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, data.email);
      setIsSent(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not send password reset email. Please check the address and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="mb-4 flex justify-center">
              <Logo />
            </div>
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            {isSent
              ? "Check your email for a password reset link."
              : "Enter your email and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        {!isSent && (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...form.register("email")} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </CardFooter>
          </form>
        )}
         <CardFooter className="flex justify-center">
            <Link href="/login" passHref>
                <Button variant="link">Back to login</Button>
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
