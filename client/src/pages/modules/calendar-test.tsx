import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function CalendarTest() {
  const { updateProgress } = useStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [actions, setActions] = useState<Action[]>([
    { id: 'select', description: 'Selected a date', timestamp: new Date(), completed: false },
    { id: 'navigate', description: 'Navigated between months', timestamp: new Date(), completed: false },
  ]);

  const logAction = (actionId: string) => {
    setActions(prevActions => 
      prevActions.map(action => 
        action.id === actionId 
          ? { ...action, completed: true, timestamp: new Date() }
          : action
      )
    );
  };

  useEffect(() => {
    if (actions.every(action => action.completed)) {
      updateProgress('calendar', true);
    }
  }, [actions]);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6 animate-fade-in">
          Calendar Practice
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none mb-6">
            <h2>Date Picker Testing</h2>
            <p>Practice interacting with calendar components:</p>
            <ul>
              <li>Select specific dates</li>
              <li>Navigate between months</li>
              <li>Verify selected dates</li>
            </ul>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              logAction('select');
            }}
            onMonthChange={() => logAction('navigate')}
            className="rounded-md border border-slate-700"
          />

          <div className="mt-4 p-4 bg-slate-700 rounded">
            Selected date: {date?.toLocaleDateString()}
          </div>
        </Card>

        <Card className="bg-slate-800/50 p-6 border-slate-700">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Actions Log</h2>
          <div className="space-y-3">
            {actions.map((action) => (
              <div 
                key={action.id}
                className={`
                  flex items-center justify-between p-3 rounded
                  ${action.completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                  border transition-all duration-500
                `}
              >
                <div className="flex items-center gap-2">
                  {action.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-500" />
                  )}
                  <span className="text-slate-200">{action.description}</span>
                </div>
                {action.completed && (
                  <span className="text-xs text-slate-400">
                    {action.timestamp.toLocaleTimeString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}