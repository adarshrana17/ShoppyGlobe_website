import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../utlis/useFetch";
import Search from "./Search";
import { useSelector } from "react-redux";
import PopularProducts from "./PopularProducts";
import Footer from "./footer";

function Header({ showPopularProducts = true, showHeroSection= true, showFooter=true}) {
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(null);
    const { data } = useFetch("https://dummyjson.com/products");

    const cartItem = useSelector((store) => store.cart.items.length);

    function handleSearch() {
        if (searchText.trim() === "") {
            setFilteredProducts(null);
        } else if (data && data.products) {
            const filtered = data.products.filter((product) =>
                product.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }
    return (
        <>
            {/* Navbar */}
            <header className="fixed w-full bg-gradient-to-r from-purple-700 to-indigo-800 shadow-lg z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-6 flex-wrap md: flex justify-between items-center space-x-5">
                    {/* Logo */}
                    <div className="text-3xl font-extrabold text-white tracking-wide flex items-center gap-2">
                        <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-600">S</span>HOPPY
                        <span className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-green-500">G</span>LOBE
                        <i className="fa-solid fa-globe text-white text-3xl"></i>
                    </div>

                    {/* Search Bar */}
                        <div className="flex items-center bg-white rounded-lg overflow-hidden w-full md:w-1/2 max-w-lg shadow-md">
                            <input type="text" className="w-full px-4 py-2 text-black focus:outline-none" placeholder="Search for products..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                            <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition">
                                <i className="fa-solid fa-search"></i></button>
                        </div>

                    {/* Navigation */}
                    <nav>
                        <ul className="flex gap-6 text-lg text-white font-medium">
                            <li>
                                <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/productlist" className="hover:text-yellow-300 transition">Products</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="relative hover:text-yellow-300 transition">
                                    Cart <span className="ml-1 px-2 py-1 bg-red-500 text-white text-sm rounded-full">{cartItem}</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
              {showHeroSection && (
            <section className="relative bg-gray-100 pt-28 pb-20">
                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-6">
                    {/* Left Side - Text */}
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                            Discover Amazing <span className="text-indigo-600">Products</span> at Unbeatable Prices!
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Shop the latest, top-rated items, and exclusive deals – all in one place.
                        </p>
                        <Link to="/productlist">
                            <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg shadow-md transition">
                                Start Shopping →
                            </button>
                        </Link>
                    </div>

                    {/* Right Side - Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src="../public/shopping.png"
                            alt="Shopping"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>
              )}

            {/* Popular Products or Search Results */}
            <div className="bg-gray-200 py-10">
                {filteredProducts !== null ? (
                    <Search products={filteredProducts} />
                ) : (
                    showPopularProducts && <PopularProducts />
                )}
            </div>
            {showFooter && (
           <Footer />
        )} 
        </>
    );
}

export default Header;
