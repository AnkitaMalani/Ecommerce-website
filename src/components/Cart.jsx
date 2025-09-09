import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import recyclebin from "../assets/recyclebin.png";

const Cart = () => {
  const { cartItems, setCartItems } = useCart();
  const { user } = useAuth();

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.toSpliced(indexToRemove, 1));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <span className="text-lg text-gray-600">Welcome, {user?.name}!</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty.</p>
          <p className="text-gray-400">Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {cartItems.map((item, index) => (
              <div key={index} className="relative">
                {/* delete button */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="absolute top-2 right-2 w-6 h-6"
                >
                  <img src={recyclebin} alt="Remove" />
                </button>

                {/* card content */}
                <div className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-green-600">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">
                Total Items: {cartItems.length}
              </span>
              <span className="text-2xl font-bold text-green-600">
                Total: ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
