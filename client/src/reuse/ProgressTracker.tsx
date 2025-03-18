import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Action {
    id: string;
    description: string;
    completed: boolean;
}

interface ProgressTrackerProps {
    actions: Action[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ actions }) => {
    const getCompletionPercentage = () => {
        const completed = actions.filter(action => action.completed).length;
        return Math.round((completed / actions.length) * 100);
    };

    return (
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
                            {action.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-slate-500" />}
                            <span className="text-slate-200">{action.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default ProgressTracker;
