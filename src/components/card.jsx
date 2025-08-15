import { useState } from "react";
import { useCart } from "../context/cartcontext";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import Overlay from "./overlay";

const Card = ({
  id,
  name,
  edition,
  description,
  price,
  discount,
  url,
  thumbnails,
  mainImgs
}) => {
  const [quantity, setQuantity] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();


  const allThumbnails = thumbnails || null;

  const handleInputChange = (value) => {
    if (isNaN(Number(value))) return;
    setQuantity(Number(value) || 0);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(q - 1, 0));

  const handleMainImageClick = () => {
    setCurrentImageIndex(0); // Reset to main image when opening
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allThumbnails.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allThumbnails.length - 1 : prev - 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      {showOverlay && (
        <Overlay
          url={mainImgs?.[currentImageIndex] ?? ""}
          thumbnails={thumbnails}
          onClose={handleCloseOverlay}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onThumbnailClick={handleThumbnailClick}
          i={currentImageIndex}
        />
      )}

      <main className="flex flex-col md:flex-row big flex-grow">
        {/* product image */}
        <section className="md:w-1/2 -mt-5 cursor-pointer">
          <img
            src={url}
            alt="main product"
            className="w-85 h-90 object-cover mr-auto ml-auto rounded-[1rem]"
            onClick={handleMainImageClick}
          />
        </section>

        {/* product details */}
        <aside className="md:w-1/2 flex flex-col justify-center lego mt-9">
          <h4 className="uppercase tracking-wide text-[0.8em] text-gray-700 font-semibold">
            {name}
          </h4>
          <h2 className="text-3xl font-bold text-gray-950 capitalize mt-2 text-start w-[20ch] mb-5">
            {edition}
          </h2>
          <section className="first-section">
            <p className="first-p text-[0.9em]/6 font-medium">{description}</p>{" "}
            <p className="price-and-discount">
              <span className="text-2xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
              <span className="bg-black text-white font-semibold px-2 py-1 rounded-md">
                {discount}%
              </span>
            </p>
            <p className="line-through text-gray-400 discount cancelledd-price">
              $250.00
            </p>
            {/* add to cart and quantity */}
            <section className="flex gap-3 mt-6">
              <div className="flex items-center rounded-lg overflow-hidden buttons-add-substract">
                <button
                  onClick={decrement}
                  className="px-3 py-2 text-orange-600 hover:bg-gray-100"
                >
                  <Minus strokeWidth={6} width={10} height={10} />
                </button>
                <input
                  type="tel"
                  placeholder={quantity}
                  className="w-16 p-2 text-center outline-none"
                  value={quantity}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <button
                  onClick={increment}
                  className="px-3 py-2 text-orange-600 hover:bg-gray-100"
                >
                  <Plus strokeWidth={6} width={10} height={10} />
                </button>
              </div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-black px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition disabled:opacity-50 add-to-cart-btn"
                disabled={quantity === 0}
                onClick={() => addToCart({ id, name, price, url }, quantity)}
              >
                <ShoppingCart width={15} height={15} style={{ fill: "none" }} />
                Add to cart
              </button>
            </section>
          </section>
        </aside>
      </main>
    </>
  );
};

export default Card;
