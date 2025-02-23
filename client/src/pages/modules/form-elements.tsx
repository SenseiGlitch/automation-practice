import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function FormElements() {
  const { updateProgress } = useStore();
  const [actions, setActions] = useState<Action[]>([
    { id: 'text', description: 'Typed in text input', timestamp: new Date(), completed: false },
    { id: 'select', description: 'Used dropdown menu', timestamp: new Date(), completed: false },
    { id: 'checkbox', description: 'Toggled checkbox', timestamp: new Date(), completed: false },
    { id: 'radio', description: 'Selected radio button', timestamp: new Date(), completed: false }
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
      updateProgress('forms', true);
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
          Form Elements Practice
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none">
            <h2>Form Controls</h2>
            <p>Practice interacting with different form elements:</p>
          </div>

          <form className="space-y-6 mt-6">
            <div className="space-y-4">
              <Label>Text Input</Label>
              <Input 
                type="text" 
                placeholder="Enter your name"
                onChange={() => logAction('text')}
                className="transition-all duration-300 focus:border-emerald-500 hover:border-emerald-500/50"
              />
            </div>

            <div className="space-y-4">
              <Label>Dropdown</Label>
              <Select onValueChange={() => logAction('select')}>
                <SelectTrigger className="transition-all duration-300 hover:border-emerald-500/50">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Checkboxes</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox1" onCheckedChange={() => logAction('checkbox')} />
                  <Label htmlFor="checkbox1">Checkbox 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox2" onCheckedChange={() => logAction('checkbox')} />
                  <Label htmlFor="checkbox2">Checkbox 2</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Radio Buttons</Label>
              <RadioGroup defaultValue="1" onValueChange={() => logAction('radio')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="radio1" />
                  <Label htmlFor="radio1">Radio 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="radio2" />
                  <Label htmlFor="radio2">Radio 2</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
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