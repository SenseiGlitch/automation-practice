import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface Action {
  id: string;
  description: string;
  completed: boolean;
  timestamp: Date;
}

interface RenderTabProps {
  currentTab: string;
  logAction: (action: string) => void;
  getCompletionPercentage: () => number;
  actions: Action[];
  tabContent: {
    info: React.ReactNode;
    code: React.ReactNode;
    default: React.ReactNode;
  };
}

export const renderTab = (
  currentTab: RenderTabProps["currentTab"],
  tabContent: RenderTabProps["tabContent"]
) => {
  switch (currentTab) {
    case "info":
      return tabContent["info"];

    case "code":
      return tabContent["code"];

    default:
      return tabContent["default"];
  }
};
