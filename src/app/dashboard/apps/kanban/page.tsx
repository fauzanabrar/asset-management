"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, GripVertical, Trash2, Calendar, MessageSquare, Paperclip, Search, Filter, HardDrive } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUploader } from "@/components/file-uploader"
import { cn } from "@/lib/utils"

type Task = {
    id: string;
    title: string;
    priority: "High" | "Medium" | "Low";
    owner: string;
    comments: number;
    attachments: number;
    tags: string[];
}

type Column = {
    id: string;
    title: string;
    description: string;
    tasks: Task[];
    color: string;
}

const initialBoardData: Column[] = [
    {
        id: "todo",
        title: "To Do",
        description: "Tasks ready to be picked up",
        color: "bg-indigo-500",
        tasks: [
            { id: "1", title: "Implement Auth Flow", priority: "High", owner: "AJ", comments: 3, attachments: 1, tags: ["Security", "Backend"] },
            { id: "2", title: "Design Landing Page", priority: "Medium", owner: "DP", comments: 8, attachments: 4, tags: ["Design", "UI/UX"] },
            { id: "3", title: "API Documentation", priority: "Low", owner: "BS", comments: 2, attachments: 0, tags: ["Docs"] },
        ]
    },
    {
        id: "inprogress",
        title: "In Progress",
        description: "Currently being worked on",
        color: "bg-amber-500",
        tasks: [
            { id: "4", title: "Database Migration", priority: "High", owner: "CD", comments: 5, attachments: 2, tags: ["Infra", "Data"] },
            { id: "5", title: "UI Kit Expansion", priority: "Medium", owner: "EN", comments: 12, attachments: 6, tags: ["Frontend", "UI"] },
        ]
    },
    {
        id: "done",
        title: "Review",
        description: "Done but needs verification",
        color: "bg-emerald-500",
        tasks: [
            { id: "6", title: "Initial Repo Setup", priority: "Low", owner: "AJ", comments: 1, attachments: 0, tags: ["DevOps"] },
            { id: "7", title: "Deployment Pipeline", priority: "High", owner: "BS", comments: 4, attachments: 2, tags: ["CI/CD"] },
        ]
    }
]

