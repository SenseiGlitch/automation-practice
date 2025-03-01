import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, CheckCircle2, XCircle, Info, BookOpen, Code, MessageSquare } from "lucide-react";
import { Link } from "wouter";

interface UploadAction {
  id: string;
  description: string;
  timestamp: Date;
  success: boolean;
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadActions, setUploadActions] = useState<UploadAction[]>([]);
  const [currentTab, setCurrentTab] = useState<'practice' | 'info' | 'code'>('practice');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      setTimeout(() => {
        const newAction: UploadAction = {
          id: new Date().toISOString(),
          description: `Uploaded ${file.name}`,
          timestamp: new Date(),
          success: true,
        };
        setUploadActions((prevActions) => [...prevActions, newAction]);
        setFile(null);
      }, 1000);
    } else {
      const newAction: UploadAction = {
        id: new Date().toISOString(),
        description: "No file selected",
        timestamp: new Date(),
        success: false,
      };
      setUploadActions((prevActions) => [...prevActions, newAction]);
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'info':
        return (
            <Card className="bg-slate-800/80 p-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
              <h2 className="text-xl font-semibold text-emerald-400 mb-4">Understanding File Uploads</h2>
              <div className="space-y-4 text-slate-300">
                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">File Upload Basics</h3>
                  <p>File uploads are a common feature in web applications, allowing users to submit documents, images, and other files.</p>
                </div>

                <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-medium text-emerald-300 mb-2">Best Practices</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Validate file types and sizes</li>
                    <li>Provide clear feedback during upload</li>
                    <li>Handle errors gracefully</li>
                    <li>Secure file uploads to prevent malicious content</li>
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
                <h3 className="text-lg font-medium text-emerald-300 mb-2">HTML File Input</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`<input 
  type="file" 
  accept=".pdf,.jpg,.png" 
  onChange={handleFileChange}
/>`}
                </code>
              </pre>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <h3 className="text-lg font-medium text-emerald-300 mb-2">File Upload Handler</h3>
                <pre className="bg-slate-950 p-3 rounded-md overflow-x-auto">
                <code className="text-emerald-300">
{`const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    // Handle response
  } catch (error) {
    // Handle error
  }
};`}
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
                  <h3 className="text-lg font-medium text-emerald-300 mb-4">File Upload Practice</h3>
                  <div className="flex flex-col items-center space-y-4">
                    <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file-input"
                        className="cursor-pointer p-3 bg-slate-700/50 rounded-lg border border-slate-600 text-white hover:bg-slate-600 transition-all"
                    >
                      <Upload className="w-6 h-6 inline-block mr-2" />
                      Choose File
                    </label>

                    {file && (
                        <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                          <span className="text-slate-300">{file.name}</span>
                        </div>
                    )}

                    <Button
                        onClick={handleUpload}
                        className="w-full p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all"
                    >
                      Upload File
                    </Button>
                  </div>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-slate-800/50 p-6 border-slate-700">
                    <h2 className="text-xl font-semibold text-emerald-400 mb-4">Upload Log</h2>
                    <div className="space-y-3">
                      {uploadActions.map((action) => (
                          <div
                              key={action.id}
                              className={`flex items-center justify-between p-3 rounded border 
                          ${action.success ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}
                          transition-all duration-500`}
                          >
                            <div className="flex items-center gap-2">
                              {action.success ? (
                                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
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
                    <h2 className="text-xl font-semibold text-emerald-400 mb-4">Upload Statistics</h2>
                    <div className="space-y-4 text-slate-300">
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Total Uploads</h3>
                        <p>{uploadActions.filter(a => a.success).length} successful uploads</p>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                        <h3 className="text-emerald-300 mb-2">Recent Activity</h3>
                        <p>{uploadActions.length > 0 ? uploadActions[0].description : 'No recent activity'}</p>
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
              <div className="font-medium text-white">File Upload</div>
            </div>
          </header>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">
              <span className="text-emerald-400">File</span> Upload Lab
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
                  Practice file upload functionality and understand the underlying mechanisms. Learn how to handle file
                  selection, upload processes, and error handling in web applications.
                </p>
              </div>
            </div>
          </Card>

          {renderTab()}
        </div>
      </div>
  );
}