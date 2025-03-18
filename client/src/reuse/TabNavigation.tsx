import { Button } from '@/components/ui/button';
import { Code, Info, BookOpen } from 'lucide-react';

interface TabNavigationProps {
    currentTab: 'practice' | 'info' | 'code';
    setCurrentTab: (tab: 'practice' | 'info' | 'code') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentTab, setCurrentTab }) => {
    return (
        <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
            <Button
                variant={currentTab === 'practice' ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentTab('practice')}
                className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
            >
                <Code className="h-4 w-4 mr-1" /> Practice
            </Button>
            <Button
                variant={currentTab === 'info' ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentTab('info')}
                className={currentTab === 'info' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
            >
                <Info className="h-4 w-4 mr-1" /> Info
            </Button>
            <Button
                variant={currentTab === 'code' ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentTab('code')}
                className={currentTab === 'code' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
            >
                <BookOpen className="h-4 w-4 mr-1" /> Code
            </Button>
        </div>
    );
};

export default TabNavigation;
