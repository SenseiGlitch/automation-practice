import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function Hover() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [actions, setActions] = useState<Action[]>([
    { id: 'hover1', description: 'Hovered first item', timestamp: new Date(), completed: false },
    { id: 'hover2', description: 'Hovered second item', timestamp: new Date(), completed: false },
    { id: 'hover3', description: 'Hovered third item', timestamp: new Date(), completed: false }
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
      updateProgress('hover', true);
    }
  }, [actions, updateProgress]);

  const getCompletionPercentage = () => {
    const completed = actions.filter(action => action.completed).length;
    return Math.round((completed / actions.length) * 100);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Hover Interactions</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Why Hover Handling Matters</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Critical for testing dropdown menus and tooltips</li>
                    <li>Essential for modern web application workflows</li>
                    <li>Challenging due to timing and positioning requirements</li>
                    <li>Varies across devices (desktop vs mobile)</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Timing</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Use explicit waits for hover effects</li>
                        <li>Account for animation durations</li>
                        <li>Implement retry mechanisms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Positioning</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Verify element visibility</li>
                        <li>Handle edge cases in viewport</li>
                        <li>Consider scroll positions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Real-World Scenarios</h3>
                  <div className="space-y-2">
                    <p className="text-emerald-200">✔️ Navigation menu dropdowns</p>
                    <p className="text-emerald-200">✔️ Data visualization tooltips</p>
                    <p className="text-emerald-200">✔️ Image gallery previews</p>
                    <p className="text-emerald-200">✔️ Contextual action buttons</p>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Hover Implementation</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Basic Hover Action</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`WebElement element = driver.findElement(By.css(".hover-target"));
new Actions(driver)
    .moveToElement(element)
    .perform();`}
                </code>
              </pre>
              </div>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Chained Actions</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`new Actions(driver)
    .moveToElement(menuItem)
    .pause(Duration.ofMillis(500)) // Wait for animation
    .click(hiddenSubMenu)
    .perform();`}
                </code>
              </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// Verify hover state changes
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.visibilityOf(hiddenElement));

// Mobile fallback strategy
if (isTouchDevice) {
    new TouchActions(driver).tap(element).perform();
} else {
    new Actions(driver).moveToElement(element).perform();
}`}
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
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Hover Practice</h3>
                  <div className="grid gap-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="p-4 bg-slate-700/50 rounded-lg border-2 border-slate-600
                        hover:border-emerald-500 transition-all duration-300 cursor-pointer
                        hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            onMouseEnter={() => {
                              setHoveredItem(`Item ${item}`);
                              logAction(`hover${item}`);
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className="flex items-center justify-between">
                            <span>Hover Target {item}</span>
                            <div className="h-2 w-2 bg-emerald-500 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                          </div>
                        </div>
                    ))}

                    {hoveredItem && (
                        <div className="p-4 bg-emerald-900/30 border border-emerald-500/50 rounded-lg animate-fade-in">
                          Active hover: <span className="text-emerald-400">{hoveredItem}</span>
                        </div>
                    )}
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
                        <h3 className="text-emerald-300 mb-2">Timing Matters</h3>
                        <p>Always account for hover transition animations in your tests.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Mobile Considerations</h3>
                        <p>Remember hover states don't exist on touch devices - test tap interactions separately.</p>
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
              <div className="font-medium text-white">Hover Interactions</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Hover</span> Interaction Practice
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
                  Master hover interaction testing through hands-on practice. Learn professional techniques for
                  handling complex hover states and timing-sensitive UI elements in test automation.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}