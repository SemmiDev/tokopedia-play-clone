import Product from '../model/product.js';
import Video from "../model/video.js";

const ProductRepository = {
    create: (productData) => Product.create(productData),
    findById: (productId) => Product.findById(productId),
    findAll: () => Product.find().sort({timestamp: -1}),
    update: (productId, productData) => Product.findByIdAndUpdate(productId, productData, { new: true }),
    delete: (productId) => Product.findByIdAndDelete(productId),
    findProductsByVideoId: (id) => Product.find({ video_id: id }),
};

export default ProductRepository;
