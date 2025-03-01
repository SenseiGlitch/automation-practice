import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Info, BookOpen, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

interface ModuleLayoutProps {
    title: string;
    moduleKey: string;
    tabs: { key: string; label: string; icon: JSX.Element }[];
    renderTabContent: (tab: string) => JSX.Element;
    progress?: number;
}

export default function ModuleLayout({ title, moduleKey, tabs, renderTabContent, progress = 0 }: ModuleLayoutProps) {
    const [currentTab, setCurrentTab] = useState<string>(tabs[0].key);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="hover:bg-emerald-500/10 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Modules
                        </Button>
                    </Link>
                    <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
                        <div className="text-xs text-emerald-400 px-2">Module:</div>
                        <div className="font-medium text-white">{title}</div>
                    </div>
                </header>

                {/* Title & Tab Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.key}
                                variant={currentTab === tab.key ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setCurrentTab(tab.key)}
                                className={currentTab === tab.key ? 'bg-emerald-600 hover:bg-emerald-700' : 'hover:bg-slate-700'}
                            >
                                {tab.icon}
                                {tab.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Learning Objectives */}
                <Card className="bg-slate-800/40 p-6 mb-6 border-slate-700 border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                        <MessageSquare className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Complete the exercises below to practice key skills and concepts related to this module.
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Dynamic Tab Content */}
                {renderTabContent(currentTab)}

                {/* Progress Tracker */}
                <Card className="bg-slate-800/50 p-6 border-slate-700 mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-emerald-400">Progress Tracker</h2>
                        <span className="text-lg font-bold text-emerald-400">{progress}%</span>
                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
