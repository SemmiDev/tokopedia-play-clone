import ProductService from '../service/product-service.js';
import { ErrorResponse, SuccessResponse } from './http-response.js';
import VideoService from '../service/video-service.js';
import { validateProductData } from './validator.js';


async function createProduct(req, res) {
    try {
        const productData = req.body;

        const validation = validateProductData(productData);
        if (!validation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: 'Validation errors.',
                errors: validation.errors,
            });
        }

        const { video_id } = productData;
        const video = await VideoService.findVideoById(video_id);
        if (!video) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Video not found.',
            });
        }

        const newProduct = await ProductService.createProduct(productData);
        return SuccessResponse({
            res,
            statusCode: 201,
            message: 'Product created.',
            payload: newProduct,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to create product.',
        });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await ProductService.findAllProducts();
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: products,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch products.',
        });
    }
}

async function getProductsByVideoId(req, res) {
    try {
        const { id } = req.params;
        const products = await ProductService.findProductsByVideoId(id);

        if (!products) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Products not found.',
            });
        }

        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: products,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch products.',
        });
    }
}

async function getProductbyId(req, res) {
    try {
        const { id } = req.params;
        const product = await ProductService.findProductById(id);

        if (!product) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Product not found.',
            });
        }

        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: product,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch product.',
        });
    }
}

async function updateProduct(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;
        const productData = req.body;

        const product = await ProductService.findProductById(id);
        if (!product) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Product not found.',
            });
        }

        if (!isAuthorized(product.user_id.toString(), user._id.toString())) {
            return ErrorResponse({
                res,
                statusCode: 403,
                message: 'Forbidden',
            });
        }

        const validation = validateProductData(productData);
        if (!validation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: 'Validation errors.',
                errors: validation.errors,
            });
        }

        const updatedProduct = await ProductService.updateProduct(
            id,
            productData
        );
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Product updated.',
            payload: updatedProduct,
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to update product.',
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;

        const product = await ProductService.findProductById(id);
        if (!product) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Product not found.',
            });
        }

        if (!isAuthorized(product.user_id.toString(), user._id.toString())) {
            return ErrorResponse({
                res,
                statusCode: 403,
                message: 'Forbidden',
            });
        }

        await ProductService.deleteProduct(id);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Product deleted.',
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to delete product.',
        });
    }
}

export {
    createProduct,
    getAllProducts,
    getProductsByVideoId,
    getProductbyId,
    updateProduct,
    deleteProduct,
};
