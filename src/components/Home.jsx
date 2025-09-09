import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProduct] = useState([]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        console.log(data);
        setProduct(data);
      } catch (err) {
        console.error("Error Fetching ", err);
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      addToCart(product);
    } else {
      alert("Please login to add items to cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <div className="card bg-base-100 w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <figure className="px-4 pt-4">
                <img 
                  src={product.image} 
                  alt="Product image" 
                  className="w-full h-48 object-contain rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm line-clamp-2">{product.title}</h2>
                <p className="text-lg font-bold text-primary">${product.price}</p>
                <div className="card-actions justify-center mt-4">
                  {isAuthenticated ? (
                    <button 
                      className="btn btn-primary btn-sm w-full" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <Link to="/login" className="btn btn-primary btn-sm w-full">
                      Login to Add to Cart
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
