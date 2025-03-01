import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import DynamicTable from '@/components/ui/dynamic-table';
import { TableData } from '@/types/table.ts';

interface Action {
    id: string;
    description: string;
    timestamp: Date;
    completed: boolean;
}

const initialData: TableData[] = [
    { id: '1', name: 'Omar Alaa', email: 'omar.qa@example.com', status: 'Active', role: 'QA Engineer' },
    { id: '2', name: 'Mona Saed', email: 'mona.tester@example.com', status: 'Active', role: 'Automation Tester' },
    { id: '3', name: 'Quality Sensei', email: 'quality.dev@example.com', status: 'Inactive', role: 'Software Developer' },
    { id: '4', name: 'Sensei Glitch', email: 'glitch.qa@example.com', status: 'Active', role: 'Test Automation Ninja' },
];

export default function TablesPage() {
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [tableData, setTableData] = useState<TableData[]>(initialData);
    const [actions, setActions] = useState<Action[]>([]);
    const [editingRow, setEditingRow] = useState<TableData | null>(null);
    const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableData | null, direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'asc',
    });

    const logAction = (description: string, completed: boolean = true) => {
        const newAction = {
            id: new Date().toISOString(),
            description,
            timestamp: new Date(),
            completed
        };
        setActions(prevActions => [newAction, ...prevActions].slice(0, 5));
    };

    const getCompletionPercentage = () => {
        const completed = actions.filter(action => action.completed).length;
        return Math.round((completed / actions.length) * 100) || 0;
    };

    const handleSort = (key: keyof TableData) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });

        const sortedData = [...tableData].sort((a, b) => {
            const aValue = String(a[key]).toLowerCase();
            const bValue = String(b[key]).toLowerCase();
            return direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
        setTableData(sortedData);
        logAction(`Sorted by ${key} (${direction})`);
    };

    const handleEdit = (id: string, key: keyof TableData, value: string) => {
        setTableData(prevData =>
            prevData.map(item => item.id === id ? { ...item, [key]: value } : item)
        );
        setEditingRow(null);
        logAction(`Edited ${key} for ${id}`);
    };

    const handleDelete = (id: string) => {
        setTableData(prevData => prevData.filter(item => item.id !== id));
        setEditingRow(null);
        logAction(`Deleted row ${id}`);
    };

    const handleStatusChange = (id: string, status: string) => {
        setTableData(prevData =>
            prevData.map(item => item.id === id ? { ...item, status } : item)
        );
        logAction(`Updated status for ${id} to ${status}`);
    };

    const handleContextMenu = (e: React.MouseEvent, row: TableData) => {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setEditingRow(row);
    };

    const closeContextMenu = () => {
        setContextMenuPosition(null);
        setEditingRow(null);
    };

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Mastering Dynamic Tables in Automation</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Key Challenges</h3>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li>Handling dynamic content loading</li>
                                    <li>Managing pagination and sorting</li>
                                    <li>Identifying unique row identifiers</li>
                                    <li>Maintaining test stability across data changes</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Locators</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Use stable unique identifiers</li>
                                            <li>Combine CSS selectors with text</li>
                                            <li>Implement dynamic XPath strategies</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Verification</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Verify before and after states</li>
                                            <li>Check sort order validity</li>
                                            <li>Validate pagination controls</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );

            case 'code':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Selenium Table Handling</h2>

                        <div className="mb-6 p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-medium text-emerald-300 mb-2">Sort Verification</h3>
                            <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                                <code className="text-emerald-300">
{`List<WebElement> rows = driver.findElements(By.css("tr.data-row"));
List<String> actualNames = rows.stream()
    .map(row -> row.findElement(By.css(".name")).getText())
    .collect(Collectors.toList());

List<String> sortedNames = new ArrayList<>(actualNames);
Collections.sort(sortedNames);

Assert.assertEquals("Names not sorted correctly", sortedNames, actualNames);`}
                                </code>
                            </pre>
                        </div>

                        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-medium text-emerald-300 mb-2">Row Operations</h3>
                            <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                                <code className="text-emerald-300">
{`WebElement targetRow = driver.findElement(
    By.xpath("//tr[contains(., 'Omar Alaa')]"));
    
targetRow.findElement(By.css(".edit-btn")).click();
WebElement emailField = targetRow.findElement(By.css(".email-input"));
emailField.clear();
emailField.sendKeys("new.email@example.com");`}
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
                                <DynamicTable
                                    data={tableData}
                                    onRowClick={(row: TableData) => logAction(`Selected ${row.name}`)}
                                    onSort={handleSort}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onStatusChange={handleStatusChange}
                                    onContextMenu={handleContextMenu}
                                    sortConfig={sortConfig}
                                />
                            </Card>

                            {contextMenuPosition && editingRow && (
                                <div
                                    style={{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}
                                    className="absolute bg-slate-700 p-2 rounded border border-slate-600 shadow-lg"
                                >
                                    <button
                                        onClick={() => handleDelete(editingRow.id)}
                                        className="block w-full px-4 py-2 text-left text-red-400 hover:bg-slate-600 rounded"
                                    >
                                        Delete Row
                                    </button>
                                    <button
                                        onClick={closeContextMenu}
                                        className="block w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-600 rounded"
                                    >
                                        Cancel
                                    </button>
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
                                                    <span className="text-slate-200">{action.description}</span>
                                                </div>
                                                <span className="text-xs text-slate-400">
                                                    {action.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="bg-slate-800/50 p-6 border-slate-700">
                                    <h2 className="text-xl font-semibold text-emerald-400 mb-4">Learning Tips</h2>
                                    <div className="space-y-4 text-slate-300">
                                        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                            <h3 className="text-emerald-300 mb-2">Dynamic Content</h3>
                                            <p>Always wait for table data to load completely before interacting.</p>
                                        </div>
                                        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                            <h3 className="text-emerald-300 mb-2">XPath Strategies</h3>
                                            <p>Use relative XPaths with contains() for dynamic table cells.</p>
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
                        <div className="font-medium text-white">Dynamic Tables</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">Table</span> Interaction Lab
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
                                Master table interactions through hands-on practice. Learn professional techniques for
                                sorting, filtering, and manipulating dynamic table data in test automation scenarios.
                            </p>
                        </div>
                    </div>
                </Card>

                {renderTab()}
            </div>
        </div>
    );
}