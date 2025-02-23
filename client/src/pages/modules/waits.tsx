import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function Waits() {
  const { updateProgress } = useStore();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [actions, setActions] = useState<Action[]>([
    { id: 'click', description: 'Clicked load button', timestamp: new Date(), completed: false },
    { id: 'wait', description: 'Waited for content', timestamp: new Date(), completed: false },
    { id: 'loaded', description: 'Content loaded successfully', timestamp: new Date(), completed: false }
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
      updateProgress('waits', true);
    }
  }, [actions]);

  const simulateLoad = () => {
    logAction('click');
    setLoading(true);
    setContent(null);

    setTimeout(() => {
      logAction('wait');
    }, 1500);

    setTimeout(() => {
      setLoading(false);
      setContent('Content loaded after delay!');
      logAction('loaded');
    }, 3000);
  };

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
          Waits Practice
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none mb-6">
            <h2>Wait Strategies</h2>
            <p>Practice different types of waits:</p>
            <ul>
              <li>Explicit waits</li>
              <li>Implicit waits</li>
              <li>Conditional waits</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={simulateLoad}
              disabled={loading}
              variant="outline"
              className="w-full transition-all duration-300 hover:border-emerald-500"
            >
              Load Content
            </Button>

            <div className="h-32 bg-slate-700 rounded flex items-center justify-center">
              {loading && (
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
              )}
              {content && (
                <div className="text-emerald-400 animate-fade-in">{content}</div>
              )}
              {!loading && !content && (
                <div className="text-slate-500">Click button to load content</div>
              )}
            </div>
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