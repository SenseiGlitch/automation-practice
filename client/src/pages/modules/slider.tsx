import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Sliders } from 'lucide-react';
import { Link } from 'wouter';

interface SliderAction {
    id: string;
    description: string;
    timestamp: Date;
    completed: boolean;
}

export const SliderPage: React.FC = () => {
    const { updateProgress } = useStore();
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [value, setValue] = useState(50);
    const [showTooltip, setShowTooltip] = useState(false);
    const [actions, setActions] = useState<SliderAction[]>([
        { id: 'move', description: 'Adjusted slider value', timestamp: new Date(), completed: false },
        { id: 'hover', description: 'Hovered over slider', timestamp: new Date(), completed: false }
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

    const getCompletionPercentage = () => {
        const completed = actions.filter(action => action.completed).length;
        return Math.round((completed / actions.length) * 100);
    };

    useEffect(() => {
        if (actions.every(action => action.completed)) {
            updateProgress('slider', true);
        }
    }, [actions]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setValue(newValue);
        if (!actions[0].completed) logAction('move');
    };

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Slider Testing Guide</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-2">
                                    <li><strong>Input Validation:</strong> Range and boundary checks</li>
                                    <li><strong>Accessibility:</strong> ARIA roles and keyboard navigation</li>
                                    <li><strong>Visual Feedback:</strong> Tooltips and value indicators</li>
                                    <li><strong>State Management:</strong> Drag operations and touch events</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Minimum/maximum values</li>
                                            <li>Step increments</li>
                                            <li>Drag-and-drop accuracy</li>
                                            <li>Form submission values</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Extreme value handling</li>
                                            <li>Concurrent interactions</li>
                                            <li>Mobile touch events</li>
                                            <li>Disabled states</li>
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
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Slider Automation Code</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Slider Handling</h3>
                                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Move slider to specific value
WebElement slider = driver.findElement(By.css(".slider"));
Actions actions = new Actions(driver);
actions.dragAndDropBy(slider, xOffset, 0).perform();

// Verify slider value
String value = slider.getAttribute("value");
assertEquals(expectedValue, value);

// Alternative method using sendKeys
slider.sendKeys(Keys.ARROW_RIGHT);`}
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
                            <h3 className="text-lg font-medium text-emerald-300 mb-4">Slider Interaction</h3>
                            <div className="space-y-4">
                                <div className="relative" data-test="slider-container">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={value}
                                        onChange={handleSliderChange}
                                        onMouseEnter={() => {
                                            setShowTooltip(true);
                                            if (!actions[1].completed) logAction('hover');
                                        }}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        className="w-full slider-thumb-emerald slider-track-slate-700"
                                    />
                                    {showTooltip && (
                                        <div
                                            className="absolute -top-8 px-2 py-1 bg-emerald-600 text-white rounded text-sm transform -translate-x-1/2"
                                            style={{ left: `${value}%` }}
                                            data-test="slider-tooltip"
                                        >
                                            {value}
                                        </div>
                                    )}
                                </div>
                                <Card className="p-4 bg-slate-900/80 border-slate-700 text-center">
                  <span className="text-emerald-400 font-mono" data-test="slider-value">
                    Current Value: {value}
                  </span>
                                </Card>
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
                                        <p>Test exact value selection using keyboard arrows</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                                        <p>Verify keyboard navigation and ARIA labels</p>
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
                        <div className="font-medium text-white">Slider Controls</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">Slider</span> Handling Practice
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        <Button
                            variant={currentTab === 'practice' ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentTab('practice')}
                            className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                        >
                            <Sliders className="h-4 w-4 mr-1" />
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
                        <Sliders className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Practice interacting with slider controls and validate their behavior.
                                Learn automation techniques for range inputs and verify visual feedback
                                mechanisms in web applications.
                            </p>
                        </div>
                    </div>
                </Card>

                {renderTab()}
            </div>
        </div>
    );
};