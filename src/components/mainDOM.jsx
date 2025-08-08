import { useState } from "react";

import Store from "../pages/store";
import img1 from "../assets/image-product-1.jpg";
import img1T from "../assets/image-product-1-thumbnail.jpg";
import img2 from "../assets/image-product-2.jpg";
import img2T from "../assets/image-product-2-thumbnail.jpg";
import img3 from "../assets/image-product-3.jpg";
import img3T from "../assets/image-product-3-thumbnail.jpg";
import img4 from "../assets/image-product-4.jpg";
import img4T from "../assets/image-product-4-thumbnail.jpg";
import "../index.css"

const Main = ({items}) => {
  const [url, setImageUrl] = useState(img1);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    { img: img1, thumb: img1T },
    { img: img2, thumb: img2T },
    { img: img3, thumb: img3T },
    { img: img4, thumb: img4T },
  ];

  const defaultProduct = {
    name: "Sneaker Company",
    edition: "Fall Limited Edition Sneakers",
    description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.`,
    pricing: {
      price: 250.0,
      discountPercentage: 50,
    },
  };

  const handleImageClick = (img, index) => {
    setImageUrl(img)
    setActiveIndex(index)
  }
    return (
      <>
        <main className="flex">
          <section>
            <img src={url} alt="image-1" />
          </section>
          <aside>
            <h4>{defaultProduct.name}</h4>
            <h2>{defaultProduct.edition}</h2>
            <section>
              <p>{defaultProduct.description}</p>{" "}
              <p>
                ${defaultProduct.pricing.price}{" "}
                {defaultProduct.pricing.discount}% <span>$250.00</span>
              </p>{" "}
              <section className="flex gap-1 align-middle justify-center">
                <button>-</button>
                <input
                  type="tel"
                  placeholder="0"
                  className="w-20 p-2 text-center"
                />
                <button>+</button>
                <button>Add to cart</button>
              </section>
            </section>
          </aside>
        </main>
        <aside className="flex">
          {
            images.map((obj, k) => {
             return <article
              key={k}
              onClick={(e) => handleImageClick(obj.img, k)}
              style={{
                border: activeIndex === k ? "2px solid white" : "none",
                fontWeight: activeIndex === k ? "bold" : "normal"
              }}
              >
                <img src={obj.thumb} alt={`thumbnail-${k + 1}`} />
              </article>
            })
          }
        </aside>
      </>
    );
}

export default Main;