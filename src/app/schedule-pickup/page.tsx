
'use client';

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation';

const scheduleSchema = z.object({
  address: z.string().min(10, "Please enter a valid address"),
  pickupDate: z.date({
    required_error: "A pickup date is required.",
  }),
  timeSlot: z.string().nonempty("Please select a time slot"),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export default function SchedulePickupPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit = (data: ScheduleFormValues) => {
    setIsLoading(true);
    console.log("Scheduling pickup with data:", data);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Pickup Scheduled!",
        description: `Your waste pickup is confirmed for ${format(data.pickupDate, "PPP")} in the ${data.timeSlot} slot.`,
      });
      form.reset();
      router.push('/tracking');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-in fade-in">
      <PageHeader
        title="Schedule a Pickup"
        description="Arrange for waste collection at your address in Goa."
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>Fill in the form below to book your waste collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="schedule-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="e.g., 123 Beach Road, Candolim, Goa" {...form.register("address")} />
              {form.formState.errors.address && <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.watch("pickupDate") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("pickupDate") ? format(form.watch("pickupDate"), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.watch("pickupDate")}
                      onSelect={(date) => form.setValue("pickupDate", date as Date)}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                 {form.formState.errors.pickupDate && <p className="text-sm text-destructive">{form.formState.errors.pickupDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-slot">Time Slot</Label>
                <Select onValueChange={(value) => form.setValue("timeSlot", value)}>
                  <SelectTrigger id="time-slot">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1pm - 5pm)</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.timeSlot && <p className="text-sm text-destructive">{form.formState.errors.timeSlot.message}</p>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="schedule-form" disabled={isLoading} className="w-full md:w-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Scheduling..." : "Schedule Pickup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
