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

export default function TraditionalLocators() {
  const { updateProgress } = useStore();
  const [actions, setActions] = useState<Action[]>([
    { id: 'id', description: 'Located element using ID', timestamp: new Date(), completed: false },
    { id: 'class', description: 'Located element using Class Name', timestamp: new Date(), completed: false },
    { id: 'name', description: 'Located element using Name', timestamp: new Date(), completed: false },
    { id: 'css', description: 'Located element using CSS Selector', timestamp: new Date(), completed: false },
    { id: 'xpath', description: 'Located element using XPath', timestamp: new Date(), completed: false },
    { id: 'tag', description: 'Located element using Tag Name', timestamp: new Date(), completed: false }
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
          Traditional Locators
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none">
            <h2>Understanding Traditional Locators</h2>
            <p>In Selenium, we use different locators to find elements on a webpage:</p>
            <ul>
              <li><strong>ID</strong>: Fastest and most preferred if available.</li>
              <li><strong>Class Name</strong>: Used for locating elements with a specific class.</li>
              <li><strong>Name</strong>: Uses the <code>name</code> attribute.</li>
              <li><strong>CSS Selector</strong>: Selects elements using CSS rules.</li>
              <li><strong>XPath</strong>: Selects elements using XML path expressions.</li>
              <li><strong>Link Text</strong>: Finds anchor elements by full text.</li>
              <li><strong>Partial Link Text</strong>: Finds links using partial text.</li>
              <li><strong>Tag Name</strong>: Finds elements by their HTML tag.</li>
            </ul>
          </div>
        </Card>

        <div id="practice-area" className="space-y-4 mb-6">
          <div
            id="test-id"
            data-testid="test-id"
            className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer"
            onClick={() => logAction('id')}
          >
            Find me using ID
          </div>

          <div
            className="test-class p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer"
            data-testid="test-class"
            onClick={() => logAction('class')}
          >
            Find me using Class Name
          </div>

          <input
            name="test-name"
            data-testid="test-name"
            className="p-4 bg-slate-700 rounded w-full hover:bg-slate-600 transition-all duration-300 cursor-pointer"
            onClick={() => logAction('name')}
            value="Find me using Name"
            readOnly
          />

          <div
            className="p-4 bg-slate-700 rounded hover:border-emerald-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
            data-testid="test-css"
            onClick={() => logAction('css')}
          >
            Find me using CSS Selector
          </div>

          <div 
            data-testid="test-xpath" 
            className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer" 
            onClick={() => logAction('xpath')}
          >
            Find me using XPath
          </div>

          <a 
            href="https://www.facebook.com/profile.php?id=61573631488846"
            data-testid="test-link-text"
            className="block p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer"
          >
            Find me using Full Link Text (Facebook)
          </a>

          <a 
            href="https://www.linkedin.com/in/omar97alaa/"
            data-testid="test-partial-link-text"
            className="block p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer"
          >
            Find me using Partial Link Text (LinkedIn)
          </a>

          <article 
            data-testid="test-tag"
            className="p-4 bg-slate-700 rounded hover:bg-slate-600 transition-all duration-300 cursor-pointer" 
            onClick={() => logAction('tag')}
          >
            Find me using Tag Name
          </article>
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
