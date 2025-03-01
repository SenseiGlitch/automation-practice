import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
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
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [actions, setActions] = useState<Action[]>([
    { id: 'click', description: 'Initiated content load', timestamp: new Date(), completed: false },
    { id: 'wait', description: 'Handled loading delay', timestamp: new Date(), completed: false },
    { id: 'loaded', description: 'Verified content presence', timestamp: new Date(), completed: false }
  ]);

  const logAction = (actionId: string) => {
    setActions(prevActions =>
        prevActions.map(action =>
            action.id === actionId && !action.completed
                ? { ...action, completed: true, timestamp: new Date() }
                : action
        )
    );
  };

  useEffect(() => {
    if (actions.every(action => action.completed)) {
      updateProgress('waits', true);
    }
  }, [actions, updateProgress]);

  const getCompletionPercentage = () => {
    const completed = actions.filter(action => action.completed).length;
    return Math.round((completed / actions.length) * 100);
  };

  const simulateLoad = () => {
    logAction('click');
    setLoading(true);
    setContent(null);

    setTimeout(() => logAction('wait'), 1500);
    setTimeout(() => {
      setLoading(false);
      setContent('Content loaded successfully!');
      logAction('loaded');
    }, 3000);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Wait Strategies</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Essential Wait Types</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Explicit Waits:</strong> Condition-based waiting</li>
                    <li><strong>Implicit Waits:</strong> Global timeout setting</li>
                    <li><strong>Fluent Waits:</strong> Configurable polling intervals</li>
                    <li><strong>Hard Waits:</strong> Thread.sleep() alternatives</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Timing</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Avoid fixed sleep times</li>
                        <li>Set reasonable timeout limits</li>
                        <li>Handle timeout exceptions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Implementation</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Use expected conditions</li>
                        <li>Combine with custom wait utilities</li>
                        <li>Implement retry mechanisms</li>
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
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Wait Implementations</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Explicit Wait</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement element = wait.until(ExpectedConditions
    .presenceOfElementLocated(By.id("content")));`}
                </code>
              </pre>
              </div>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Fluent Wait</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(5))
    .ignoring(NoSuchElementException.class);

WebElement element = fluentWait.until(driver -> 
    driver.findElement(By.cssSelector(".dynamic-content")));`}
                </code>
              </pre>
              </div>
            </Card>
        );

      default:
        return (
            <>
              <div className="grid gap-6 mb-6">
                <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Wait Strategy Practice</h3>
                  <div className="space-y-4">
                    <Button
                        onClick={simulateLoad}
                        disabled={loading}
                        className="w-full p-3 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                          'Simulate Content Load'
                      )}
                    </Button>

                    <div className="h-32 bg-slate-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-700">
                      {loading ? (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Loading Content...</span>
                          </div>
                      ) : content ? (
                          <div className="text-emerald-400 animate-fade-in">{content}</div>
                      ) : (
                          <div className="text-slate-500">Content will appear here</div>
                      )}
                    </div>
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

                  <Card className="bg-slate-800/50 p-6 border-slate-700">
                    <h2 className="text-xl font-semibold text-emerald-400 mb-4">Learning Tips</h2>
                    <div className="space-y-4 text-slate-300">
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Avoid Flaky Tests</h3>
                        <p>Use explicit waits instead of fixed sleeps for reliable test execution.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Wait Strategies</h3>
                        <p>Combine different wait types for optimal test performance.</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
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
              <div className="font-medium text-white">Wait Strategies</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Wait</span> Strategy Mastery
            </h1>

            <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
              <Button
                  variant={currentTab === 'practice' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('practice')}
                  className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <Code className="h-4 w-4 mr-1" />
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
              <MessageSquare className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                <p className="text-slate-300">
                  Master professional wait strategies through hands-on practice. Learn to implement
                  robust synchronization techniques for reliable test automation.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}