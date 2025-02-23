import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Windows() {
  const { updateProgress } = useStore();
  const [windowHandle, setWindowHandle] = useState<Window | null>(null);
  const [message, setMessage] = useState<string>('');

  const openNewWindow = () => {
    const newWindow = window.open(
      'about:blank',
      'TestWindow',
      'width=600,height=400'
    );
    if (newWindow) {
      setWindowHandle(newWindow);
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Test Window</title>
            <style>
              body {
                font-family: system-ui, sans-serif;
                background: #1e293b;
                color: #f1f5f9;
                padding: 2rem;
                margin: 0;
              }
              button {
                background: #059669;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                cursor: pointer;
              }
              button:hover {
                background: #047857;
              }
            </style>
          </head>
          <body>
            <h2>Test Window Content</h2>
            <p>This is a new browser window for testing window handling.</p>
            <button onclick="window.opener.postMessage('Hello from popup!', '*')">
              Send Message to Parent
            </button>
          </body>
        </html>
      `);
    }
  };

  const closeWindow = () => {
    if (windowHandle && !windowHandle.closed) {
      windowHandle.close();
      setWindowHandle(null);
      setMessage('');
    }
  };

  // Handle messages from the popup window
  useState(() => {
    const handleMessage = (event: MessageEvent) => {
      setMessage(event.data);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6">
          Window Handling Practice
        </h1>
        
        <Card className="bg-slate-800 p-6 mb-6">
          <div className="prose prose-invert max-w-none mb-6">
            <h2>Multiple Windows</h2>
            <p>Practice handling multiple browser windows and communication between them:</p>
            <ul>
              <li>Opening new windows</li>
              <li>Switching between windows</li>
              <li>Window communication</li>
              <li>Closing windows</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={openNewWindow}
              variant="outline"
              className="w-full"
              disabled={windowHandle !== null && !windowHandle.closed}
            >
              Open New Window
            </Button>

            <Button 
              onClick={closeWindow}
              variant="outline"
              className="w-full"
              disabled={!windowHandle || windowHandle.closed}
            >
              Close Window
            </Button>

            {message && (
              <div className="p-4 bg-slate-700 rounded text-center">
                Received message: {message}
              </div>
            )}

            <Button 
              onClick={() => updateProgress('windows', true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6"
            >
              Complete Module
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
