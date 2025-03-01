import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, File, FileText, FileType, ArrowLeft, CheckCircle2, XCircle, Info, BookOpen, Code } from 'lucide-react';
import { Link } from 'wouter';

const FileDownloadPage: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [error, setError] = useState<string | null>(null);
    const [downloading, setDownloading] = useState<string | null>(null);
    const [actions, setActions] = useState<{ id: string; description: string; completed: boolean }[]>([
        { id: 'download', description: 'Successful file download', completed: false },
        { id: 'error', description: 'Handle download error', completed: false }
    ]);

    const files = [
        {
            name: 'Annual Report',
            filename: 'annual_report_2024.txt',
            type: 'TXT',
            size: '1.5 KB',
            url: '/files/annual_report_2024.txt',
            icon: FileText
        },
        {
            name: 'Customer Data',
            filename: 'customer_data_q1.csv',
            type: 'CSV',
            size: '3.2 KB',
            url: '/files/customer_data_q1.csv',
            icon: FileType
        },
        {
            name: 'Product Manual',
            filename: 'product_manual_v2.pdf',
            type: 'PDF',
            size: '4.7 MB',
            url: 'https://broken-link.com/file-not-found.pdf',
            icon: File
        }
    ];

    const handleDownload = async (file: typeof files[0]) => {
        try {
            setError(null);
            setDownloading(file.filename);

            const response = await fetch(file.url);
            if (!response.ok) throw new Error('Failed to fetch the file');

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = file.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setActions(prev => {
                const newActions = [...prev];
                if (!newActions[0].completed) newActions[0].completed = true;
                return newActions;
            });
        } catch (err) {
            setError(`Failed to download ${file.name}. Please try again.`);
            setActions(prev => {
                const newActions = [...prev];
                if (!newActions[1].completed) newActions[1].completed = true;
                return newActions;
            });
        } finally {
            setDownloading(null);
        }
    };

    const getCompletionPercentage = () => {
        const completed = actions.filter(action => action.completed).length;
        return Math.round((completed / actions.length) * 100);
    };

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">File Download Testing Guide</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-2">
                                    <li><strong>Content Verification:</strong> Validate file integrity and contents</li>
                                    <li><strong>Network Simulation:</strong> Test with slow connections and interruptions</li>
                                    <li><strong>Security Checks:</strong> Verify authentication requirements</li>
                                    <li><strong>Error Handling:</strong> Test failed download scenarios</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Validation Methods</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>File checksum verification</li>
                                            <li>Content parsing validation</li>
                                            <li>File size checking</li>
                                            <li>MIME type verification</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Large file downloads</li>
                                            <li>Concurrent downloads</li>
                                            <li>Network failure recovery</li>
                                            <li>Browser-specific behaviors</li>
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
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">File Download Automation Code</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Download Handling</h3>
                                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                                    <code className="text-emerald-300">
{`// Configure browser for downloads
ChromeOptions options = new ChromeOptions();
HashMap<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/downloads");
options.setExperimentalOption("prefs", prefs);

WebDriver driver = new ChromeDriver(options);

// Trigger download
driver.findElement(By.id("download-button")).click();

// Wait for file to download
File downloadedFile = wait.until((WebDriver driver) -> {
    File[] files = new File("/path/to/downloads").listFiles();
    return files != null && files.length > 0 ? files[0] : null;
});

// Verify file properties
assertThat(downloadedFile.length(), greaterThan(0L));`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </Card>
                );

            default:
                return (
                    <div className="grid gap-6 mb-6">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {files.map((file, index) => {
                                const Icon = file.icon;
                                return (
                                    <Card key={index} className="p-4 bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Icon className="w-6 h-6 text-emerald-500" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{file.name}</h3>
                                                <p className="text-sm text-slate-400">{file.type} • {file.size}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => handleDownload(file)}
                                            disabled={downloading === file.filename}
                                            className={`w-full transition ${downloading === file.filename ? 'bg-slate-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                                        >
                                            <Download className={`mr-2 h-4 w-4 ${downloading === file.filename ? 'animate-pulse' : ''}`} />
                                            {downloading === file.filename ? 'Downloading...' : 'Download'}
                                        </Button>
                                    </Card>
                                );
                            })}
                        </div>

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
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Card className="bg-slate-800/50 p-6 border-slate-700">
                                <h2 className="text-xl font-semibold text-emerald-400 mb-4">Testing Tips</h2>
                                <div className="space-y-4 text-slate-300">
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Security Tests</h3>
                                        <p>Verify download permissions and authentication requirements</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Performance</h3>
                                        <p>Test large file downloads and network interruptions</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
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
                        <div className="font-medium text-white">File Downloads</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">File Download</span> Handling Practice
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        <Button
                            variant={currentTab === 'practice' ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentTab('practice')}
                            className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                        >
                            <File className="h-4 w-4 mr-1" />
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
                        <Download className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Practice handling file download scenarios in web applications. Learn to automate download verification,
                                handle errors, and validate file integrity in test automation workflows.
                            </p>
                        </div>
                    </div>
                </Card>

                {error && (
                    <Card className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                        <p className="text-red-300">{error}</p>
                    </Card>
                )}

                {renderTab()}
            </div>
        </div>
    );
};

export default FileDownloadPage;