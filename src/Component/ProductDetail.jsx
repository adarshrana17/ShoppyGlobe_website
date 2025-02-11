import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../utlis/useFetch";
import { useDispatch } from "react-redux";
import { addItem } from "../utlis/CartSlice";
import { ArrowLeft, ShoppingCart } from "lucide-react";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { data, error, loading } = useFetch(`https://dummyjson.com/products/${id}`);

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

    const dispatch = useDispatch();

    function handleAddProduct() {
        dispatch(addItem(product));
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-xl mt-2 text-gray-700">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return <h2 className="text-center text-2xl font-semibold mt-10">Product not found</h2>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
            {/* Back Button */}
            <Link to="/productlist" className="absolute top-6 left-6 flex items-center text-blue-600 hover:underline">
                <ArrowLeft size={20} className="mr-1" />
                Back to Products
            </Link>

            {/* Product Card */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl mt-16 p-6">
                {/* Product Image */}
                <div className="flex justify-center">
                    <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="h-60 w-60 object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Product Details */}
                <div className="mt-5 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                    <p className="text-gray-500 text-sm">{product.brand}</p>

                    {/* Rating */}
                    <div className="text-yellow-500 text-lg font-semibold mt-2">
                        ⭐ {product.rating} / 5
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-3">{product.description}</p>

                    {/* Price & Add to Cart */}
                    <div className="flex justify-between items-center mt-6 px-6">
                        <h2 className="text-xl font-bold text-gray-900">${product.price}</h2>
                        <button 
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all hover:bg-blue-700 active:scale-95"
                            onClick={handleAddProduct}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
