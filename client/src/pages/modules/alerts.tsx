import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function Alerts() {
  const { updateProgress } = useStore();
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [completedActions, setCompletedActions] = useState({
    alert: false,
    confirm: false,
    prompt: false,
  });

  const showAlert = () => {
    alert('This is a test alert!');
    setCompletedActions(prev => ({ ...prev, alert: true }));
  };

  const showConfirm = () => {
    const result = confirm('Would you like to confirm this action?');
    if (result) {
      setCompletedActions(prev => ({ ...prev, confirm: true }));
    }
  };

  const showPrompt = () => {
    const result = prompt('Please enter your name:');
    if (result) {
      setCompletedActions(prev => ({ ...prev, prompt: true }));
    }
  };

  const getCompletionPercentage = () => {
    const completed = Object.values(completedActions).filter(Boolean).length;
    return Math.round((completed / Object.values(completedActions).length) * 100);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Alert Handling in Automation</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                  <p>Browser dialogs are essential components in web applications that require special handling in automation:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Blocking Nature:</strong> Alerts halt test execution until handled</li>
                    <li><strong>Cross-Browser Differences:</strong> Varying implementations across browsers</li>
                    <li><strong>Timing Sensitivity:</strong> Requires precise synchronization</li>
                    <li><strong>Security Constraints:</strong> Special handling for authentication dialogs</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Advanced Alert Types</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">Authentication Dialogs</h4>
                      <p>Handle HTTP basic auth using WebDriver capabilities:</p>
                      <pre className="bg-slate-950 p-2 rounded-md mt-2 text-sm">
                      {`driver.get('https://user:pass@example.com');`}
                    </pre>
                    </div>

                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">File Upload Dialogs</h4>
                      <p>Bypass using sendKeys() on file input elements:</p>
                      <pre className="bg-slate-950 p-2 rounded-md mt-2 text-sm">
                      {`driver.findElement(By.id("file-input")).sendKeys("/path/to/file");`}
                    </pre>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Enterprise Strategies</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Synchronization</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Explicit waits for alert presence</li>
                        <li>Custom expected conditions</li>
                        <li>Retry mechanisms for flaky tests</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Cross-Browser</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Browser-specific capabilities</li>
                        <li>User agent detection patterns</li>
                        <li>Polyfill implementations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Real-World Scenarios</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">E-commerce</h4>
                      <p>Handling order confirmation dialogs and promo code inputs</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">Banking</h4>
                      <p>Managing security warnings and OTP prompts</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">CMS Platforms</h4>
                      <p>Dealing with unsaved changes alerts and bulk action confirmations</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Alert Handling</h2>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Simple Alert Handling</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Handling basic alert
WebDriver driver = new ChromeDriver();
driver.get("https://example.com");

// Trigger alert
driver.findElement(By.id("alertButton")).click();

// Switch to alert
Alert alert = driver.switchTo().alert();
String alertText = alert.getText();
System.out.println("Alert text: " + alertText);

// Accept alert
alert.accept();`}
                  </code>
                </pre>
              </div>

              <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Confirm Dialog Handling</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Handling confirmation dialog
driver.findElement(By.id("confirmButton")).click();
Alert confirmAlert = driver.switchTo().alert();

// Get confirmation text
String confirmationText = confirmAlert.getText();

// To accept confirmation
confirmAlert.accept();

// To dismiss confirmation
// confirmAlert.dismiss();`}
                  </code>
                </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Prompt Handling</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Handling prompt dialog
driver.findElement(By.id("promptButton")).click();
Alert promptAlert = driver.switchTo().alert();

// Send text to prompt
promptAlert.sendKeys("John Doe");

// Accept prompt
promptAlert.accept();

// Get entered text from prompt
String enteredText = driver.findElement(By.id("result")).getText();`}
                  </code>
                </pre>
              </div>

              <div className="mt-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Always wait for alert to appear
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
wait.until(ExpectedConditions.alertIsPresent());

// Handle unexpected alerts
try {
    Alert unexpectedAlert = driver.switchTo().alert();
    unexpectedAlert.accept();
} catch (NoAlertPresentException e) {
    // No alert present, continue execution
}

// Always switch back to main content
driver.switchTo().defaultContent();`}
                  </code>
                </pre>
              </div>
            </Card>
        );

      default:
        return (
            <>
              <div className="grid gap-6 mb-6">
                <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Alert Practice</h3>
                  <div className="space-y-4">
                    <Button
                        onClick={showAlert}
                        className="w-full p-3 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      Show Alert
                    </Button>

                    <Button
                        onClick={showConfirm}
                        className="w-full p-3 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      Show Confirm
                    </Button>

                    <Button
                        onClick={showPrompt}
                        className="w-full p-3 bg-slate-700/50 hover:bg-slate-600 transition-all"
                    >
                      Show Prompt
                    </Button>
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
                      {Object.entries(completedActions).map(([action, completed]) => (
                          <div
                              key={action}
                              className={`flex items-center justify-between p-3 rounded border 
                            ${completed ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                            transition-all duration-500`}
                          >
                            <div className="flex items-center gap-2">
                              {completed ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                  <AlertCircle className="h-5 w-5 text-slate-500" />
                              )}
                              <span className="text-slate-200 capitalize">{action}</span>
                            </div>
                          </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="bg-slate-800/50 p-6 border-slate-700">
                    <h2 className="text-xl font-semibold text-emerald-400 mb-4">Learning Tips</h2>
                    <div className="space-y-4 text-slate-300">
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Alert Usage</h3>
                        <p>Use alerts for critical information that requires immediate user attention.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">User Experience</h3>
                        <p>Consider using modal dialogs instead of native alerts for better UX.</p>
                      </div>
                    </div>
                  </Card>
                </div>
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
              <div className="font-medium text-white">JavaScript Alerts</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Alert</span> Handling Practice
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
                Code
              </Button>
            </div>
          </div>

          <Card className="bg-slate-800/40 p-6 mb-6 border-slate-700 border-l-4 border-l-emerald-500">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                <p className="text-slate-300">
                  Practice handling different types of JavaScript alerts and understand their usage in web applications.
                  Learn how to interact with and respond to native browser dialogs in professional test automation scenarios.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}