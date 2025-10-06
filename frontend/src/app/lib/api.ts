import axios from "axios";
import { LoginData, SignUpData, CreateProjectType, CreateLeadType, CreateTaskType, CreateOrgType } from "./type";

const API_BASE_URL = 'http://localhost:5000/api';

export const signup = async (payload: SignUpData) => {
    try{
    const response = await axios.post(`${API_BASE_URL}/auth/register`, payload, { withCredentials: true });
    return response.data;
    }
    catch(error){
        console.error("Signup error:", error);
    }
};

export const login = async (payload: LoginData) => {
    try{
    const response = await axios.post(`${API_BASE_URL}/auth/login`, payload, { withCredentials: true });
    return response.data;
    }
    catch(error){
        console.error("Login error:", error);
    }
};

export const logout = async () => {
    try{
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    return response.data;
    }
    catch(error){
        console.error("Logout error:", error);
    }
};


//projects

export const createProject = async (orgId: string, projectData: CreateProjectType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects`, { org_id: orgId, ...projectData }, { withCredentials: true });  
        return response.data;
    } catch (error) {
        console.error("Create Project error:", error);
    }
};

export const fetchAllProjects = async () => {
    try{
       const response = await axios.get(`${API_BASE_URL}/projects`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchProjectById = async (id: string) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/projects/${id}`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchSearchedProject = async (query: any) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/projects/search/${query}`, { withCredentials: true });  
       return response.data;
    }
    catch(err){
        console.log(err)
    }
}

export const updateProject = async (id: string, projectData: CreateProjectType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/projects/${id}`, { ...projectData }, { withCredentials: true });  
        return response.data;
    } catch (error) {
        console.error("Create Project error:", error);
    }
};


export const deleteProject = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, { 
             withCredentials: true 
        });
        return response.data;
    } catch (error) {
        console.error(`Delete Project ${id} error:`, error);
        throw error;
    }
};


// leads

export const createLead = async (data: CreateLeadType) => {
    console.log("leadData", data)
    try {
        const response = await axios.post(`${API_BASE_URL}/leads`, { data }, 
            { withCredentials: true }
        );  
        return response.data;
    } catch (error) {
        console.error("Create Lead error:", error);
    }
};

export const fetchAllLeads = async () => {
    try{
       const response = await axios.get(`${API_BASE_URL}/leads`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchLeadById = async (id: string) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/leads/${id}`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchSearchedLead = async (query: any) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/leads/search/${query}`, { withCredentials: true });  
       return response.data;
    }
    catch(err){
        console.log(err)
    }
}

export const updateLead = async (id: string, data: CreateLeadType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/leads/${id}`, { ...data }, { withCredentials: true });  
        return response.data;
    } catch (error) {
        console.error("Create Lead error:", error);
    }
};


export const deleteLead = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/leads/${id}`, { 
             withCredentials: true 
        });
        return response.data;
    } catch (error) {
        console.error(`Delete Lead ${id} error:`, error);
        throw error;
    }
};


//tasks 

export const createTask = async ( data: CreateTaskType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, { data }, 
            { withCredentials: true }
        );  
        return response.data;
    } catch (error) {
        console.error("Create Lead error:", error);
    }
};

export const fetchAllTasks = async () => {
    try{
       const response = await axios.get(`${API_BASE_URL}/tasks`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchTaskById = async (id: string) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, { withCredentials: true });  
       console.log("api response", response.data)
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchSearchedTask = async (query: any) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/tasks/search/${query}`, { withCredentials: true });  
       return response.data;
    }
    catch(err){
        console.log(err)
    }
}

export const updateTask = async (id: string, data: CreateTaskType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, { ...data }, { withCredentials: true });  
        return response.data;
    } catch (error) {
        console.error("Create Task error:", error);
    }
};


export const deleteTask = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`, { 
             withCredentials: true 
        });
        return response.data;
    } catch (error) {
        console.error(`Delete Task ${id} error:`, error);
        throw error;
    }
};

//orgs

export const createOrg = async ( data: CreateOrgType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orgs`, { data }, 
            { withCredentials: true }
        );  
        return response.data;
    } catch (error) {
        console.error("Create Lead error:", error);
    }
};

export const fetchOrgById = async (id: string) => {
    try{
       const response = await axios.get(`${API_BASE_URL}/orgs/${id}`, { withCredentials: true });  
       console.log("api response", response.data)
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const fetchAllOrgs = async () => {
    try{
       const response = await axios.get(`${API_BASE_URL}/orgs`, { withCredentials: true });  
       return response.data; 
    }
    catch(err){
        console.log(err)
    }
}

export const updateOrg = async (id: string, data: CreateOrgType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/orgs/${id}`, { ...data }, { withCredentials: true }); 
        return response.data;
    } catch (error) {
        console.error("Create Task error:", error);
    }
};

export const deleteOrg = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/orgs/${id}`, { withCredentials: true }); 
        return response.data;
    } catch (error) {
        console.error("Create Task error:", error);
    }
};