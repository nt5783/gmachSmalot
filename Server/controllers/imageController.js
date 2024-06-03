// //imageController

// import { ImageService } from "../service/imageService";

// export class ImageController {
//     async getImages(req, res, next) {
//         try {
//             const ImageService = new ImageService();
//             const resultItems = await ImageService.getImages(req.query);
//             return res.status(200).json(resultItems);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async getImageById(req, res, next) {
//         try {
//             const ImageService = new ImageService();
//             const resultItem = await ImageService.getImageById(req.params.id);
//             res.status(200).json(resultItem);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async addImage(req, res, next) {
//         try {
//             const ImageService = new ImageService();
//             console.log("aaa")
//             console.log(req.body)
//             const resultItem = await ImageService.addImage(req.body);
//             res.status(200).json(resultItem.insertId);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async deleteImage(req, res, next) {
//         try {
//             const ImageService = new ImageService();
//             await ImageService.deleteImage(req.params.id)
//             res.status(200).json(req.params.id);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async updateImage(req, res, next) {
//         try {
//             const ImageService = new ImageService();
//             const result = await ImageService.updateImage(req.body, req.params.id);
//             // if (result == null)
//             //     throw ("this data cannot be updated")
//             res.status(200).json(req.params.id);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
//             err.message = ex;
//             next(err)
//         }
//     }
// }