"use client";

import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Providers } from "@/components/Providers";
import { Router } from "@/components/Router";
import { Transformers } from "@/components/Transformers";
import { SettingsDialog } from "@/components/SettingsDialog";
import { JsonEditor } from "@/components/JsonEditor";
import { LogViewer } from "@/components/LogViewer";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const [isLogViewerOpen, setIsLogViewerOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 min-h-full lg:h-[calc(100vh-7rem)]">
        {/* Toolbar - Optional extra toolbar internal to dashboard */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div className="text-start">
            <h1 className="text-2xl font-bold tracking-tight">AI Deployment Center</h1>
            <p className="text-sm text-muted-foreground">Manage your model providers and routing logic.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => toast.success("Config saved")}>
              <Save className="mr-2 h-4 w-4" />
              Save Config
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none" onClick={() => toast.success("Restarted")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Save & Restart
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-y-auto lg:overflow-hidden">
          <div className="w-full lg:w-3/5 lg:h-full flex flex-col min-h-[500px] lg:min-h-0">
            <Providers />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col gap-4 lg:h-full min-h-[600px] lg:min-h-0">
            <div className="flex-1 lg:h-3/5 min-h-[300px] lg:min-h-0">
              <Router />
            </div>
            <div className="flex-1 lg:h-2/5 min-h-[200px] lg:min-h-0">
              <Transformers />
            </div>
          </div>
        </div>

        <SettingsDialog isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        <JsonEditor
          open={isJsonEditorOpen}
          onOpenChange={setIsJsonEditorOpen}
        />
        <LogViewer
          open={isLogViewerOpen}
          onOpenChange={setIsLogViewerOpen}
        />
      </div>
    </TooltipProvider>
  );
}
