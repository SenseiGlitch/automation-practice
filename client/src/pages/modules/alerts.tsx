import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function Alerts() {
  const { updateProgress } = useStore();

  const showAlert = () => alert('This is a test alert!');
  const showConfirm = () => confirm('Would you like to confirm this action?');
  const showPrompt = () => prompt('Please enter your name:');

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6">Alerts Practice</h1>
        
        <Card className="bg-slate-800 p-6 mb-6">
          <div className="prose prose-invert max-w-none">
            <h2>JavaScript Alerts</h2>
            <p>Practice handling different types of browser alerts:</p>
            <ul>
              <li>Alert</li>
              <li>Confirm</li>
              <li>Prompt</li>
            </ul>
          </div>
        </Card>

        <div className="space-y-4">
          <Button onClick={showAlert} className="w-full" variant="outline">
            Show Alert
          </Button>
          
          <Button onClick={showConfirm} className="w-full" variant="outline">
            Show Confirm
          </Button>
          
          <Button onClick={showPrompt} className="w-full" variant="outline">
            Show Prompt
          </Button>

          <Button 
            onClick={() => updateProgress('alerts', true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Complete Module
          </Button>
        </div>
      </div>
    </div>
  );
}
