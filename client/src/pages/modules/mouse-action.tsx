import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Mouse } from 'lucide-react';
import { Link } from 'wouter';

interface MouseAction {
    id: string;
    description: string;
    timestamp: Date;
    completed: boolean;
}

export const MouseActionsPage: React.FC = () => {
    const { updateProgress } = useStore();
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [actions, setActions] = useState<MouseAction[]>([
        { id: 'click', description: 'Performed left click', timestamp: new Date(), completed: false },
        { id: 'rightClick', description: 'Performed right click', timestamp: new Date(), completed: false },
        { id: 'doubleClick', description: 'Performed double click', timestamp: new Date(), completed: false },
        { id: 'dragDrop', description: 'Completed drag and drop', timestamp: new Date(), completed: false },
        { id: 'hover', description: 'Hovered over element', timestamp: new Date(), completed: false }
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [dropPos, setDropPos] = useState({ x: 200, y: 200 });

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
            updateProgress('mouse', true);
        }
    }, [actions]);

    const handleDragStart = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragPos({ x: e.clientX, y: e.clientY });
    };

    const handleDrag = (e: React.MouseEvent) => {
        if (isDragging) {
            setDragPos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        if (Math.abs(dragPos.x - dropPos.x) < 50 && Math.abs(dragPos.y - dropPos.y) < 50) {
            logAction('dragDrop');
        }
    };

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mouse Actions Guide</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-2">
                                    <li><strong>Pointer Events:</strong> Mouse movements and button states</li>
                                    <li><strong>Element Interaction:</strong> Click targets and hover states</li>
                                    <li><strong>Drag Operations:</strong> Start, move, and end sequences</li>
                                    <li><strong>Context Actions:</strong> Right-click and special behaviors</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Click target accuracy</li>
                                            <li>Drag-and-drop precision</li>
                                            <li>Hover state transitions</li>
                                            <li>Context menu functionality</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Out-of-bounds dragging</li>
                                            <li>Rapid click sequences</li>
                                            <li>Multi-monitor setups</li>
                                            <li>High-DPI scaling</li>
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
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mouse Automation Code</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Actions API</h3>
                                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Drag and drop example
WebElement draggable = driver.findElement(By.id("draggable"));
WebElement droppable = driver.findElement(By.id("droppable"));
new Actions(driver)
    .dragAndDrop(draggable, droppable)
    .perform();

// Context click example
new Actions(driver)
    .contextClick(element)
    .perform();

// Mouse movement example
new Actions(driver)
    .moveToElement(element)
    .moveByOffset(10, 20)
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
                            <h3 className="text-lg font-medium text-emerald-300 mb-4">Mouse Interaction</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div
                                        className="relative h-48 bg-slate-900/80 rounded-lg border border-slate-700"
                                        onMouseEnter={() => logAction('hover')}
                                    >
                                        <div className="absolute top-2 left-2 text-sm text-slate-400">
                                            Hover Area (Detects mouse enter)
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                logAction('rightClick');
                                            }}
                                            onClick={() => logAction('click')}
                                            onDoubleClick={() => logAction('doubleClick')}
                                            className="w-full bg-slate-700/50 hover:bg-slate-600"
                                        >
                                            Click/Right-Click/Double-Click
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative h-64 bg-slate-900/80 rounded-lg border border-slate-700">
                                    <div className="absolute text-sm text-slate-400 top-2 left-2">
                                        Drag and Drop Area
                                    </div>
                                    <div
                                        className={`absolute w-16 h-16 bg-emerald-600/50 rounded-lg cursor-move transition-transform
                      ${isDragging ? 'ring-2 ring-emerald-400' : ''}`}
                                        style={{
                                            transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
                                            pointerEvents: isDragging ? 'none' : 'auto'
                                        }}
                                        onMouseDown={handleDragStart}
                                        onMouseMove={handleDrag}
                                        onMouseUp={handleDragEnd}
                                        onMouseLeave={handleDragEnd}
                                    >
                                        <div className="flex items-center justify-center h-full text-slate-300">
                                            Drag Me
                                        </div>
                                    </div>
                                    <div
                                        className="absolute w-24 h-24 bg-slate-700/50 rounded-lg border-2 border-dashed border-emerald-500/50"
                                        style={{ transform: `translate(${dropPos.x}px, ${dropPos.y}px)` }}
                                    >
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            Drop Zone
                                        </div>
                                    </div>
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
                                        <h3 className="text-emerald-300 mb-2">Precision</h3>
                                        <p>Test click targets with varying pointer speeds</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Edge Cases</h3>
                                        <p>Verify behavior during rapid interactions</p>
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
                        <div className="font-medium text-white">Mouse Actions</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">Mouse</span> Actions Practice
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        <Button
                            variant={currentTab === 'practice' ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentTab('practice')}
                            className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                        >
                            <Mouse className="h-4 w-4 mr-1" />
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
                        <Mouse className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Practice and validate mouse interaction patterns including clicks, hover states,
                                and drag-and-drop operations. Learn automation techniques for complex pointer
                                interactions in web applications.
                            </p>
                        </div>
                    </div>
                </Card>

                {renderTab()}
            </div>
        </div>
    );
};