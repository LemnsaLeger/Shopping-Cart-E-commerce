import { useState } from "react";
import { useCart } from "../context/cartcontext";


const Card = ({ id, name, url, edition, description, price, discount }) => {

  const [quantity, setQuantity] = useState(0);

  const handleInputChange = (value) => {
      if(isNaN(Number(value))) return; // only numbers are accepted

          setQuantity(Number(value) || 0) // replacing values not adding
  }


  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(q-1, 0))
  
  const { addToCart } = useCart();

    return (
      <>
        <main className="flex">
          <section>
            <img src={url} alt="main product" />
          </section>
          <aside>
            <h4>{name}</h4>
            <h2>{edition}</h2>
            <section>
              <p>{description}</p>{" "}
              <p>
                ${price}{" "}
                {discount}% <span>$250.00</span>
              </p>{" "}
              <section className="flex gap-1 align-middle justify-center">
                <button onClick={decrement}>-</button>
                <input
                  type="tel"
                  placeholder={quantity}
                  className="w-20 p-2 text-center"
                  value={quantity}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <button onClick={increment}>+</button>
                <button disabled={quantity === 0} onClick={() => addToCart({id, name, price, url}, quantity)}>Add to cart</button>
              </section>
            </section>
          </aside>
        </main>
      </>
    );
}

export default Card;