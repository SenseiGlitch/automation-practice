import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { useStore } from '@/lib/store';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function TraditionalLocators() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [actions, setActions] = useState<Action[]>([
    { id: 'id', description: 'Located element using ID', timestamp: new Date(), completed: false },
    { id: 'class', description: 'Located element using Class Name', timestamp: new Date(), completed: false },
    { id: 'name', description: 'Located element using Name', timestamp: new Date(), completed: false },
    { id: 'css', description: 'Located element using CSS Selector', timestamp: new Date(), completed: false },
    { id: 'xpath', description: 'Located element using XPath', timestamp: new Date(), completed: false },
    { id: 'tag', description: 'Located element using Tag Name', timestamp: new Date(), completed: false }
  ]);

  const logAction = (actionId: string) => {
    setActions(prevActions => {
      const updatedActions = prevActions.map(action =>
          action.id === actionId && !action.completed
              ? { ...action, completed: true, timestamp: new Date() }
              : action
      );

      if (updatedActions.every(a => a.completed)) {
        updateProgress('locators', true);
      }

      return updatedActions;
    });
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
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Understanding Traditional Locators</h2>
              <div className="space-y-4 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Locator Strategies</h3>
                  <p>Traditional locators form the foundation of web automation. Key locators include:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li><strong>ID</strong>: Most efficient and preferred locator</li>
                    <li><strong>Class Name</strong>: For elements with shared classes</li>
                    <li><strong>CSS Selectors</strong>: Flexible element targeting</li>
                    <li><strong>XPath</strong>: Powerful XML path queries</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Prefer stable, unique identifiers</li>
                    <li>Avoid overly complex XPath expressions</li>
                    <li>Use CSS selectors for performance</li>
                    <li>Implement explicit waits for dynamic elements</li>
                  </ul>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Code Samples</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Locator Examples</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// By ID
WebElement element = driver.findElement(By.id("test-id"));

// By Class Name
WebElement element = driver.findElement(By.className("test-class"));

// By CSS Selector
WebElement element = driver.findElement(By.cssSelector("input[name='test-name']"));

// By XPath
WebElement element = driver.findElement(By.xpath("//article[contains(text(), 'Tag Name')]"));`}
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
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Interactive Practice Elements</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                        id="test-id"
                        onClick={() => logAction('id')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                    >
                      <span className="text-emerald-400">ID:</span> test-id
                    </div>

                    <div
                        className="test-class"
                        onClick={() => logAction('class')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                    >
                      <span className="text-emerald-400">Class:</span> test-class
                    </div>

                    <input
                        name="test-name"
                        onClick={() => logAction('name')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                        value="Name: test-name"
                        readOnly
                    />

                    <div
                        onClick={() => logAction('css')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                    >
                      <span className="text-emerald-400">CSS:</span> div[data-testid='test-css']
                    </div>

                    <div
                        onClick={() => logAction('xpath')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                    >
                      <span className="text-emerald-400">XPath:</span> //div[@data-testid='test-xpath']
                    </div>

                    <article
                        onClick={() => logAction('tag')}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all"
                    >
                      <span className="text-emerald-400">Tag:</span> article
                    </article>
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
                        <h3 className="text-emerald-300 mb-2">Locator Priority</h3>
                        <p>Always prefer ID first, then CSS selectors, then XPath. Avoid using fragile locators like text matches when possible.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">XPath Tips</h3>
                        <p>Use relative XPaths and avoid indexes. Prefer text matches with contains() for dynamic content.</p>
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
              <div className="font-medium text-white">Traditional Locators</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Locator</span> Strategies Lab
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
                  Master traditional web element locators through interactive practice. Complete all locator types
                  by finding and interacting with the corresponding elements in the practice area.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}