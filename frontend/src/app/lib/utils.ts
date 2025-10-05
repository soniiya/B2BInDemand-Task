import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Organizations = [
  { _id: "org1", name: "Organization One", status: "pending", client: "client1" },
  { _id: "org2", name: "Organization Two", status: "done", client: "client2" },
  { _id: "org3", name: "Organization Three", status: "in progress", client: "client3" },
];


 export const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'on-hold':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };