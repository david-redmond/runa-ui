import http from "../http";
import {creatorCache} from "../index";

export default async (creatorId: string) => {
    // check that the request is the first time.
    if (creatorCache.has(`isFetching-${creatorId}`)) {
        return;
    }
    // Set the request is happening
    creatorCache.set(`isFetching-${creatorId}`, true)
    // Check if the creator details are already in the cache
    if (creatorCache.has(creatorId)) {
        return creatorCache.get(creatorId); // Return cached details
    }

    // If not cached, make an API request
    try {
        const response = await http.get(`/user/other/${creatorId}`);
        // Store the details in the cache
        creatorCache.set(creatorId, response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch creator details:', error);
        return null;
    }
};
