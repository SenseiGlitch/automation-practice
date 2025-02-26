import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, CheckCircle2, XCircle } from "lucide-react";
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
        setFile(null); // Reset file after upload
      }, 1000); // Simulated upload delay
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

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-emerald-500/10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        {/* Title Section */}
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 animate-fade-in">File Upload</h1>

        {/* Upload Card */}
        <Card className="rounded-lg border text-card-foreground shadow-sm bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors">
          <div className="prose prose-invert max-w-none">
            <h2>Understanding File Uploads</h2>
            <p>
              File uploads are a fundamental part of web applications. In this module, you'll practice selecting a file
              and simulating an upload process.
            </p>
          </div>
        </Card>

        {/* File Upload Section */}
        <div
          id="upload-area"
          className="rounded-lg border text-card-foreground shadow-sm bg-slate-800 p-6 mb-6 border-slate-700 hover:border-emerald-500/50 transition-colors flex flex-col items-center"
        >
          {/* File Input */}
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer p-3 bg-gray-700 rounded-lg border border-gray-600 text-white hover:bg-gray-600 transition-all"
          >
            <Upload className="w-6 h-6 inline-block mr-2" />
            Choose File
          </label>

          {/* Selected File Name */}
          {file && <p className="text-gray-300 mt-4">{file.name}</p>}

          {/* Upload Button */}
          <Button
            id="file-submit"
            onClick={handleUpload}
            className="w-full p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all mt-4"
          >
            Upload File
          </Button>
        </div>

        {/* Upload Actions Log */}
        <Card className="bg-slate-800/50 p-6 border-slate-700">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Upload Log</h2>
          <div className="space-y-3">
            {uploadActions.map((action) => (
              <div
                key={action.id}
                className={`flex items-center justify-between p-3 rounded
                  ${action.success ? "bg-emerald-900/30 border-emerald-500/30" : "bg-slate-800 border-slate-700"}
                  border transition-all duration-500`}
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
      </div>
    </div>
  );
}
