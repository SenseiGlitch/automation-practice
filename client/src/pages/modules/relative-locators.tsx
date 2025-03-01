import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
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
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
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
            action.id === actionId && !action.completed
                ? { ...action, completed: true, timestamp: new Date() }
                : action
        )
    );
  };

  const getCompletionPercentage = () => {
    const completed = actions.filter(action => action.completed).length;
    return Math.round((completed / actions.length) * 100);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Relative Locators</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Why Relative Locators Matter</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Handle dynamic UI elements effectively</li>
                    <li>Create more resilient test scripts</li>
                    <li>Reduce maintenance overhead</li>
                    <li>Improve test readability</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Positioning</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Combine with other locator strategies</li>
                        <li>Verify element visibility first</li>
                        <li>Set explicit search ranges</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Performance</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Limit search distance for near()</li>
                        <li>Use relative locators sparingly</li>
                        <li>Cache frequently used elements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Real-World Applications</h3>
                  <div className="space-y-2">
                    <p className="text-emerald-200">✔️ Form label/input relationships</p>
                    <p className="text-emerald-200">✔️ Data table navigation</p>
                    <p className="text-emerald-200">✔️ Dynamic dashboard elements</p>
                    <p className="text-emerald-200">✔️ Complex UI component interactions</p>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Relative Locator Implementation</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Basic Usage</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`WebElement passwordField = driver.findElement(By.id("password"));
WebElement labelAbove = driver.findElement(
  RelativeLocator.with(By.tagName("label"))
                .above(passwordField));`}
                </code>
              </pre>
              </div>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Combining Locators</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`WebElement submitButton = driver.findElement(
  RelativeLocator.with(By.tagName("button"))
                .below(passwordField)
                .toRightOf(rememberMeCheckbox));`}
                </code>
              </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// Set maximum search distance
WebElement nearbyElement = driver.findElement(
  RelativeLocator.with(By.cssSelector(".tooltip"))
                .near(helpIcon, 100)); // 100 pixels

// Combine with explicit waits
new WebDriverWait(driver, Duration.ofSeconds(10))
  .until(ExpectedConditions.presenceOfElementLocated(
    RelativeLocator.with(By.tagName("input"))
      .below(usernameLabel)));`}
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
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Relative Locator Practice</h3>
                  <div className="flex flex-col items-center space-y-6">
                    <Button
                        id="above"
                        onClick={() => logAction('above')}
                        className="w-64 p-4 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      Find Above
                    </Button>

                    <div className="flex space-x-6">
                      <Button
                          id="left-of"
                          onClick={() => logAction('left-of')}
                          className="w-64 p-4 bg-slate-700/50 hover:bg-slate-600 transition-all"
                      >
                        Find Left Of
                      </Button>

                      <div className="bg-slate-700/50 p-6 rounded-lg border-2 border-slate-600 w-24 h-24 flex items-center justify-center">
                        Center
                      </div>

                      <Button
                          id="right-of"
                          onClick={() => logAction('right-of')}
                          className="w-64 p-4 bg-slate-700/50 hover:bg-slate-600 transition-all"
                      >
                        Find Right Of
                      </Button>
                    </div>

                    <input
                        id="near-input"
                        onClick={() => logAction('near')}
                        className="w-64 p-3 bg-slate-700/50 rounded-lg border-2 border-slate-600 hover:border-emerald-500 transition-all text-center cursor-pointer"
                        placeholder="Find Near"
                        readOnly
                    />

                    <Button
                        id="below"
                        onClick={() => logAction('below')}
                        className="w-64 p-4 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      Find Below
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
                        <h3 className="text-emerald-300 mb-2">Visual Hierarchy</h3>
                        <p>Always verify element positions in different screen resolutions.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Cross-Browser</h3>
                        <p>Test locators across different browsers for consistency.</p>
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
              <div className="font-medium text-white">Relative Locators</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Relative</span> Locator Strategies
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
                  Master advanced element location techniques using Selenium's relative locators. Learn professional
                  strategies for creating resilient test scripts that adapt to UI changes.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}