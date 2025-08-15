import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartcontext";


const CartCard = ({ items = [], onCheckout }) => {
  const { removeFromCart } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // delete item functionality
  const handleRemove = (item) => {
    removeFromCart(item)
  }

  return (
    <article className="absolute top-12 -right-8 mt-3 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-50 smallie-card">
      <header className="p-4 border-b flex items-center justify-between gap-4">
        <h3 className="font-bold text-gray-800">Cart</h3>
      </header>

      <section className="p-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8 mt-18 font-bold">Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-600 truncate max-w-10">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                    <span className="font-bold text-gray-900 ml-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  className="text-gray-400 hover:text-orange-500 p-1"
                  aria-label="Remove item"
                  onClick={() => handleRemove(item.name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <button
              onClick={onCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg mt-4 transition-colors"
            >
              Checkout {total}
            </button>
          </>
        )}
      </section>
    </article>
  );
};


export default CartCard;