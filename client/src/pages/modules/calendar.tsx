import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';

export default function Calendar() {
  const { updateProgress } = useStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6">Calendar Practice</h1>
        
        <Card className="bg-slate-800 p-6 mb-6">
          <div className="prose prose-invert max-w-none mb-6">
            <h2>Date Picker Practice</h2>
            <p>Practice interacting with calendar components and date pickers.</p>
          </div>

          <div className="flex justify-center mb-6">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-slate-600"
            />
          </div>

          <div className="text-center text-slate-300 mb-6">
            Selected date: {date?.toLocaleDateString()}
          </div>

          <Button 
            onClick={() => updateProgress('calendar', true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Complete Module
          </Button>
        </Card>
      </div>
    </div>
  );
}
