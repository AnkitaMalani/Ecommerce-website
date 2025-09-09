import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl px-10">
          eCommerce
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/" className=" btn-sm hover:underline underline-offset-4">
          Home
        </Link>
        {isAuthenticated && (
          <Link to="/cart" className="btn-sm hover:underline underline-offset-4 relative">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        )}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline btn-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
