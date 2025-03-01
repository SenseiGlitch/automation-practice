import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'wouter';
import { Calendar } from '@/components/ui/calendar';
import { useState, useEffect } from 'react';

interface CalendarAction {
  id: string;
  description: string;
  timestamp: Date;
  completed: boolean;
}

export default function CalendarPractice() {
  const { updateProgress } = useStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
  const [actions, setActions] = useState<CalendarAction[]>([
    { id: 'select', description: 'Select a date', timestamp: new Date(), completed: false },
    { id: 'navigate', description: 'Navigate between months', timestamp: new Date(), completed: false },
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
      updateProgress('calendar', true);
    }
  }, [actions]);

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Calendar Component Testing</h2>
              <div className="space-y-6 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                  <p>Calendar components require special handling in test automation:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>Date Localization:</strong> Handle different date formats and time zones</li>
                    <li><strong>Dynamic Content:</strong> Manage month/year navigation and loading states</li>
                    <li><strong>Accessibility:</strong> Verify keyboard navigation and ARIA labels</li>
                    <li><strong>Validation:</strong> Test date range restrictions and disabled dates</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Key Scenarios</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Cross-browser date formatting</li>
                        <li>Leap year handling</li>
                        <li>Timezone-aware selections</li>
                        <li>Localized weekday starts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>Minimum/maximum date ranges</li>
                        <li>Disabled dates validation</li>
                        <li>Calendar reset functionality</li>
                        <li>Keyboard-only navigation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Real-World Examples</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">Travel Booking</h4>
                      <p>Testing date pickers for flight search with return date validation</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">E-commerce</h4>
                      <p>Handling delivery date selection with blackout dates</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-200 mb-1">Finance</h4>
                      <p>Validating date ranges for transaction history filters</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
        );

      case 'code':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Calendar Test Automation Code</h2>

              <div className="space-y-6">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Basic Date Selection</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Select specific date using Selenium
WebDriver driver = new ChromeDriver();
driver.get("https://booking.example.com");

// Open date picker
driver.findElement(By.css(".date-input")).click();

// Select target date
String targetDate = "2024-03-15";
driver.findElement(By.cssSelector(\`[data-date='\${targetDate}']\`)).click();

// Verify selection
WebElement dateInput = driver.findElement(By.css(".date-input"));
Assert.assertEquals(dateInput.getAttribute("value"), "March 15, 2024");`}
                  </code>
                </pre>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Month Navigation</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Navigate through months
public void selectFutureDate(int monthsToAdd) {
    WebElement nextButton = driver.findElement(By.css(".next-month"));
    WebElement monthHeader = driver.findElement(By.css(".calendar-header"));
    
    for (int i = 0; i < monthsToAdd; i++) {
        nextButton.click();
        wait.until(ExpectedConditions.not(
            ExpectedConditions.textToBePresentInElement(monthHeader, currentMonth)
        ));
    }
}`}
                  </code>
                </pre>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Date Range Validation</h3>
                  <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Verify disabled dates in range
public void verifyDisabledDates(LocalDate start, LocalDate end) {
    List<WebElement> dates = driver.findElements(By.css(".calendar-day"));
    
    dates.forEach(dateElement -> {
        String dateStr = dateElement.getAttribute("data-date");
        LocalDate date = LocalDate.parse(dateStr);
        
        boolean shouldBeDisabled = date.isBefore(start) || date.isAfter(end);
        boolean isDisabled = dateElement.getAttribute("class").contains("disabled");
        
        Assert.assertEquals(shouldBeDisabled, isDisabled);
    });
}`}
                  </code>
                </pre>
                </div>
              </div>
            </Card>
        );

      default:
        return (
            <>
              <div className="grid gap-6 mb-6">
                <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">Calendar Interaction</h3>
                  <div className="flex flex-col items-center gap-6">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          logAction('select');
                        }}
                        onMonthChange={() => logAction('navigate')}
                        className="rounded-md border border-slate-700 bg-slate-900/80"
                    />

                    <Card className="w-full p-4 bg-slate-900/80 border-slate-700">
                      <div className="text-center font-mono text-emerald-400">
                        {date?.toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
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
                        <h3 className="text-emerald-300 mb-2">Edge Cases</h3>
                        <p>Test leap years, time zones, and localization formats.</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                        <p>Verify ARIA labels and keyboard navigation.</p>
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
              <div className="font-medium text-white">Calendar Components</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">Calendar</span> Handling Practice
            </h1>

            <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
              <Button
                  variant={currentTab === 'practice' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentTab('practice')}
                  className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
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
              <CalendarIcon className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                <p className="text-slate-300">
                  Practice interacting with calendar components and date pickers. Learn how to handle
                  date selection, month navigation, and date validation in automated testing scenarios.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}