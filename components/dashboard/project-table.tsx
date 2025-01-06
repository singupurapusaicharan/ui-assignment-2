"use client";

import { AIProject } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectTableProps {
  projects: AIProject[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="rounded-md border border-white/10">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm">
            <TableHead className="text-white">User</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Time</TableHead>
            <TableHead className="text-white">AI Performance</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <motion.tr
              key={project.id}
              className="group border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <TableCell className="text-gray-300 group-hover:text-white">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={project.user.avatar} />
                    <AvatarFallback>{project.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{project.user.name}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium text-gray-300 group-hover:text-white">{project.name}</TableCell>
              <TableCell className="max-w-xs truncate text-gray-300 group-hover:text-white">{project.description}</TableCell>
              <TableCell className="text-gray-300 group-hover:text-white">{project.timestamp}</TableCell>
              <TableCell>
                <Link 
                  href={`/dashboard/insights/${project.id}`}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  Insights
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      project.status === 'approved'
                        ? 'bg-green-600 hover:bg-green-600 text-white border-green-600'
                        : project.status === 'pending'
                        ? 'border-green-600 text-green-400 hover:bg-transparent'
                        : 'text-gray-400 hover:bg-transparent'
                    }
                    disabled
                  >
                    Approved
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      project.status === 'rejected'
                        ? 'bg-red-600 hover:bg-red-600 text-white border-red-600'
                        : project.status === 'pending'
                        ? 'border-red-600 text-red-400 hover:bg-transparent'
                        : 'text-gray-400 hover:bg-transparent'
                    }
                    disabled
                  >
                    Rejected
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1 bg-blue-500/10 border-white/20 backdrop-blur-sm"
                >
                  <span className="text-white font-medium">₹{project.budget.toLocaleString('en-IN')}</span>
                </Badge>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}