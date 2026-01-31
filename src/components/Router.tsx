"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const rules = [
    { id: 1, pattern: "^code.*", model: "claude-3-5-sonnet", type: "regex" },
    { id: 2, pattern: "analysis", model: "claude-3-opus", type: "keyword" },
    { id: 3, pattern: ".*", model: "gpt-4o", type: "default" },
];

export function Router() {
    return (
        <Card className="h-full flex flex-col border shadow-sm bg-white/50 dark:bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg">Routing Rules</CardTitle>
                    <CardDescription>Dispatch requests to specific models</CardDescription>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-muted/50">
                                <TableHead className="w-[30px]"></TableHead>
                                <TableHead>Pattern</TableHead>
                                <TableHead></TableHead>
                                <TableHead>Target Model</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rules.map((rule) => (
                                <TableRow key={rule.id} className="group border-b-muted/50">
                                    <TableCell className="py-2 px-2 text-muted-foreground/50">
                                        <GripVertical className="h-4 w-4 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </TableCell>
                                    <TableCell className="font-mono text-xs py-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="px-1 py-0 text-[10px] h-4 font-normal text-muted-foreground">
                                                {rule.type}
                                            </Badge>
                                            <span className="text-foreground/90">{rule.pattern}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2 text-center text-muted-foreground">
                                        <ArrowRight className="h-3 w-3 inline-block" />
                                    </TableCell>
                                    <TableCell className="font-medium text-xs py-2 text-primary">
                                        {rule.model}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
