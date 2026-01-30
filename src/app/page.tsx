"use client";

import { useState } from "react";
import { Settings, Save, RefreshCw, FileJson, FileText, FileCog, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Providers } from "@/components/Providers";
import { Router } from "@/components/Router";
import { Transformers } from "@/components/Transformers";
import { SettingsDialog } from "@/components/SettingsDialog";
import { JsonEditor } from "@/components/JsonEditor";
import { LogViewer } from "@/components/LogViewer";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const [isLogViewerOpen, setIsLogViewerOpen] = useState(false);

  const t = (key: string) => key; // Mock translation

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 dark:bg-background font-sans flex flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-card px-6 shrink-0">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-foreground">Claude Code Router</h1>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)} className="transition-all hover:scale-110">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsJsonEditorOpen(true)} className="transition-all hover:scale-110">
                  <FileJson className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>JSON Editor</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsLogViewerOpen(true)} className="transition-all hover:scale-110">
                  <FileText className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log Viewer</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-all hover:scale-110">
                  <FileCog className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Presets</p>
              </TooltipContent>
            </Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-all hover:scale-110">
                  <Languages className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">English</Button>
                  <Button variant="ghost" className="w-full justify-start">中文</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="outline" className="transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={() => toast.success("Config saved")}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button className="transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={() => toast.success("Restarted")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Save & Restart
            </Button>
          </div>
        </header>

        <main className="flex-1 flex gap-4 p-4 overflow-hidden">
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
        </main>

        <SettingsDialog isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        <JsonEditor
          open={isJsonEditorOpen}
          onOpenChange={setIsJsonEditorOpen}
          showToast={(msg, type) => toast[type === 'error' ? 'error' : 'success'](msg)}
        />
        <LogViewer
          open={isLogViewerOpen}
          onOpenChange={setIsLogViewerOpen}
          showToast={(msg, type) => toast[type === 'error' ? 'error' : 'success'](msg)}
        />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
