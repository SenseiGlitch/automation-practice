import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function RelativeLocators() {
  const { updateProgress } = useStore();
  const [actions, setActions] = useState<Action[]>([
    { id: 'above', description: 'Located element using Above', timestamp: new Date(), completed: false },
    { id: 'below', description: 'Located element using Below', timestamp: new Date(), completed: false },
    { id: 'left-of', description: 'Located element using Left Of', timestamp: new Date(), completed: false },
    { id: 'right-of', description: 'Located element using Right Of', timestamp: new Date(), completed: false },
    { id: 'near', description: 'Located element using Near', timestamp: new Date(), completed: false }
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
          Relative Locators
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none">
            <h2>Understanding Relative Locators</h2>
            <p>In Selenium, we use different locators to find elements based on their position relative to others:</p>
            <ul>
              <li><strong>Above</strong>: Finds an element above another.</li>
              <li><strong>Below</strong>: Finds an element below another.</li>
              <li><strong>Left Of</strong>: Finds an element to the left of another.</li>
              <li><strong>Right Of</strong>: Finds an element to the right of another.</li>
              <li><strong>Near</strong>: Finds an element within 50px of another.</li>
            </ul>
          </div>
        </Card>

        {/* Updated Practice Area with the requested class */}
        <div 
          id="practice-area" 
          className="rounded-lg border text-card-foreground shadow-sm bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors flex flex-col items-center"
        >
          {/* Above Element */}
          <Button
            id="above"
            data-testid="test-above"
            className="bg-blue-500 text-white w-64"
            onClick={() => logAction('above')}
          >
            Find me using Above
          </Button>

          {/* Middle Row - Left, Center, Right */}
          <div className="flex justify-center items-center space-x-6 mt-4">
            <Button
              id="left-of"
              data-testid="test-left-of"
              className="bg-yellow-500 text-white w-64"
              onClick={() => logAction('left-of')}
            >
              Find me using Left Of
            </Button>

            <div
              id="center"
              data-testid="test-center"
              className="bg-red-500 text-white p-6 rounded-lg shadow-lg text-lg font-bold w-24 h-24 flex items-center justify-center"
            >
              Center
            </div>

            <Button
              id="right-of"
              data-testid="test-right-of"
              className="bg-purple-500 text-white w-64"
              onClick={() => logAction('right-of')}
            >
              Find me using Right Of
            </Button>
          </div>

          {/* Near Element */}
          <input
            id="near-input"
            data-testid="test-near"
            className="p-3 mt-4 bg-gray-700 text-white rounded-lg border border-gray-600 w-64 text-center"
            placeholder="Find me using Near"
            readOnly
            onClick={() => logAction('near')}
          />

          {/* Below Element */}
          <Button
            id="below"
            data-testid="test-below"
            className="bg-green-500 text-white w-64 mt-6"
            onClick={() => logAction('below')}
          >
            Find me using Below
          </Button>
        </div>

        <Card className="bg-slate-800/50 p-6 border-slate-700">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Actions Log</h2>
          <div className="space-y-3">
            {actions.map((action) => (
              <div
                key={action.id}
                className={`flex items-center justify-between p-3 rounded
                  ${action.completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                  border transition-all duration-500`}
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
