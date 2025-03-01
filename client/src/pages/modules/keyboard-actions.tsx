import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Keyboard } from 'lucide-react';
import { Link } from 'wouter';

interface KeyAction {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export const KeyboardPage: React.FC = () => {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [text, setText] = useState('');
  const [actions, setActions] = useState<KeyAction[]>([
    { id: 'modifier', description: 'Used modifier key', timestamp: new Date(), completed: false },
    { id: 'shortcut', description: 'Performed keyboard shortcut', timestamp: new Date(), completed: false },
    { id: 'sequence', description: 'Executed key sequence', timestamp: new Date(), completed: false }
  ]);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    if (actions.every(action => action.completed)) {
      updateProgress('keyboard', true);
    }
  }, [actions]);

  const handleKeyEvent = (e: React.KeyboardEvent) => {
    const newKeys = new Set(pressedKeys);
    if (e.type === 'keydown') {
      newKeys.add(e.key.toLowerCase());
      if (['control', 'shift', 'alt', 'meta'].includes(e.key.toLowerCase())) {
        logAction('modifier');
      }
    } else {
      newKeys.delete(e.key.toLowerCase());
    }
    setPressedKeys(newKeys);
  };

  const handleCopyPaste = () => {
    logAction('shortcut');
    logAction('sequence');
    setText(prev => prev + prev);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
          <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Keyboard Actions Guide</h2>
            <div className="space-y-6 text-slate-300">
              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li><strong>Key Press Sequences:</strong> Combinations of key down/up events</li>
                  <li><strong>Modifier Keys:</strong> Control, Shift, Alt, and Meta keys</li>
                  <li><strong>ASCII/Unicode:</strong> Character representation in automation</li>
                  <li><strong>Action Chains:</strong> Building complex interaction sequences</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Keyboard navigation</li>
                      <li>Shortcut key functionality</li>
                      <li>Input field focus states</li>
                      <li>Accessibility compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Simultaneous key presses</li>
                      <li>Long key press duration</li>
                      <li>International keyboard layouts</li>
                      <li>Sticky keys functionality</li>
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
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Keyboard Automation Code</h2>
            <div className="space-y-6">
              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Actions API</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Key press sequence example
Actions actions = new Actions(driver);
actions.keyDown(Keys.SHIFT)
       .sendKeys("a")
       .keyUp(Keys.SHIFT)
       .sendKeys("b")
       .perform();

// Copy-paste simulation
WebElement input = driver.findElement(By.id("text-input"));
String cmdCtrl = Platform.getCurrent().is(Platform.MAC) ? Keys.COMMAND : Keys.CONTROL;

new Actions(driver)
    .sendKeys(input, "Selenium!")
    .sendKeys(Keys.ARROW_LEFT)
    .keyDown(Keys.SHIFT)
    .sendKeys(Keys.ARROW_UP)
    .keyUp(Keys.SHIFT)
    .keyDown(cmdCtrl)
    .sendKeys("xvv")
    .keyUp(cmdCtrl)
    .perform();`}
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
              <h3 className="text-lg font-medium text-emerald-300 mb-4">Keyboard Interaction</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {['Control', 'Shift', 'Alt', 'Meta'].map((key) => (
                    <Button
                      key={key}
                      variant={pressedKeys.has(key.toLowerCase()) ? "default" : "outline"}
                      className={pressedKeys.has(key.toLowerCase())
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-slate-700/50 hover:bg-slate-600"}
                    >
                      {key}
                    </Button>
                  ))}
                </div>

                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyEvent}
                  onKeyUp={handleKeyEvent}
                  className="w-full p-3 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-300 focus:border-emerald-500 focus:ring-0"
                  placeholder="Type here to test keyboard actions..."
                />

                <Button
                  onClick={handleCopyPaste}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Simulate Copy-Paste (Ctrl+A Ctrl+C Ctrl+V)
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
                    <h3 className="text-emerald-300 mb-2">Modifier Keys</h3>
                    <p>Test combinations with Shift, Control, Alt, and Command/Meta keys</p>
                  </div>
                  <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                    <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                    <p>Verify keyboard navigation works without mouse interaction</p>
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
            <div className="font-medium text-white">Keyboard Actions</div>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-emerald-400">Keyboard</span> Actions Practice
          </h1>

          <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
            <Button
              variant={currentTab === 'practice' ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrentTab('practice')}
              className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
            >
              <Keyboard className="h-4 w-4 mr-1" />
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
            <Keyboard className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
              <p className="text-slate-300">
                Practice and validate keyboard interaction patterns in web applications.
                Learn to automate complex key sequences, modifier combinations,
                and accessibility-focused keyboard navigation.
              </p>
            </div>
          </div>
        </Card>

        {renderTab()}
      </div>
    </div>
  );
};