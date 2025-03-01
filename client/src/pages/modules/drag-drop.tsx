import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, ArrowUpDown, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function DragDrop() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [actions, setActions] = useState<Action[]>([
    { id: 'drag', description: 'Started dragging an item', timestamp: new Date(), completed: false },
    { id: 'drop', description: 'Dropped item in new position', timestamp: new Date(), completed: false },
    { id: 'reorder', description: 'Successfully reordered items', timestamp: new Date(), completed: false }
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
      updateProgress('drag-drop', true);
    }
  }, [actions, updateProgress]);

  const getCompletionPercentage = () => {
    const completed = actions.filter(action => action.completed).length;
    return Math.round((completed / actions.length) * 100);
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    logAction('drag');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    const sourceIndex = items.indexOf(item);

    if (sourceIndex !== targetIndex) {
      const newItems = [...items];
      newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, item);
      setItems(newItems);
      logAction('drop');
      logAction('reorder');
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Drag and Drop Automation</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Understanding HTML5 drag and drop API</li>
                    <li>Handling mouse events in test automation</li>
                    <li>Cross-browser compatibility challenges</li>
                    <li>Touch device considerations</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Synchronization</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Wait for both source and target elements</li>
                        <li>Handle animation transitions</li>
                        <li>Verify visual state changes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Error Handling</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Retry failed drag operations</li>
                        <li>Handle element position caching</li>
                        <li>Cross-browser fallback strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Real-World Scenarios</h3>
                  <div className="space-y-2">
                    <p className="text-emerald-200">✔️ File upload interfaces</p>
                    <p className="text-emerald-200">✔️ Kanban boards</p>
                    <p className="text-emerald-200">✔️ Sortable tables</p>
                    <p className="text-emerald-200">✔️ Dashboard widget rearrangement</p>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Drag and Drop Implementation</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Basic Drag and Drop</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// Using Actions API
WebElement source = driver.findElement(By.id("draggable"));
WebElement target = driver.findElement(By.id("droppable"));

new Actions(driver)
    .dragAndDrop(source, target)
    .build()
    .perform();`}
                </code>
              </pre>
              </div>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Sortable List Handling</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// Drag item from index 0 to index 2
List<WebElement> items = driver.findElements(By.css(".sortable-item"));

new Actions(driver)
    .clickAndHold(items.get(0))
    .moveToElement(items.get(2))
    .release()
    .build()
    .perform();`}
                </code>
              </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`// Always verify positions after operations
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.attributeContains(
    items.get(2), "data-position", "0"));

// Handle touch devices
if (isMobile) {
    new TouchActions(driver)
        .flick(items.get(0), 0, 100)
        .perform();
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
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Drag and Drop Practice</h3>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={item}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            className="p-4 bg-slate-700/50 rounded-lg border-2 border-slate-600
                               hover:border-emerald-500 cursor-move transition-all duration-300
                               flex items-center justify-between hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        >
                          <span className="text-slate-200">{item}</span>
                          <ArrowUpDown className="h-4 w-4 text-slate-400" />
                        </div>
                    ))}
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
                        <h3 className="text-emerald-300 mb-2">Visual Feedback</h3>
                        <p>Always verify visual changes after drag operations, not just DOM state.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Touch Support</h3>
                        <p>Test touch interactions separately for mobile compatibility.</p>
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
              <div className="font-medium text-white">Drag and Drop</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Drag</span> and Drop Automation
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
                  Master drag and drop interactions through hands-on practice. Learn professional automation techniques
                  for handling complex UI interactions across desktop and mobile platforms.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}