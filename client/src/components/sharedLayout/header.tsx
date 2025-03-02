import { Button } from "@/components/ui/button";

import { Link } from "wouter";
import {
  ArrowLeft,
  Info,
  BookOpen,
  Code,
  CheckCircle2,
  XCircle,
  Keyboard,
  MessageSquare,
} from "lucide-react";
import { Card } from "../ui/card";
export default function Header({
  highLightWord,
  headerTitle,
  typography,
  moduleType,
  currentTab,
  icon,
  setCurrentTab,
}: {
  moduleType: string;
  typography: string;
  highLightWord: string;
  icon: React.ReactNode;
  headerTitle: string;
  currentTab: string;
  setCurrentTab: React.Dispatch<
    React.SetStateAction<"practice" | "info" | "code">
  >;
}) {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="hover:bg-emerald-500/10 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
          <div className="text-xs text-emerald-400 px-2">Module:</div>
          <div className="font-medium text-white">{moduleType}</div>
        </div>
      </header>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-emerald-400">{highLightWord}</span>  {headerTitle}
        </h1>

        <div className="flex space-x-2 bg-slate-800/70 p-1 rounded-lg">
          <Button
            variant={currentTab === "practice" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTab("practice")}
            className={
              currentTab === "practice"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "hover:bg-slate-700"
            }
          >
            {icon}
           
            Practice
          </Button>
          <Button
            variant={currentTab === "info" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTab("info")}
            className={
              currentTab === "info"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "hover:bg-slate-700"
            }
          >
            <Info className="h-4 w-4 mr-1" />
            Info
          </Button>
          <Button
            variant={currentTab === "code" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTab("code")}
            className={
              currentTab === "code"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "hover:bg-slate-700"
            }
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
              <h2 className="text-lg font-semibold text-white mb-1">
                Learning Objectives
              </h2>
              <p className="text-slate-300">
               {typography}
              </p>
            </div>
          </div>
        </Card>
    </>
  );
}
