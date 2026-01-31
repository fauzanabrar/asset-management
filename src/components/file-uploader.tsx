"use client"

import * as React from "react"
import { Upload, X, File, FileText, ImageIcon, HardDrive, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface FileWithProgress {
    id: string
    file: File
    progress: number
    status: "uploading" | "completed" | "error"
}

export function FileUploader({ className, multiple = true }: { className?: string, multiple?: boolean }) {
    const [files, setFiles] = React.useState<FileWithProgress[]>([])
    const [isDragging, setIsDragging] = React.useState(false)

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFiles = Array.from(e.dataTransfer.files)
        handleUpload(multiple ? droppedFiles : [droppedFiles[0]])
    }

    const handleUpload = (newFiles: File[]) => {
        const mappedFiles: FileWithProgress[] = newFiles.map(f => ({
            id: Math.random().toString(36).substring(7),
            file: f,
            progress: 0,
            status: "uploading"
        }))

        if (multiple) {
            setFiles(prev => [...prev, ...mappedFiles])
        } else {
            setFiles(mappedFiles)
        }

        // Simulate upload progress
        mappedFiles.forEach(file => {
            let p = 0
            const interval = setInterval(() => {
                p += Math.floor(Math.random() * 30)
                if (p >= 100) {
                    p = 100
                    clearInterval(interval)
                    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: 100, status: "completed" } : f))
                    toast.success(`${file.file.name} uploaded successfully`)
                } else {
                    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: p } : f))
                }
            }, 400)
        })
    }

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={cn(
                    "relative group border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300",
                    isDragging
                        ? "border-indigo-500 bg-indigo-500/5 scale-[0.99] shadow-inner"
                        : "border-muted-foreground/20 hover:border-indigo-500/50 hover:bg-muted/30 dark:hover:bg-zinc-900/50"
                )}
            >
                <div className={cn(
                    "h-16 w-16 rounded-full flex items-center justify-center bg-muted dark:bg-zinc-800 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:text-indigo-500",
                    isDragging && "scale-110 bg-indigo-500/10 text-indigo-500 animate-pulse"
                )}>
                    <Upload className="h-8 w-8" />
                </div>
                <div className="text-center space-y-1">
                    <p className="font-bold text-lg dark:text-zinc-100">Click or drag {multiple ? 'files' : 'a file'} to upload</p>
                    <p className="text-sm text-muted-foreground dark:text-zinc-400">Support for PNG, JPG, PDF, and CSV (Max 10MB)</p>
                </div>
                <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    multiple={multiple}
                    onChange={(e) => e.target.files && handleUpload(Array.from(e.target.files))}
                />
            </div>

            {files.length > 0 && (
                <div className="grid gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {files.map((file) => (
                        <div key={file.id} className="p-4 rounded-xl border border-muted dark:border-zinc-800 bg-card/50 dark:bg-zinc-900/50 backdrop-blur-sm flex items-center gap-4 group hover:shadow-md transition-all">
                            <div className="h-10 w-10 rounded-lg bg-muted dark:bg-zinc-800 flex items-center justify-center shrink-0">
                                {file.file.type.includes("image") ? <ImageIcon className="h-5 w-5 text-blue-500" /> : <FileText className="h-5 w-5 text-emerald-500" />}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-xs font-bold truncate dark:text-zinc-100">{file.file.name}</p>
                                    <span className="text-[10px] font-bold text-muted-foreground">{(file.file.size / 1024).toFixed(1)} KB</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Progress value={file.progress} className="h-1.5 flex-1 bg-muted dark:bg-zinc-800" />
                                    {file.status === "completed" ? (
                                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                                    ) : (
                                        <span className="text-[10px] font-black tabular-nums dark:text-zinc-300">{file.progress}%</span>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-rose-500 dark:hover:bg-rose-500/10 shrink-0"
                                onClick={() => removeFile(file.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
