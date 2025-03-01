import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Info, BookOpen, Code, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function EndToEnd() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [actions, setActions] = useState<Action[]>([
    { id: 'form', description: 'Filled out registration form', timestamp: new Date(), completed: false },
    { id: 'calendar', description: 'Selected appointment date', timestamp: new Date(), completed: false },
    { id: 'drag', description: 'Arranged preferences', timestamp: new Date(), completed: false },
    { id: 'iframe', description: 'Viewed terms in iframe', timestamp: new Date(), completed: false },
    { id: 'alert', description: 'Handled confirmation alert', timestamp: new Date(), completed: false },
    { id: 'window', description: 'Opened preview in new window', timestamp: new Date(), completed: false }
  ]);

  const [draggableItems, setDraggableItems] = useState(['High Priority', 'Medium Priority', 'Low Priority']);
  const [showIframe, setShowIframe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appointmentType: ''
  });

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
      updateProgress('end-to-end', true);
    }
  }, [actions]);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    const sourceIndex = draggableItems.indexOf(item);

    if (sourceIndex !== targetIndex) {
      const newItems = [...draggableItems];
      newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, item);
      setDraggableItems(newItems);
      logAction('drag');
    }
  };

  const openPreview = () => {
    const newWindow = window.open('about:blank', '_blank', 'width=600,height=400');
    if (newWindow) {
      logAction('window');
      const content = `
        <html>
          <body style="background: #1a1a1a; color: #fff; font-family: sans-serif; padding: 20px;">
            <h2>Registration Preview</h2>
            <p>Appointment Date: ${date?.toLocaleDateString()}</p>
            <p>Preferences: ${draggableItems.join(', ')}</p>
          </body>
        </html>
      `;
      newWindow.document.write(content);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you ready to submit your registration?')) {
      logAction('alert');
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">End-to-End Testing Guide</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Challenge Overview</h3>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Complete a realistic user registration flow</li>
                    <li>Integrate multiple interaction types in one scenario</li>
                    <li>Handle cross-component dependencies</li>
                    <li>Validate end-to-end system behavior</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Concepts</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Core Features</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Form validation</li>
                        <li>Dynamic content handling</li>
                        <li>Cross-window communication</li>
                        <li>State persistence</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Invalid date selection</li>
                        <li>Form submission errors</li>
                        <li>Drag-and-drop failures</li>
                        <li>Iframe loading issues</li>
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
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">E2E Test Code Example</h2>
              <div className="space-y-6">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Sample Selenium test structure
public void testRegistrationFlow() {
    // Fill form
    driver.findElement(By.id("name")).sendKeys("John Doe");
    driver.findElement(By.id("email")).sendKeys("john@example.com");
    
    // Select date
    driver.findElement(By.css(".calendar-input")).click();
    driver.findElement(By.css("[data-date='2023-12-25']")).click();
    
    // Handle drag-and-drop
    WebElement dragItem = driver.findElement(By.id("high-priority"));
    WebElement dropZone = driver.findElement(By.id("priority-list"));
    new Actions(driver).dragAndDrop(dragItem, dropZone).perform();
    
    // Verify submission
    driver.findElement(By.id("submit-btn")).click();
    Alert alert = driver.switchTo().alert();
    Assert.assertEquals(alert.getText(), "Registration successful!");
}`}
                  </code>
                </pre>
                </div>
              </div>
            </Card>
        );

      default:
        return (
            <div className="space-y-6">
              {/* Form Section */}
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Registration Form</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Full Name</Label>
                    <Input
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          logAction('form');
                        }}
                        className="bg-slate-900/50 border-slate-700 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Email</Label>
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-900/50 border-slate-700 focus:border-emerald-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-slate-300">Appointment Type</Label>
                    <Select
                        value={formData.appointmentType}
                        onValueChange={(value) => {
                          setFormData({ ...formData, appointmentType: value });
                          logAction('form');
                        }}
                    >
                      <SelectTrigger className="bg-slate-900/50 border-slate-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="consultation" className="hover:bg-slate-700">Consultation</SelectItem>
                        <SelectItem value="followup" className="hover:bg-slate-700">Follow-up</SelectItem>
                        <SelectItem value="review" className="hover:bg-slate-700">Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Calendar Section */}
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Select Appointment Date</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      logAction('calendar');
                    }}
                    className="rounded-md border border-slate-700"
                />
              </Card>

              {/* Drag and Drop Section */}
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Arrange Preferences</h2>
                <div className="space-y-4">
                  {draggableItems.map((item, index) => (
                      <div
                          key={item}
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className="p-4 bg-slate-700 rounded cursor-move border-2 border-slate-600 hover:border-emerald-500 transition-all duration-300"
                      >
                        {item}
                      </div>
                  ))}
                </div>
              </Card>

              {/* Iframe Section */}
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Terms & Conditions</h2>
                <Button
                    variant="outline"
                    onClick={() => {
                      setShowIframe(true);
                      logAction('iframe');
                    }}
                    className="mb-4"
                >
                  View Terms
                </Button>
                {showIframe && (
                    <iframe
                        src="about:blank"
                        className="w-full h-48 bg-slate-700 rounded border border-slate-600"
                    />
                )}
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                    onClick={openPreview}
                    variant="outline"
                    className="flex-1 transition-all duration-300 hover:border-emerald-500"
                >
                  Preview in New Window
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Registration
                </Button>
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
              <div className="font-medium text-white">Final Challenge</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">End-to-End</span> Testing Challenge
            </h1>
            <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
              <Button
                  variant={currentTab === 'practice' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('practice')}
                  className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
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
              <Trophy className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                <p className="text-slate-300">
                  Demonstrate comprehensive testing skills by completing a full user workflow.
                  Integrate multiple interaction types and validate system behavior end-to-end.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}

          {/* Progress Tracker */}
          <Card className="bg-slate-800/50 p-6 border-slate-700 mt-6">
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
        </div>
      </div>
  );
}