
import { executeQuery } from './db.js';
import { getImageQuery, getImageByIdQuery, addImageQuery, deleteImageQuery, updateImageQuery } from './queryImage.js'

export class ImageService {

    async getImage(queryparams) {
        const queryImage = getImageQuery(queryparams);
        const result = await executeQuery(queryImage);
        return result;
    }

    async getImageById(model) {
        // const queryImage = getImageByIdQuery();
        // const result = await executeQuery(queryImage, [id]);
        const img = 
        return result;
    }

    async addImage(newImage) {
        //const queryImage = addImageQuery();
        // const result = await executeQuery(queryImage, [newImage]);
        const queryImage = addImageQuery(Object.keys(newImage));
        const result = await executeQuery(queryImage, Object.values(newImage));
        return result;
    }

    async deleteImage(id) {
        const queryImage = deleteImageQuery();
        await executeQuery(queryImage, [id]);
    }

    async updateImage(updatedImage, id) {
        let data = Object.values(updatedImage);
        data.push(id)
        const queryImage = updateImageQuery(Object.keys(updatedImage), id);
        await executeQuery(queryImage, data);
    }

}