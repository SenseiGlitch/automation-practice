import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function FormElements() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [actions, setActions] = useState<Action[]>([
    { id: 'text', description: 'Typed in text input', timestamp: new Date(), completed: false },
    { id: 'select', description: 'Used dropdown menu', timestamp: new Date(), completed: false },
    { id: 'checkbox', description: 'Toggled checkbox', timestamp: new Date(), completed: false },
    { id: 'radio', description: 'Selected radio button', timestamp: new Date(), completed: false }
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
      updateProgress('forms', true);
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
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Form Automation</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Key Challenges</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Handling dynamic form fields</li>
                    <li>Managing form validation states</li>
                    <li>Cross-browser compatibility issues</li>
                    <li>Accessibility requirements</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Locators</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Use proper label associations</li>
                        <li>Leverage ARIA roles when available</li>
                        <li>Combine CSS selectors with text</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Validation</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Test boundary conditions</li>
                        <li>Verify error messages</li>
                        <li>Check success states</li>
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
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Form Handling</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Basic Form Interaction</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`WebElement nameInput = driver.findElement(By.id("name"));
nameInput.sendKeys("Test User");

WebElement emailInput = driver.findElement(By.cssSelector("[type='email']"));
emailInput.sendKeys("test@example.com");

driver.findElement(By.xpath("//button[text()='Submit']")).click();`}
                </code>
              </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Dropdown Handling</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`Select dropdown = new Select(driver.findElement(By.id("country")));
dropdown.selectByVisibleText("Canada");

// Get selected option
WebElement selectedOption = dropdown.getFirstSelectedOption();
String selectedText = selectedOption.getText();`}
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
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <Label className="text-emerald-400">Text Input</Label>
                      <Input
                          type="text"
                          placeholder="Enter your name"
                          onChange={() => logAction('text')}
                          className="bg-slate-900/50 border-slate-700 hover:border-emerald-500/50 focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-emerald-400">Dropdown</Label>
                      <Select onValueChange={() => logAction('select')}>
                        <SelectTrigger className="bg-slate-900/50 border-slate-700 hover:border-emerald-500/50">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          <SelectItem value="1" className="hover:bg-slate-800">Option 1</SelectItem>
                          <SelectItem value="2" className="hover:bg-slate-800">Option 2</SelectItem>
                          <SelectItem value="3" className="hover:bg-slate-800">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-emerald-400">Checkboxes</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="checkbox1"
                              onCheckedChange={() => logAction('checkbox')}
                              className="border-slate-600 data-[state=checked]:bg-emerald-500"
                          />
                          <Label htmlFor="checkbox1">Checkbox 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="checkbox2"
                              onCheckedChange={() => logAction('checkbox')}
                              className="border-slate-600 data-[state=checked]:bg-emerald-500"
                          />
                          <Label htmlFor="checkbox2">Checkbox 2</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-emerald-400">Radio Buttons</Label>
                      <RadioGroup defaultValue="1" onValueChange={() => logAction('radio')}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                              value="1"
                              id="radio1"
                              className="border-slate-600 data-[state=checked]:bg-emerald-500"
                          />
                          <Label htmlFor="radio1">Radio 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                              value="2"
                              id="radio2"
                              className="border-slate-600 data-[state=checked]:bg-emerald-500"
                          />
                          <Label htmlFor="radio2">Radio 2</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </form>
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
                        <h3 className="text-emerald-300 mb-2">Form Validation</h3>
                        <p>Always test both valid and invalid input scenarios.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                        <p>Verify proper label associations and keyboard navigation.</p>
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
              <div className="font-medium text-white">Form Elements</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Form</span> Handling Practice
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
                  Master form element interactions through hands-on practice. Learn professional techniques for
                  handling various form controls and validation scenarios in test automation.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}