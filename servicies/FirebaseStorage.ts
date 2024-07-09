import {getDownloadURL, list, ref, uploadBytes} from "firebase/storage";
import {storage} from "@/config/firebase";

const IMAGES_PER_PAGE = 20;
const imageCache: { [key: string]: string } = {};

export const uploadImage = async (patientId: string, uri: string, name: string): Promise<string> => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `patients/${patientId}/images/${name}`);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        imageCache[`${patientId}/${name}`] = url;
        return url;
    } catch (error) {
        console.error('Error in uploadImage:', error);
        throw error;
    }
};

export const getPatientImages = async (patientId: string, page: number = 0): Promise<string[]> => {
    try {
        const listRef = ref(storage, `patients/${patientId}/images`);
        const res = await list(listRef, { maxResults: IMAGES_PER_PAGE, pageToken: page > 0 ? String(page) : undefined });

        return await Promise.all(res.items.map(async (itemRef) => {
            const cacheKey = `${patientId}/${itemRef.name}`;
            if (imageCache[cacheKey]) {
                return imageCache[cacheKey];
            }
            const url = await getDownloadURL(itemRef);
            imageCache[cacheKey] = url;
            return url;
        }));
    } catch (error) {
        console.error('Error in getPatientImages:', error);
        throw error;
    }
};