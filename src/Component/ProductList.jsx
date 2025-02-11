import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import useFetch from "../utlis/useFetch";
import Header from "./Header";
import Footer from "./footer";
function ProductList() {
    const [products, setProducts] = useState([]);
    const {data,error,loading} = useFetch('https://dummyjson.com/products');
    useEffect(() => {
        if (data && data.products) {
            setProducts(data.products);
        }
    }, [data]);
    if(error){
        return <p>{error}</p>
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
        <>
        <Header showPopularProducts={false} showHeroSection={false} showFooter={false}/>
        <div className="bg-gray-200 pt-16">
            <h1 className="text-center w-screen pt-10 text-4xl font-semibold">All Products</h1>
            <ul className="flex flex-wrap justify-center items-center gap-10 p-10">
                {products.map(product => (
                    <ProductItem  key={product.id}  id={product.id}  title={product.title}  price={product.price}  image={product.images[0]}  description={product.description} brand = {product.brand} rating={product.rating}
                    />
                ))}
            </ul>
        </div>
        <Footer />
         </>
    );
}
export default ProductList;

