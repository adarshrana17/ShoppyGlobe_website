import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utlis/CartSlice";
import { Star } from "lucide-react";

function ProductItem({ id, title, price, image, description, rating, brand }) {
    const dispatch = useDispatch();

    function handleAddProduct() {
        dispatch(addItem({ id, title, price, image, description, brand, rating }));
    }

    return (
        <div className="flex flex-col w-[350px] rounded-lg shadow-lg bg-white overflow-hidden transition-transform duration-300 hover:scale-105">
            {/* Product Image */}
            <img 
                src={image} 
                alt={title} 
                className="w-full h-52 max-h-52 object-contain rounded-lg p-2 bg-gray-100"
            />
            
            {/* Product Details */}
            <div className="p-4 flex flex-col gap-2">
                <h1 className="font-semibold text-lg text-gray-800 truncate">{title}</h1>
                <p className="text-sm text-gray-500">{brand}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" className="text-yellow-400"/>
                    <span className="text-sm font-medium">{rating}</span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
                

                <div className="flex justify-between items-center mt-3">
                    <h1 className="font-bold text-lg text-gray-900">${price}</h1>
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-blue-700 active:scale-95"
                        onClick={handleAddProduct}
                    >
                        Add to Cart
                    </button>
                </div>

                {/* View More Link */}
                <Link to={`/product/${id}`} className="text-blue-500 text-sm mt-2 hover:underline">
                    View More
                </Link>
            </div>
        </div>
    );
}

export default ProductItem;
