import React, {useEffect, useState} from 'react';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, BookOpen, Code, CheckCircle2, XCircle, Image } from 'lucide-react';
import { Link } from 'wouter';

interface ImageAction {
    id: string;
    description: string;
    timestamp: Date;
    completed: boolean;
}

const images = [
    {
        src: 'https://picsum.photos/200',
        alt: 'Valid image',
        description: 'This image should load correctly',
    },
    {
        src: 'https://example.com/broken-image.jpg',
        alt: 'Broken image 1',
        description: 'This image URL does not exist',
    },
    {
        src: 'invalid-url',
        alt: 'Broken image 2',
        description: 'This image has an invalid URL format',
    },
];

export const BrokenImagesPage: React.FC = () => {
    const { updateProgress } = useStore();
    const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');
    const [actions, setActions] = useState<ImageAction[]>([
        { id: 'valid', description: 'Detected valid image', timestamp: new Date(), completed: false },
        { id: 'broken', description: 'Detected broken image', timestamp: new Date(), completed: false }
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
            updateProgress('broken-images', true);
        }
    }, [actions]);

    const handleImageError = (index: number) => {
        if (index !== 0) logAction('broken');
    };

    const handleImageLoad = (index: number) => {
        if (index === 0) logAction('valid');
    };

    const renderTab = () => {
        switch (currentTab) {
            case 'info':
                return (
                    <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Broken Image Testing Guide</h2>
                        <div className="space-y-6 text-slate-300">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Core Concepts</h3>
                                <ul className="list-disc ml-6 mt-2 space-y-2">
                                    <li><strong>HTTP Status Codes:</strong> Identify 404 and other error responses</li>
                                    <li><strong>Alt Text Verification:</strong> Validate accessibility fallbacks</li>
                                    <li><strong>Placeholder Handling:</strong> Detect default broken image icons</li>
                                    <li><strong>Network Monitoring:</strong> Track failed resource requests</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Testing Strategies</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Validation Points</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Image rendering status</li>
                                            <li>Natural width detection</li>
                                            <li>Cache validation</li>
                                            <li>Lazy loading behavior</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-200 mb-2">Edge Cases</h4>
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>Expired CDN URLs</li>
                                            <li>Mixed content warnings</li>
                                            <li>Corrupted file formats</li>
                                            <li>Large file timeouts</li>
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
                        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Image Validation Code</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium text-emerald-300 mb-2">Selenium Image Verification</h3>
                                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                  <code className="text-emerald-300">
{`// Verify image loading status
public boolean isImageBroken(WebElement image) {
    return (Boolean) ((JavascriptExecutor) driver)
        .executeScript("return arguments[0].naturalWidth === 0", image);
}

// Check all images on page
List<WebElement> images = driver.findElements(By.tagName("img"));
images.forEach(img -> {
    if (isImageBroken(img)) {
        log.error("Broken image found: " + img.getAttribute("src"));
    }
});`}
                  </code>
                </pre>
                            </div>
                        </div>
                    </Card>
                );

            default:
                return (
                    <div className="grid gap-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {images.map((image, index) => (
                                <Card
                                    key={index}
                                    className="bg-slate-800/80 p-4 border-slate-700 hover:border-emerald-500/50 transition-colors"
                                    data-test={`image-container-${index}`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-48 object-cover mb-4 rounded-lg"
                                        data-test={`image-${index}`}
                                        onError={() => handleImageError(index)}
                                        onLoad={() => handleImageLoad(index)}
                                    />
                                    <p className="text-sm text-slate-300">{image.description}</p>
                                </Card>
                            ))}
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
                                        <h3 className="text-emerald-300 mb-2">Network Monitoring</h3>
                                        <p>Check failed network requests in browser devtools</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                                        <h3 className="text-emerald-300 mb-2">Accessibility</h3>
                                        <p>Verify alt text presence for broken images</p>
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
                        <div className="font-medium text-white">Broken Images</div>
                    </div>
                </header>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        <span className="text-emerald-400">Image Handling</span> Practice
                    </h1>

                    <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
                        <Button
                            variant={currentTab === 'practice' ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentTab('practice')}
                            className={currentTab === 'practice' ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-slate-700"}
                        >
                            <Image className="h-4 w-4 mr-1" />
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
                        <Image className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-1">Learning Objectives</h2>
                            <p className="text-slate-300">
                                Practice identifying and handling broken images in web applications.
                                Learn validation techniques for image loading states and proper error handling
                                in test automation workflows.
                            </p>
                        </div>
                    </div>
                </Card>

                {renderTab()}
            </div>
        </div>
    );
};