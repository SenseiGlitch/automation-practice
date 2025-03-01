  import { useStore } from '@/lib/store';
  import { Card } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
  import { Link } from 'wouter';
  import { useState, useEffect, useCallback } from 'react';

  interface IframeContent {
    id: string;
    title: string;
    description: string;
    content: string;
  }

  const iframeContents: IframeContent[] = [
    {
      id: 'frame1',
      title: 'Basic Event Communication',
      description: 'Demonstrates how to send messages from an iframe to the parent window using postMessage API.',
      content: `
        <html>
          <head>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                padding: 2rem; 
                text-align: center;
                background-color: #f8fafc;
                color: #334155;
              }
              h2 { margin-bottom: 1.5rem; color: #0f172a; }
              p { margin-bottom: 1.5rem; line-height: 1.6; }
              .action-btn { 
                padding: 0.75rem 1.5rem; 
                background: #10b981; 
                border: none; 
                border-radius: 0.375rem;
                color: white; 
                font-weight: 600;
                cursor: pointer; 
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
              }
              .action-btn:hover { 
                background: #059669; 
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(16, 185, 129, 0.4);
              }
              .info { 
                margin-top: 1.5rem; 
                font-size: 0.875rem; 
                color: #64748b;
                background-color: #f1f5f9;
                padding: 0.75rem;
                border-radius: 0.25rem;
              }
            </style>
          </head>
          <body>
            <h2>Event Communication Demo</h2>
            <p>This iframe demonstrates how to use the window.postMessage API to communicate between iframes and parent windows - a critical concept in automation.</p>
            <button class="action-btn" onclick="window.top.postMessage('User triggered event from Basic Communication iframe', '*')">
              Trigger Event
            </button>
            <div class="info">
              When clicked, this button sends a message to the parent window using window.postMessage().
            </div>
          </body>
        </html>
      `
    },
    {
      id: 'frame2',
      title: 'DOM Navigation and Interaction',
      description: 'Practice navigating through nested DOM structures to interact with elements - common in web automation.',
      content: `
        <html>
          <head>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                padding: 2rem; 
                background-color: #f8fafc;
                color: #334155;
              }
              h2, h3, h4 { color: #0f172a; margin-bottom: 1rem; }
              .container { border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; }
              .nested { 
                margin-left: 2rem; 
                padding: 1rem;
                border-left: 3px solid #3b82f6;
                margin-top: 1rem;
              }
              .action-btn { 
                padding: 0.75rem 1.5rem; 
                background: #3b82f6; 
                border: none; 
                border-radius: 0.375rem;
                color: white; 
                font-weight: 600;
                cursor: pointer; 
                transition: all 0.2s ease;
                box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
              }
              .action-btn:hover { 
                background: #2563eb; 
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(59, 130, 246, 0.4);
              }
              .highlight {
                background-color: #dbeafe;
                padding: 0.25rem;
                border-radius: 0.25rem;
              }
              .label {
                display: inline-block;
                font-size: 0.75rem;
                background: #cbd5e1;
                color: #334155;
                padding: 0.25rem 0.5rem;
                border-radius: 1rem;
                margin-bottom: 0.5rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <span class="label">Root Element</span>
              <h2>Nested DOM Structure</h2>
              <p>In automation, you'll often need to navigate through complex DOM structures to find specific elements.</p>
              
              <div class="nested">
                <span class="label">Level 1</span>
                <h3>First Level Nesting</h3>
                <p>Use <span class="highlight">querySelector</span> or <span class="highlight">XPath</span> to target elements at this level.</p>
                
                <div class="nested">
                  <span class="label">Level 2</span>
                  <h4>Second Level Nesting</h4>
                  <p>Complex web applications often have deeply nested structures like this.</p>
                  
                  <div class="nested">
                    <span class="label">Level 3 - Target</span>
                    <h4>Target Element</h4>
                    <p>Successfully navigating to this deeply nested element is a key automation skill.</p>
                    <button class="action-btn" onclick="window.top.postMessage('User successfully navigated to nested target element', '*')">
                      Interact With Target
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    }
  ];

  export default function Iframes() {
    const { updateProgress } = useStore();
    const [currentFrame, setCurrentFrame] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('practice');
    const [actions, setActions] = useState<Record<string, boolean>>({
      frame1: false,
      frame2: false,
    });

    // Capture messages from iframes
    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (typeof event.data === 'string') {
          setMessages((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${event.data}`]);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Mark iframe as interacted when message received
    useEffect(() => {
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.includes('Basic Communication')) {
          logAction('frame1');
        } else if (lastMessage.includes('nested target')) {
          logAction('frame2');
        }
      }
    }, [messages]);

    // Mark iframe as interacted
    const logAction = useCallback((frameId: string) => {
      if (!actions[frameId]) {
        setActions((prev) => ({ ...prev, [frameId]: true }));
      }
    }, [actions]);

    // Mark module as completed when both frames are interacted with
    useEffect(() => {
      if (Object.values(actions).every((completed) => completed)) {
        updateProgress('iframes', true);
      }
    }, [actions, updateProgress]);

    const getCompletionPercentage = () => {
      const completed = Object.values(actions).filter(Boolean).length;
      const total = Object.values(actions).length;
      return Math.round((completed / total) * 100);
    };

    const renderTab = () => {
      switch (currentTab) {
        case 'info':
          return (
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Understanding Iframes in Automation</h2>
                <div className="space-y-4 text-slate-300">
                  <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-emerald-300 mb-2">What are Iframes?</h3>
                    <p>Iframes (Inline Frames) are HTML elements that embed another HTML document within the current document. They create a nested browsing context, essentially a document within a document.</p>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-emerald-300 mb-2">Importance in Automation</h3>
                    <p>Many web applications use iframes for embedding third-party content, payment processors, or complex widgets. Automation engineers must understand how to:</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Switch between frames in testing tools</li>
                      <li>Handle cross-frame communications</li>
                      <li>Navigate the nested DOM structures</li>
                      <li>Wait for iframe content to load properly</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-emerald-300 mb-2">Common Challenges</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Same-origin policy restrictions</li>
                      <li>Dynamically generated iframe content</li>
                      <li>Waiting for iframe resources to load</li>
                      <li>Complex event handling across frame boundaries</li>
                    </ul>
                  </div>
                </div>
              </Card>
          );
        case 'code':
          return (
              <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Code Samples</h2>

                <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium: Switching to an Iframe</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
  {`// Using Selenium WebDriver (Java)
  WebDriver driver = new ChromeDriver();
  driver.get("https://example.com");
  
  // Switch to iframe by index
  driver.switchTo().frame(0);
  
  // Switch to iframe by name or ID
  driver.switchTo().frame("myFrameName");
  
  // Switch to iframe using WebElement
  WebElement frameElement = driver.findElement(By.cssSelector("#myFrame"));
  driver.switchTo().frame(frameElement);
  
  // Return to the main document
  driver.switchTo().defaultContent();`}
                  </code>
                </pre>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Cypress: Handling Iframes</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
  {`// Cypress example
  cy.frameLoaded('#myIframe'); // Wait for the iframe to load (requires cypress-iframe plugin)
  
  cy.iframe('#myIframe').within(() => {
    // Perform actions inside the iframe
    cy.get('button.action-btn').click();
    cy.contains('Target Element').should('be.visible');
  });
  
  // Accessing iframe content directly
  cy.get('#myIframe')
    .its('0.contentDocument.body')
    .then(cy.wrap)
    .find('button.action-btn')
    .click();`}
                  </code>
                </pre>
                </div>
              </Card>
          );
        default:
          return (
              <>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  {iframeContents.map(({ id, title, description, content }) => (
                      <Card
                          key={id}
                          className={`border p-4 bg-slate-800/80 transition-all duration-300 ${
                              actions[id] ? 'border-emerald-500/70 shadow-lg shadow-emerald-500/10' : 'border-slate-700 hover:border-emerald-500/30'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-slate-200">{title}</h3>
                          {actions[id] ? (
                              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full flex items-center">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                        </span>
                          ) : (
                              <span className="bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-full flex items-center">
                          Pending
                        </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{description}</p>
                        <div className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
                            actions[id] ? 'ring-2 ring-emerald-500/30' : ''
                        }`}>
                          <iframe
                              srcDoc={content}
                              title={title}
                              className="w-full h-80 border-0 bg-white rounded"
                              sandbox="allow-scripts"
                              onFocus={() => {
                                setCurrentFrame(id);
                              }}
                          />
                        </div>
                      </Card>
                  ))}
                </div>

                {currentFrame && (
                    <div className="p-4 bg-emerald-900/30 border border-emerald-500/50 rounded mb-6 animate-fade-in flex items-center">
                      <Info className="h-5 w-5 text-emerald-400 mr-2" />
                      <span>Currently focused: <span className="font-medium text-emerald-300">{
                        iframeContents.find(frame => frame.id === currentFrame)?.title
                      }</span></span>
                    </div>
                )}

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
                      {Object.entries(actions).map(([id, completed]) => {
                        const frame = iframeContents.find((frame) => frame.id === id);
                        return (
                            <div
                                key={id}
                                className={`flex items-center justify-between p-3 rounded border 
                                ${completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                                transition-all duration-500`}
                            >
                              <div className="flex items-center gap-2">
                                {completed ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-slate-500" />
                                )}
                                <div>
                              <span className="text-slate-200 block">
                                {frame?.title}
                              </span>
                                  <span className="text-xs text-slate-400">
                                {completed ? 'Successfully completed' : 'Waiting for interaction'}
                              </span>
                                </div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                  </Card>

                  {messages.length > 0 && (
                      <Card className="bg-slate-800/50 p-6 border-slate-700">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Event Log</h2>
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-2 text-slate-300">
                          {messages.map((message, index) => (
                              <div key={index} className="p-3 bg-slate-900/80 rounded border border-slate-700 text-sm">
                                <span className="text-emerald-400 font-mono text-xs block mb-1">EVENT #{index + 1}</span>
                                {message}
                              </div>
                          ))}
                        </div>
                      </Card>
                  )}
                </div>
              </>
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
                <div className="font-medium text-white">Iframes in Web Automation</div>
              </div>
            </header>

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">
                <span className="text-emerald-400">Iframe</span> Interaction Lab
              </h1>

              <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                <Button
                    variant={currentTab === 'practice' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentTab('practice')}
                    className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                >
                  <Code className="h-4 w-4 mr-1" />
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
                  Code Examples
                </Button>
              </div>
            </div>

            <Card className="bg-slate-800/40 p-6 mb-6 border-slate-700 border-l-4 border-l-emerald-500">
              <div className="flex items-start gap-4">
                <MessageSquare className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                  <p className="text-slate-300">In this module, you'll learn how to interact with iframes in web applications - a crucial skill for automation engineers. Complete the exercises below by interacting with each iframe element to practice frame switching and event handling.</p>
                </div>
              </div>
            </Card>

            {renderTab()}
          </div>
        </div>
    );
  }