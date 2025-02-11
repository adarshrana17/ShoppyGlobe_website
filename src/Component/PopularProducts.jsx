import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import useFetch from "../utlis/useFetch";

function PopularProducts() {
    const [products, setProducts] = useState([]);
    const { data, error, loading } = useFetch("https://dummyjson.com/products");

    useEffect(() => {
        if (data && data.products) {
            const filteredProducts = data.products.filter(product => product.rating > 4.3);
            setProducts(filteredProducts);
        }
    }, [data]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-2xl">Loading</p>
            </div>
        );
    }

    return (
        <div className="pb-5">
            <h1 className="text-4xl text-center w-full mt-5 font-semibold">Top-Rated Products</h1>
            <div className="flex flex-wrap gap-5 m-5 justify-center">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.images[0]}
                        description={product.description}
                        brand={product.brand}
                        rating={product.rating}
                    />
                ))}
            </div>
        </div>
    );
}

export default PopularProducts;
