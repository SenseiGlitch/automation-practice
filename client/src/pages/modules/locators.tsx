import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function Locators() {
  const { updateProgress } = useStore();
  const [actions, setActions] = useState<Action[]>([
    { id: 'id', description: 'Found element by ID', timestamp: new Date(), completed: false },
    { id: 'class', description: 'Found element by class name', timestamp: new Date(), completed: false },
    { id: 'testid', description: 'Found element by data-testid', timestamp: new Date(), completed: false },
    { id: 'xpath', description: 'Found element by XPath', timestamp: new Date(), completed: false }
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
      updateProgress('locators', true);
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
          Locator Practice
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none">
            <h2>Element Locators</h2>
            <p>Practice using different locator strategies:</p>
            <ul>
              <li>ID</li>
              <li>Class Name</li>
              <li>CSS Selector</li>
              <li>XPath</li>
            </ul>
          </div>
        </Card>

        <div id="practice-area" className="space-y-4 mb-6">
          <div 
            id="test-id" 
            className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300"
            onClick={() => logAction('id')}
          >
            Find me by ID
          </div>

          <div 
            className="test-class p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300"
            onClick={() => logAction('class')}
          >
            Find me by class name
          </div>

          <div 
            data-testid="custom-element" 
            className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300"
            onClick={() => logAction('testid')}
          >
            Find me by data-testid
          </div>

          <div className="nested">
            <span 
              className="p-4 bg-slate-700 rounded block hover:bg-slate-600 transition-all duration-300"
              onClick={() => logAction('xpath')}
            >
              Find me by XPath
            </span>
          </div>
        </div>

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