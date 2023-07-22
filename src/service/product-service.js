import ProductRepository from '../repository/product-repository.js';
import VideoRepository from "../repository/video-repository.js";

const ProductService = {
    async createProduct(productData) {
        return ProductRepository.create(productData);
    },

    async findProductById(productId) {
        return ProductRepository.findById(productId);
    },


    async findProductsByVideoId(id) {
        return ProductRepository.findProductsByVideoId(id);
    },

    async findAllProducts() {
        return ProductRepository.findAll();
    },

    async updateProduct(productId, productData) {
        return ProductRepository.update(productId, productData);
    },

    async deleteProduct(productId) {
        return ProductRepository.delete(productId);
    },

};

export default ProductService;
