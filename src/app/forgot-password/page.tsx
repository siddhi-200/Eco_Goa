'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '@/firebase';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/logo';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firebase is not configured. Password reset is disabled.',
      });
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setIsSent(true);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Password Reset Failed',
        description:
          error.code === 'auth/user-not-found'
            ? 'No user found with this email address.'
            : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {isSent
              ? "Check your email for a link to reset your password."
              : "Enter your email and we'll send you a link to get back into your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {isSent ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                If an account exists for {form.getValues('email')}, you will receive an email with reset instructions.
              </p>
              <Button asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send Reset Link
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        {!isSent && (
           <div className="mt-4 p-6 pt-0 text-center text-sm">
              Remember your password?{' '}
              <Link href="/login" className="underline">
                Log in
              </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
