import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, ArrowUpDown } from 'lucide-react';
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
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [actions, setActions] = useState<Action[]>([
    { id: 'drag', description: 'Started dragging an item', timestamp: new Date(), completed: false },
    { id: 'drop', description: 'Dropped item in new position', timestamp: new Date(), completed: false },
    { id: 'reorder', description: 'Successfully reordered items', timestamp: new Date(), completed: false }
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

  useEffect(() => {
    // Check if all actions are completed to update progress
    const allCompleted = actions.every(action => action.completed);
    if (allCompleted) {
      updateProgress('drag-drop', true);
    }
  }, [actions]);

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

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6 animate-fade-in">
          Drag and Drop Practice
        </h1>

        <Card className="bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none mb-6">
            <h2>Drag and Drop Elements</h2>
            <p>Practice handling drag and drop interactions by reordering the items below:</p>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`
                  p-4 bg-slate-700 rounded cursor-move 
                  border-2 border-slate-600 
                  hover:border-emerald-500 
                  transition-all duration-300 
                  hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]
                  transform hover:scale-102
                  flex items-center justify-between
                `}
              >
                <span>{item}</span>
                <ArrowUpDown className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-slate-800/50 p-6 border-slate-700">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            Actions Log
          </h2>
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