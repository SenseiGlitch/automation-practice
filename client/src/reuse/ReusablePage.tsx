import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import TabNavigation from './TabNavigation';
import ProgressTracker from './ProgressTracker';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import useDocumentTitle from '@/hooks/useDocumentTitle'; // Import the custom hook

export interface Action {
    id: string;
    description: string;
    completed: boolean;
}

interface ReusablePageProps {
    title: string;
    moduleName: string;
    actions: Action[];
    renderTabContent: (tab: 'practice' | 'info' | 'code') => JSX.Element;
    showProgressTracker?: boolean;
    onTabChange?: (tab: 'practice' | 'info' | 'code') => void;
    pageTitle?: string; // Add this prop
}

const ReusablePage: React.FC<ReusablePageProps> = ({
                                                       title,
                                                       moduleName,
                                                       actions,
                                                       renderTabContent,
                                                       showProgressTracker = true,
                                                       onTabChange,
                                                       pageTitle = 'Web Automation Learning', // Default title
                                                   }) => {
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');

    // Update the document title dynamically
    useDocumentTitle(pageTitle);

    const handleTabChange = (tab: 'practice' | 'info' | 'code') => {
        setCurrentTab(tab);
        onTabChange?.(tab);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            {/* Skip Navigation Link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-4 focus:text-black"
            >
                Skip to main content
            </a>

            <div id="main-content" className="max-w-5xl mx-auto">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="hover:bg-emerald-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Modules
                        </Button>
                    </Link>

                    <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
                        <div className="text-xs text-emerald-400 px-2">Module:</div>
                        <div className="font-medium text-white">{moduleName}</div>
                    </div>
                </header>

                {/* Title and Tab Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">{title}</span>
                    </h1>
                    <TabNavigation currentTab={currentTab} setCurrentTab={handleTabChange} />
                </div>

                {/* Learning Objectives Card */}
                <Card
                    role="region"
                    aria-labelledby="learning-objectives-heading"
                    className="bg-slate-800/40 p-6 mb-6 border-slate-700 border-l-4 border-l-emerald-500"
                >
                    <h2 id="learning-objectives-heading" className="text-lg font-semibold text-white mb-1">
                        Learning Objectives
                    </h2>
                    <p className="text-slate-200">
                        Practice different testing techniques through interactive elements and exercises.
                    </p>
                </Card>

                {/* Tab Content */}
                {renderTabContent(currentTab)}

                {/* Progress Tracker */}
                {showProgressTracker && <ProgressTracker actions={actions} />}
            </div>
        </div>
    );
};

export default ReusablePage;