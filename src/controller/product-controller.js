import ProductService from '../service/product-service.js';
import {ErrorResponse, SuccessResponse} from "./http-response.js";
import VideoService from "../service/video-service.js";

const ProductController = {
    async createProduct(req, res) {
        try {
            const {video_id, name, price, product_link} = req.body;

            const video = await VideoService.findVideoById(video_id);
            if (!video) {
                return ErrorResponse({res, statusCode: 404, message: 'Video not found.'})
            }

            const productData = {
                video_id,
                name,
                price,
                product_link,
            };

            const newProduct = await ProductService.createProduct(productData);
            return SuccessResponse({res, statusCode: 201, message: 'Product created.', payload: newProduct})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to create product.'})
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await ProductService.findAllProducts();
            return SuccessResponse({res, statusCode: 200, message: 'Success', payload: products})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to fetch products.'})
        }
    },

    async getProductsByVideoId(req, res) {
        try {
            const {id} = req.params;
            const products = await ProductService.findProductsByVideoId(id);

            if (!products) {
                return ErrorResponse({res, statusCode: 404, message: 'Products not found.'})
            }

            return SuccessResponse({res, statusCode: 200, message: 'Success', payload: products})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to fetch products.'})
        }
    },

    async getProductbyId(req, res) {
        try {
            const {id} = req.params;
            const product = await ProductService.findProductById(id);

            if (!product) {
                return ErrorResponse({res, statusCode: 404, message: 'Product not found.'})
            }

            return SuccessResponse({res, statusCode: 200, message: 'Success', payload: product})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to fetch product.'})
        }
    },

    async updateProduct(req, res) {
        try {
            const {id} = req.params;
            const {name, price, product_link} = req.body;

            const productData = {
                name,
                price,
                product_link,
            };

            const updatedProduct = await ProductService.updateProduct(id, productData);
            return SuccessResponse({res, statusCode: 200, message: 'Product updated.', payload: updatedProduct})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to update product.'})
        }
    },

    async deleteProduct(req, res) {
        try {
            const {id} = req.params;
            await ProductService.deleteProduct(id);
            return SuccessResponse({res, statusCode: 200, message: 'Product deleted.'})
        } catch (error) {
            return ErrorResponse({res, statusCode: 500, message: 'Failed to delete product.'})
        }
    }
}

export default ProductController;
