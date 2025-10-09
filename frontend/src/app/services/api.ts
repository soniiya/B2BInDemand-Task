import axios from "axios";
const API_BASE_URL = 'http://localhost:5000/api';

const DASHBOARD_PAGE_SIZE = 5; 

const fetchDashboardMetricsForResource = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}?page=1&page_size=${DASHBOARD_PAGE_SIZE}`, { withCredentials: true });
        
        const total = response.data.total || 0;
        const data = response.data.data || [];
        
        return { total, data };
    } catch (error) {
        console.error(`Failed to fetch dashboard metrics for ${endpoint}`, error);
        return { total: 0, data: [] };
    }
}

export const fetchLeadsMetrics = () => fetchDashboardMetricsForResource('leads');
export const fetchProjectsMetrics = () => fetchDashboardMetricsForResource('projects');
export const fetchTasksMetrics = () => fetchDashboardMetricsForResource('tasks');
export const fetchOrgsMetrics = () => fetchDashboardMetricsForResource('orgs');





