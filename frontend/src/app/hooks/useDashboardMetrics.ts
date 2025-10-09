"use client"

import { useState, useEffect, useMemo, useCallback } from 'react';
import { FolderKanban, Users, CheckSquare, TrendingUp, LucideIcon } from 'lucide-react';
import { 
    fetchLeadsMetrics, 
    fetchProjectsMetrics, 
    fetchTasksMetrics, 
    fetchOrgsMetrics 
} from '../services/api';

interface ResourceData<T> {
    total: number;
    data: T[];
}

interface CombinedMetrics {
    leads: ResourceData<any>;
    projects: ResourceData<any>;
    tasks: ResourceData<any>;
    orgs: ResourceData<any>;
}

export type StatItem = {
    name: string;
    value: string;
    change: string;
    icon: LucideIcon;
    color: string;
}

const getRandomChange = () => {
    const isPositive = Math.random() > 0.5;
    const value = Math.floor(Math.random() * 20) + 1; 
    const sign = isPositive ? '+' : '-';
    return `${sign}${value}%`;
};

export const useDashboardMetrics = () => {
    const [data, setData] = useState<CombinedMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMetrics = useCallback(async () => {
        setIsLoading(true);
        try {
            const [leadsRes, projectsRes, tasksRes, orgRes] = await Promise.all([
                fetchLeadsMetrics(),
                fetchProjectsMetrics(),
                fetchTasksMetrics(),
                fetchOrgsMetrics()
            ]);

            const combinedData: CombinedMetrics = {
                leads: leadsRes,
                projects: projectsRes,
                tasks: tasksRes,
                orgs: orgRes
            };

            setData(combinedData);
        } catch (error) {
            console.error("Failed to fetch dashboard metrics:", error);
            setData(null); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    const results = useMemo(() => {
        if (!data) {
        return { stats: [], recentLeads: [], recentTasks: [] }; 
        }

        // const totalLeadsCount = data.leads.length;
        // const activeProjectsCount = data.projects.filter(p => p.status === 'active').length;
        // const tasksTodayCount = data.tasks.filter(t => t.status === 'todo').length;
        // const activeOrgs = data.orgs.filter(t => t.status === 'active').length;

        const totalLeadsCount = data.leads.total;
        const activeProjectsCount = data.projects.data.filter(p => p.status === 'active').length;
        const tasksTodayCount = data.tasks.data.filter(t => t.status === 'todo').length;
        const totalOrgs = data.orgs.total

        console.log("active orgs", totalOrgs)

        const totalLeadsStat: StatItem = {
            name: "Total Leads",
            value: totalLeadsCount.toString(),
            change: getRandomChange(), 
            icon: Users,
            color: "text-primary",
        };
        
        const activeProjectsStat: StatItem = {
            name: "Active Projects",
            value: activeProjectsCount.toString(),
            change: getRandomChange(), 
            icon: FolderKanban,
            color: "text-accent",
        };

        const tasksTodayStat: StatItem = {
            name: "Tasks To Do", 
            value: tasksTodayCount.toString(),
            change: getRandomChange(), 
            icon: CheckSquare,
            color: "text-success",
        };

        const activeOrgsStat: StatItem = {
            name: "Total Organizations",
            value: totalOrgs.toString(),
            change: getRandomChange(), 
            icon: FolderKanban,
            color: "text-accent",
        };

        const stats = [totalLeadsStat, activeProjectsStat, tasksTodayStat, activeOrgsStat].sort((a, b) => a.name.localeCompare(b.name));
        
        // const recentLeads = data.leads
        //     .slice(0, 5) 
        //     .map(lead => ({
        //         id: lead._id, 
        //         title: lead.title || 'N/A',
        //         company: lead.company,
        //         status: lead.status,
        //         owner: lead.owner,
        //     }));

        // const recentTasks = data.tasks
        //     .slice(0, 5) 
        //     .map(task => ({
        //         id: task._id,
        //         title: task.title,
        //         project: task.project_name || 'General', 
        //         priority: task.priority,
        //         dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A',
        //     }));

        const recentLeads = data.leads.data
            .map(lead => ({
                id: lead._id, 
                title: lead.title || 'N/A',
                company: lead.company,
                status: lead.status,
                owner: lead.owner,
            }));

        const recentTasks = data.tasks.data
            .map(task => ({
                id: task._id,
                title: task.title,
                project: task.project_name || 'General', 
                priority: task.priority,
                dueDate: task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A',
            }));

        return { stats, recentLeads, recentTasks };
    }, [data]); 

    return { ...results, isLoading };
};