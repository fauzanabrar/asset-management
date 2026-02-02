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
      <div className="flex flex-col gap-4 h-[calc(100vh-6rem)]">
        {/* Toolbar - Optional extra toolbar internal to dashboard */}
        <div className="flex justify-end gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Config saved")}>
            <Save className="mr-2 h-4 w-4" />
            Save Config
          </Button>
          <Button size="sm" onClick={() => toast.success("Restarted")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Save & Restart
          </Button>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          <div className="w-3/5 h-full">
            <Providers />
          </div>
          <div className="flex w-2/5 flex-col gap-4 h-full">
            <div className="h-3/5">
              <Router />
            </div>
            <div className="flex-1 overflow-hidden">
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
