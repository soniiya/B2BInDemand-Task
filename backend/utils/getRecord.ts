import { modelMap } from '../models/modelMap.js'; 
import mongoose from 'mongoose';

export const getRecord = async (
    resourceType: keyof typeof modelMap,
    id: mongoose.Types.ObjectId | string
) => {
    const Model = modelMap[resourceType] as mongoose.Model<any>;

    if (!Model) {
        console.error(`Model not found for resource type: ${resourceType}`);
        return null;
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    try {
        const record = await Model.findById(id).select('owner_id'); 
        console.log("recorerd getrecord", record
        )
        return record;

    } catch (error) {
        console.error(`Error fetching record ${resourceType}:${id}:`, error);
        return null;
    }
};