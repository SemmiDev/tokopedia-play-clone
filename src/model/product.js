import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    product_link: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
