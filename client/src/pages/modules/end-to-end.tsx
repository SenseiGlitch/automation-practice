import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';

interface Action {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function EndToEnd() {
  const { updateProgress } = useStore();
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
  const [currentSection, setCurrentSection] = useState('form');

  const logAction = (actionId: string) => {
    setActions(prevActions => 
      prevActions.map(action => 
        action.id === actionId 
          ? { ...action, completed: true, timestamp: new Date() }
          : action
      )
    );
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

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-emerald-400 animate-fade-in">
            End-to-End Testing Challenge
          </h1>
        </div>

        <div className="prose prose-invert max-w-none mb-6">
          <p className="text-lg">
            Welcome to the final challenge! This module combines all the testing concepts you've learned.
            Complete a full registration process that includes form handling, calendar selection,
            drag-and-drop prioritization, iframe content, alerts, and multi-window interactions.
          </p>
        </div>

        <div className="space-y-6">
          {/* Form Section */}
          <Card className="bg-slate-800 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Registration Form</h2>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  type="text"
                  placeholder="Enter your name"
                  className="transition-all duration-300 focus:border-emerald-500"
                  onChange={() => logAction('form')}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="transition-all duration-300 focus:border-emerald-500"
                />
              </div>
              <div>
                <Label>Appointment Type</Label>
                <Select onValueChange={() => logAction('form')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Calendar Section */}
          <Card className="bg-slate-800 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
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
          <Card className="bg-slate-800 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Arrange Preferences</h2>
            <div className="space-y-4">
              {draggableItems.map((item, index) => (
                <div
                  key={item}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="p-4 bg-slate-700 rounded cursor-move border-2 border-slate-600 
                    hover:border-emerald-500 transition-all duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          {/* Iframe Section */}
          <Card className="bg-slate-800 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
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

        {/* Actions Log */}
        <Card className="bg-slate-800/50 p-6 border-slate-700 mt-6">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Progress Tracker</h2>
          <div className="space-y-3">
            {actions.map((action) => (
              <div 
                key={action.id}
                className={`
                  flex items-center justify-between p-3 rounded
                  ${action.completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                  border transition-all duration-500
                `}
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
