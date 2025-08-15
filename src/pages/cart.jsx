import { Trash2 } from "lucide-react";
import { useCart } from "../context/cartcontext";
import { Link } from "react-router-dom";
import "../index.css";
import Navbar from "../components/navbar";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const price = (q, p) => {
    return q * p;
  };

  const shipping = 5.0;
  const taxRate = 0.04;

  // caculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <>
    <Link to={"/"} className="text-gray-500 font-semibold underline">Home</Link>{" "}
    <Link to={"/store"} className="">Store</Link>
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">
              No Items yet In your Cart
              <br />
              <Link to="/store" className="text-orange-600 hover:underline">
                Shop Now
              </Link>
            </p>
          ) : (
            <section className="space-y-6 border-t border-b divide-y">
              {cartItems.map((item) => (
                <section key={item.name} className="flex items-center py-6">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <section className="ml-6 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {item.color || "Color"} &nbsp;|&nbsp;{" "}
                      {item.size || "Size"}
                    </p>
                    <p className="text-gray-600 text-sm">{`$${price(
                      item.price,
                      item.quantity
                    ).toFixed(2)}`}</p>
                    <p>{item.quantity} item(s)</p>

                    {item.inStock ? (
                      <p className="mt-2 text-green-600 flex items-center text-sm font-medium">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        In Stock
                      </p>
                    ) : (
                      <p className="mt-2 text-gray-500 text-sm flex items-center">
                        <svg
                          className="w-4 h-4 mr-1 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3"
                          ></path>
                        </svg>
                        Ships in 3-4 weeks
                      </p>
                    )}
                  </section>

                  <section className="ml-6">
                    <label htmlFor={`quantity-${item.id}`} className="sr-only">
                      Quantity
                    </label>
                    <select
                      name="quantity"
                      id={`quantity-${item.id}`}
                      className="rounded border border-gray-300 text-gray-700 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      value={item.quantity}
                      onChange={(e) => {
                        item.quantity = e.target.value;
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option value={qty} key={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </section>
                  <button
                    className="ml-6 text-gray-400 hover:text-gray-600"
                    onClick={() => removeFromCart(item.name)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 color="white" size={20} />
                  </button>
                </section>
              ))}
            </section>
          )}
        </section>

        {/* right: order summary */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-6">Order summary</h3>
          <dl className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between text-gray-600">
              <dt>
                Shipping estimate{" "}
                <button
                  type="button"
                  aria-label="Shipping estimate info"
                  className="text-gray-400 hover:text-gray-500 ml-1"
                >
                  {/* ? */}
                </button>
              </dt>
              <dd>${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between text-gray-600">
              <dt>
                Tax estimate{" "}
                <button
                  type="button"
                  aria-label="Tax estimate info"
                  className="text-gray-400 hover:text-gray-500 ml-1"
                >
                  {/* ? */}
                </button>
              </dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
              <dt>Order total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <button className="mt-6 w-full border-2 bg-orange-600 text-white py-3 rounded-lg hover:bg-[hsl(25, 100%, 94%)] transition-colors">
            Checkout
          </button>
        </section>
      </main>
    </>
  );
};

export default Cart;
