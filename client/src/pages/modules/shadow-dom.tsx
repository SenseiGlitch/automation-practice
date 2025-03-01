import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Box } from 'lucide-react';
import { Link } from 'wouter';

interface ShadowAction {
    id: string;
    description: string;
    timestamp: Date;
    completed: boolean;
}

export const ShadowDOMPage: React.FC = () => {
    const { updateProgress } = useStore();
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [actions, setActions] = useState<ShadowAction[]>([
        { id: 'access', description: 'Accessed shadow element', timestamp: new Date(), completed: false },
        { id: 'interact', description: 'Interacted with shadow component', timestamp: new Date(), completed: false }
    ]);

    const hostRef = useRef<HTMLDivElement>(null);
    const shadowRootRef = useRef<ShadowRoot | null>(null);

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
            updateProgress('shadow-dom', true);
        }
    }, [actions]);

    useEffect(() => {
        if (hostRef.current && !shadowRootRef.current) {
            shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });

            const style = document.createElement('style');
            style.textContent = `
        .shadow-content {
          padding: 20px;
          background: #1e293b;
          border-radius: 8px;
          border: 1px solid #334155;
          color: #f8fafc;
        }
        .shadow-button {
          background: #059669;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .shadow-button:hover {
          background: #047857;
        }
      `;

            const content = document.createElement('div');
            content.className = 'shadow-content';
            content.innerHTML = `
        <h2 style="color: #34d399; margin-bottom: 1rem;">Shadow DOM Content</h2>
        <p style="margin-bottom: 1rem;">This content is encapsulated within Shadow DOM</p>
        <button class="shadow-button" data-test="shadow-button">
          Interact with Shadow DOM
        </button>
      `;

            const button = content.querySelector('button');
            if (button) {
                button.addEventListener('click', () => {
                    logAction('interact');
                    alert('Shadow DOM button clicked!');
                });
            }

            shadowRootRef.current.appendChild(style);
            shadowRootRef.current.appendChild(content);
            logAction('access');
        }

        return () => {
            if (shadowRootRef.current) {
                shadowRootRef.current.innerHTML = '';
            }
        };
    }, []);

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Shadow DOM Testing Guide</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-2">
                                    <li><strong>Encapsulation:</strong> Style and DOM isolation</li>
                                    <li><strong>Component Scoping:</strong> Self-contained components</li>
                                    <li><strong>Cross-root ARIA:</strong> Accessibility considerations</li>
                                    <li><strong>Selectors:</strong> ::part() and ::slotted() usage</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Shadow root existence</li>
                                            <li>Encapsulated styles</li>
                                            <li>Slot content distribution</li>
                                            <li>Cross-root interactions</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Nested shadow roots</li>
                                            <li>Closed shadow DOM modes</li>
                                            <li>Browser polyfill differences</li>
                                            <li>Document fragment isolation</li>
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
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Shadow DOM Automation Code</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Shadow DOM Access</h3>
                                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Access shadow DOM elements
WebElement host = driver.findElement(By.css(".shadow-host"));
SearchContext shadowRoot = host.getShadowRoot();

// Interact with shadow elements
WebElement shadowButton = shadowRoot.findElement(By.css(".shadow-button"));
shadowButton.click();

// Verify shadow content
WebElement shadowContent = shadowRoot.findElement(By.css(".shadow-content"));
assertTrue(shadowContent.isDisplayed());`}
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
                            <h3 className="text-lg font-medium text-emerald-300 mb-4">Shadow DOM Interaction</h3>
                            <div ref={hostRef} data-test="shadow-host" className="mb-4" />

                            <Card className="p-4 bg-slate-900/80 border-slate-700">
                                <h3 className="text-emerald-400 mb-2">Regular DOM Content</h3>
                                <p className="text-slate-300">
                                    This content exists outside the Shadow DOM tree and demonstrates
                                    the encapsulation boundaries between DOM trees.
                                </p>
                            </Card>
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
                                        <h3 className="text-emerald-300 mb-2">Selectors</h3>
                                        <p>Use shadow piercing selectors carefully in tests</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                                        <p>Verify screen reader compatibility across shadow boundaries</p>
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
                        <div className="font-medium text-white">Shadow DOM</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">Shadow DOM</span> Testing Practice
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        <Button
                            variant={currentTab === 'practice' ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentTab('practice')}
                            className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                        >
                            <Box className="h-4 w-4 mr-1" />
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
                        <Box className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Practice working with Shadow DOM elements and understand their encapsulation
                                characteristics. Learn testing strategies for web components and shadow DOM
                                boundaries in modern web applications.
                            </p>
                        </div>
                    </div>
                </Card>

                {renderTab()}
            </div>
        </div>
    );
};