import { Trash2 } from "lucide-react";
import { useCart } from "../context/cartcontext";


const Cart = () => {

    const { cartItems, removeFromCart } = useCart();

    const price = (q, p) => {
        return q * p;
    }

    return (
      <section>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No Items yet In your Cart</p>
        ) : (
          cartItems.map((item) => (
            <section key={item.id}>
              <img src={item.url} alt={item.name} />
              <section>
                <p>{item.name}</p>
                <p>
                  {`$${price(item.price, item.quantity)}`}
                </p>
                <p>{item.quantity} item(s)</p>
              </section>
              <button onClick={() => removeFromCart(item.id)}>
                <Trash2 color="white"/>
              </button>
            </section>
          ))
        )}
      </section>
    );
}

export default Cart;