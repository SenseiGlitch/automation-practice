import { useState } from 'react';
import { useStore } from '@/lib/store';
import ReusablePage, { Action } from '@/reuse/ReusablePage';
import { Card } from '@/components/ui/card';

export default function TraditionalLocators() {
    const { updateProgress } = useStore();
    const [actions, setActions] = useState<Action[]>([
        { id: 'id', description: 'Located element using ID', completed: false },
        { id: 'class', description: 'Located element using Class Name', completed: false },
        { id: 'name', description: 'Located element using Name', completed: false },
        { id: 'css', description: 'Located element using CSS Selector', completed: false },
        { id: 'xpath', description: 'Located element using XPath', completed: false },
        { id: 'tag', description: 'Located element using Tag Name', completed: false },
    ]);

    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');

    const logAction = (actionId: string) => {
        setActions((prevActions) =>
            prevActions.map((action) =>
                action.id === actionId && !action.completed
                    ? { ...action, completed: true }
                    : action
            )
        );

        if (actions.every((a) => a.completed)) {
            updateProgress('locators', true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, actionId: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            logAction(actionId);
        }
    };

    const renderTabContent = (tab: 'practice' | 'info' | 'code') => {
        switch (tab) {
            case 'info':
                return (
                    <Card
                        role="region"
                        aria-labelledby="info-heading"
                        className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors"
                    >
                        <h2 id="info-heading" className="text-xl font-semibold text-emerald-400 mb-4">
                            Understanding Traditional Locators
                        </h2>
                        <div className="space-y-4 text-slate-200">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Locator Strategies</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-1">
                                    <li><strong>ID</strong>: Most efficient and preferred locator</li>
                                    <li><strong>Class Name</strong>: For elements with shared classes</li>
                                    <li><strong>CSS Selectors</strong>: Flexible element targeting</li>
                                    <li><strong>XPath</strong>: Powerful XML path queries</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                                <ul className="list-disc ml-6 space-y-1">
                                    <li>Prefer stable, unique identifiers</li>
                                    <li>Avoid overly complex XPath expressions</li>
                                    <li>Use CSS selectors for performance</li>
                                    <li>Implement explicit waits for dynamic elements</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                );

            case 'code':
                return (
                    <Card
                        role="region"
                        aria-labelledby="code-heading"
                        className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors"
                    >
                        <h2 id="code-heading" className="text-xl font-semibold text-emerald-400 mb-4">
                            Code Samples
                        </h2>
                        <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Locator Examples</h3>
                            <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
                  {`// By ID
WebElement element = driver.findElement(By.id("test-id"));

// By Class Name
WebElement element = driver.findElement(By.className("test-class"));

// By CSS Selector
WebElement element = driver.findElement(By.cssSelector("input[name='test-name']"));

// By XPath
WebElement element = driver.findElement(By.xpath("//article[contains(text(), 'Tag Name')]"));`}
                </code>
              </pre>
                        </div>
                    </Card>
                );

            default: // Practice tab
                return (
                    <div className="grid gap-6">
                        <Card
                            role="region"
                            aria-labelledby="practice-heading"
                            className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors"
                        >
                            <h3 id="practice-heading" className="text-lg font-medium text-emerald-300 mb-4">
                                Interactive Practice Elements
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'id', label: 'ID', value: 'test-id' },
                                    { id: 'class', label: 'Class', value: 'test-class' },
                                    { id: 'name', label: 'Name', value: 'test-name' },
                                    { id: 'css', label: 'CSS', value: "div[data-testid='test-css']" },
                                    { id: 'xpath', label: 'XPath', value: "//div[@data-testid='test-xpath']" },
                                    { id: 'tag', label: 'Tag', value: 'article' },
                                ].map(({ id, label, value }) => (
                                    <div
                                        key={id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => logAction(id)}
                                        onKeyPress={(e) => handleKeyPress(e, id)}
                                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/50 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        aria-label={`${label} locator example`}
                                    >
                                        <span className="text-emerald-400">{label}:</span> {value}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card
                            role="region"
                            aria-labelledby="tips-heading"
                            className="bg-slate-800/50 p-6 border-slate-700"
                        >
                            <h2 id="tips-heading" className="text-xl font-semibold text-emerald-400 mb-4">
                                Learning Tips
                            </h2>
                            <div className="space-y-4 text-slate-200">
                                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                    <h3 className="text-emerald-300 mb-2">Locator Priority</h3>
                                    <p>Always prefer ID first, then CSS selectors, then XPath. Avoid using fragile locators like text matches when possible.</p>
                                </div>
                                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                    <h3 className="text-emerald-300 mb-2">XPath Tips</h3>
                                    <p>Use relative XPaths and avoid indexes. Prefer text matches with contains() for dynamic content.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <ReusablePage
            title="Locator Strategies Lab"
            moduleName="Traditional Locators"
            actions={actions}
            renderTabContent={renderTabContent}
            showProgressTracker={currentTab === 'practice'}
            onTabChange={setCurrentTab}
        />
    );
}