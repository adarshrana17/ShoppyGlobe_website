import ProductItem from "./ProductItem";

function Search({ products }) {
    return (
        <div className="bg-gray-200 p-4 mt-2 shadow-lg rounded">
            <h2 className="text-2xl font-bold text-center my-5">Search Results:</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductItem 
                            key={product.id} 
                            id={product.id} 
                            title={product.title} 
                            price={product.price} 
                            image={product.images[0]} 
                            description={product.description} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No products found.</p>
                )}
            </div>
        </div>
    );
}

export default Search;