export default function KanbanPage() {
    const [board, setBoard] = useState(initialBoardData);
    const [activeCol, setActiveCol] = useState<string | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isAssetsOpen, setIsAssetsOpen] = useState(false);
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const [draggedFromColId, setDraggedFromColId] = useState<string | null>(null);

    // Form state
    const [taskTitle, setTaskTitle] = useState("");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

    const handleDragStart = (e: React.DragEvent, taskId: string, colId: string) => {
        setDraggedTaskId(taskId);
        setDraggedFromColId(colId);
        e.dataTransfer.setData("taskId", taskId);
        e.dataTransfer.setData("fromColId", colId);
        e.dataTransfer.effectAllowed = "move";
        // Ghost image styling or opacity can be set here if needed
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }

    const handleDrop = (e: React.DragEvent, toColId: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        const fromColId = e.dataTransfer.getData("fromColId");

        if (fromColId === toColId) return;

        setBoard(prev => {
            const newBoard = JSON.parse(JSON.stringify(prev)) as Column[];
            const fromCol = newBoard.find(c => c.id === fromColId);
            const toCol = newBoard.find(c => c.id === toColId);

            if (!fromCol || !toCol) return prev;

            const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
            if (taskIndex === -1) return prev;

            const [task] = fromCol.tasks.splice(taskIndex, 1);
            toCol.tasks.unshift(task);

            return newBoard;
        });

        toast.success(`Task moved to ${toColId === 'inprogress' ? 'In Progress' : toColId === 'todo' ? 'To Do' : 'Review'}`);
    }

    const handleAddTask = () => {
        if (!taskTitle.trim() || !activeCol) return;

        const newTask: Task = {
            id: Math.random().toString(36).substring(7),
            title: taskTitle,
            priority: priority,
            owner: "AJ",
            comments: 0,
            attachments: 0,
            tags: ["New"]
        };

        setBoard(prev => prev.map(col =>
            col.id === activeCol ? { ...col, tasks: [newTask, ...col.tasks] } : col
        ));

        toast.success("Task created successfully");
        setIsAddOpen(false);
        setTaskTitle("");
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-start">
                    <h2 className="text-4xl font-black tracking-tighter">Workflow Board</h2>
                    <p className="text-muted-foreground font-medium">Streamline your project's velocity and collaboration.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tasks..." className="pl-9 w-48 h-10 border-none bg-muted/30 dark:bg-zinc-800/50" />
                    </div>
                    <Button variant="outline" className="gap-2 h-10 border-dashed dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700" onClick={() => setIsAssetsOpen(true)}>
                        <Paperclip className="h-4 w-4" /> Assets
                    </Button>
                    <Button className="gap-2 h-10 shadow-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white border-none" onClick={() => { setActiveCol("todo"); setIsAddOpen(true); }}>
                        <Plus className="h-4 w-4" /> New Task
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                {board.map((column) => (
                    <div
                        key={column.id}
                        className="w-[350px] shrink-0 flex flex-col gap-4"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-3">
                                <div className={`h-2.5 w-2.5 rounded-full ${column.color} shadow-sm shadow-black/20`} />
                                <h3 className="font-black text-sm uppercase tracking-wider opacity-80">{column.title}</h3>
                                <Badge variant="secondary" className="bg-muted dark:bg-zinc-800 text-[10px] font-black rounded-full px-2">
                                    {column.tasks.length}
                                </Badge>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted dark:hover:bg-zinc-800" onClick={() => { setActiveCol(column.id); setIsAddOpen(true); }}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                        <ScrollArea className="flex-1 pr-1">
                            <div className="flex flex-col gap-3 min-h-[150px] p-1 rounded-xl transition-colors duration-200">
                                {column.tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id, column.id)}
                                        className="transition-transform active:scale-95 touch-none"
                                    >
                                        <Card className={cn(
                                            "group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-grab active:cursor-grabbing bg-white dark:bg-zinc-900 border-l-4 overflow-hidden",
                                            draggedTaskId === task.id ? "opacity-50 grayscale" : "opacity-100"
                                        )}
                                            style={{ borderLeftColor: task.priority === 'High' ? '#f43f5e' : task.priority === 'Medium' ? '#f59e0b' : '#3b82f6' }}>
                                            <CardContent className="p-4 space-y-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-wrap gap-1.5 ">
                                                        {task.tags.map(tag => (
                                                            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted dark:bg-zinc-800 text-muted-foreground dark:text-zinc-400 uppercase tracking-tight italic">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="p-1 rounded hover:bg-muted dark:hover:bg-zinc-800 transition-colors">
                                                        <GripVertical className="h-4 w-4 text-muted-foreground opacity-50" />
                                                    </div>
                                                </div>

                                                <p className="font-bold text-sm text-start leading-snug group-hover:text-primary transition-colors dark:text-zinc-100">
                                                    {task.title}
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-muted/50 dark:border-zinc-800">
                                                    <div className="flex items-center gap-3 text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <MessageSquare className="h-3.5 w-3.5" />
                                                            <span className="text-[10px] font-bold">{task.comments}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Paperclip className="h-3.5 w-3.5" />
                                                            <span className="text-[10px] font-bold">{task.attachments}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center -space-x-2">
                                                        <Avatar className="h-6 w-6 border-2 border-white dark:border-zinc-900 ring-2 ring-transparent group-hover:ring-primary/20 transition-all shadow-sm">
                                                            <AvatarFallback className="text-[8px] font-black bg-indigo-500 text-white leading-none">
                                                                {task.owner}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                                <Button
                                    variant="ghost"
                                    className="w-full h-12 border-2 border-dashed border-muted dark:border-zinc-800 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-indigo-500/10 text-muted-foreground hover:text-primary dark:hover:text-indigo-400 font-bold gap-2 transition-all rounded-xl"
                                    onClick={() => { setActiveCol(column.id); setIsAddOpen(true); }}
                                >
                                    <Plus className="h-4 w-4" /> Add Task
                                </Button>
                            </div>
                        </ScrollArea>
                    </div>
                ))}
            </div>

            {/* Assets Drawer/Dialog */}
            <Dialog open={isAssetsOpen} onOpenChange={setIsAssetsOpen}>
                <DialogContent className="sm:max-w-[600px] border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic tracking-tighter flex items-center gap-3 dark:text-zinc-100">
                            <HardDrive className="h-6 w-6 text-indigo-500" /> Project Assets
                        </DialogTitle>
                        <DialogDescription className="dark:text-zinc-400">
                            Manage and upload project-related documents, images, and brand assets.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <FileUploader />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" className="w-full h-11 border-none bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100" onClick={() => setIsAssetsOpen(false)}>Done</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Task Dialog */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="border-none bg-white dark:bg-zinc-950 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="dark:text-zinc-100">Create New Task</DialogTitle>
                        <DialogDescription className="dark:text-zinc-400">Draft a new unit of work for the {activeCol} phase.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2 text-start">
                            <Label htmlFor="title" className="font-bold dark:text-zinc-300">Objective Title</Label>
                            <Input
                                id="title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="h-11 border-none bg-muted/50 dark:bg-zinc-800/50 focus:ring-2 ring-primary/20 dark:text-zinc-100"
                            />
                        </div>
                        <div className="grid gap-2 text-start">
                            <Label htmlFor="priority" className="font-bold dark:text-zinc-300">Impact Level</Label>
                            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                                <SelectTrigger className="h-11 border-none bg-muted/50 dark:bg-zinc-800/50 dark:text-zinc-100">
                                    <SelectValue placeholder="Select impact" />
                                </SelectTrigger>
                                <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                                    <SelectItem value="High" className="dark:text-zinc-100 dark:focus:bg-zinc-800">High Impact</SelectItem>
                                    <SelectItem value="Medium" className="dark:text-zinc-100 dark:focus:bg-zinc-800">Medium Impact</SelectItem>
                                    <SelectItem value="Low" className="dark:text-zinc-100 dark:focus:bg-zinc-800">Standard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" className="dark:text-zinc-400 dark:hover:bg-zinc-800" onClick={() => setIsAddOpen(false)}>Discard</Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 h-11 px-8 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 text-white border-none" onClick={handleAddTask}>
                            Post to Board
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
