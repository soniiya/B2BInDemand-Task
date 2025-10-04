"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Users, FolderKanban, CheckSquare, TrendingUp } from "lucide-react";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";

export default function Dashboard() {
  const  { stats, recentLeads, recentTasks, isLoading } = useDashboardMetrics()

  if (isLoading) {
        return (
            <div className="p-4">
                <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
                <div className="text-lg text-indigo-500">
                    Fetching metrics... 🔄
                </div>
            </div>
        );
    }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stats.map((stat: any) => (
                    <div 
                        className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition duration-200" 
                        key={stat.name}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.name}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <p className="text-sm text-muted-foreground">{stat.change} vs last period</p>
                        </CardContent>
                    </div>
                ))}
                
                {/* Optional: Add a placeholder box if you only fetch 3 stats but want 4 columns */}
                <div className="rounded-xl border border-dashed bg-gray-50 flex items-center justify-center p-4">
                    <p className="text-sm text-gray-500">More metrics coming soon!</p>
                </div>
            </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-s">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{lead.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        lead.status === "won"
                          ? "bg-success/10 text-success"
                          : lead.status === "qualified"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lead.owner}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.project}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-destructive/10 text-destructive"
                          : task.priority === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {task.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
