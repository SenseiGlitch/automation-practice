import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function MultiWindow() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [actions, setActions] = useState<Action[]>([
    { id: 'open', description: 'Opened new window', timestamp: new Date(), completed: false },
    { id: 'switch', description: 'Switched between windows', timestamp: new Date(), completed: false }
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

  const getCompletionPercentage = () => {
    const completed = actions.filter(action => action.completed).length;
    return Math.round((completed / actions.length) * 100);
  };

  useEffect(() => {
    if (actions.every(action => action.completed)) {
      updateProgress('windows', true);
    }
  }, [actions]);

  const openNewWindow = () => {
    const newWindow = window.open('about:blank', '_blank', 'width=600,height=400');
    if (newWindow) {
      logAction('open');
      newWindow.onblur = () => logAction('switch');
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Multi-Window Handling Guide</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Window Identification:</strong> Handle windows using GUIDs or titles</li>
                    <li><strong>Focus Management:</strong> Properly switch between window contexts</li>
                    <li><strong>Cross-Window Communication:</strong> Implement postMessage API securely</li>
                    <li><strong>Lifecycle Handling:</strong> Manage window creation/destruction events</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Window count verification</li>
                        <li>Focus state tracking</li>
                        <li>URL validation per window</li>
                        <li>Cross-window data consistency</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Multiple window closures</li>
                        <li>Browser crash recovery</li>
                        <li>Different window sizes</li>
                        <li>Mixed HTTP/HTTPS contexts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Window Handling Code Examples</h2>
              <div className="space-y-6">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Window Handling</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Get all window handles
Set<String> handles = driver.getWindowHandles();
String mainWindow = driver.getWindowHandle();

// Switch to new window
for (String handle : handles) {
    if (!handle.equals(mainWindow)) {
        driver.switchTo().window(handle);
        break;
    }
}

// Verify new window properties
assertThat(driver.getTitle(), containsString("New Window"));

// Close window and switch back
driver.close();
driver.switchTo().window(mainWindow);`}
                  </code>
                </pre>
                </div>
              </div>
            </Card>
        );

      default:
        return (
            <div className="grid gap-6 mb-6">
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h3 className="text-lg font-medium text-emerald-300 mb-4">Window Management</h3>
                <div className="space-y-4">
                  <Button
                      onClick={openNewWindow}
                      className="w-full p-3 bg-slate-700/50 hover:bg-slate-600 transition-all"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open New Window
                  </Button>
                </div>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-slate-800/50 p-6 border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-emerald-400">Progress Tracker</h2>
                    <span className="text-lg font-bold text-emerald-400">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                    <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                  <div className="space-y-3">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className={`flex items-center justify-between p-3 rounded border 
                        ${action.completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                        transition-all duration-500`}
                        >
                          <div className="flex items-center gap-2">
                            {action.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                                <XCircle className="h-5 w-5 text-slate-500" />
                            )}
                            <span className="text-slate-200 capitalize">{action.description}</span>
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

                <Card className="bg-slate-800/50 p-6 border-slate-700">
                  <h2 className="text-xl font-semibold text-emerald-400 mb-4">Testing Tips</h2>
                  <div className="space-y-4 text-slate-300">
                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                      <h3 className="text-emerald-300 mb-2">Security</h3>
                      <p>Validate cross-window communication security policies</p>
                    </div>
                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                      <h3 className="text-emerald-300 mb-2">Performance</h3>
                      <p>Monitor memory usage with multiple windows open</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
        );
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-emerald-500/10 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Modules
              </Button>
            </Link>

            <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
              <div className="text-xs text-emerald-400 px-2">Module:</div>
              <div className="font-medium text-white">Window Management</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Multi-Window</span> Handling Practice
            </h1>

            <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
              <Button
                  variant={currentTab === 'practice' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('practice')}
                  className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Practice
              </Button>
              <Button
                  variant={currentTab === 'info' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('info')}
                  className={currentTab === 'info' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <Info className="h-4 w-4 mr-1" />
                Info
              </Button>
              <Button
                  variant={currentTab === 'code' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('code')}
                  className={currentTab === 'code' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Code
              </Button>
            </div>
          </div>

          <Card className="bg-slate-800/40 p-6 mb-6 border-slate-700 border-l-4 border-l-emerald-500">
            <div className="flex items-start gap-4">
              <ExternalLink className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                <p className="text-slate-300">
                  Practice handling multiple browser windows and tabs. Learn window switching strategies,
                  cross-window communication, and proper cleanup procedures for test automation.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}