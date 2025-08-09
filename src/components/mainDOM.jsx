import { useState } from "react";
import { useLocation } from "react-router-dom";


import img1 from "../assets/image-product-1.jpg";
import img1T from "../assets/image-product-1-thumbnail.jpg";
import img2 from "../assets/image-product-2.jpg";
import img2T from "../assets/image-product-2-thumbnail.jpg";
import img3 from "../assets/image-product-3.jpg";
import img3T from "../assets/image-product-3-thumbnail.jpg";
import img4 from "../assets/image-product-4.jpg";
import img4T from "../assets/image-product-4-thumbnail.jpg";

import Card from "./card";
import "../index.css"
import Navbar from "./navbar";

const Main = () => {

  const location = useLocation();
  const storeProduct = location.state?.product;

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
    images: images,
  };

    const activeProduct = storeProduct
      ? {
          name: storeProduct.title,
          edition: storeProduct.category,
          description: storeProduct.description,
          price: storeProduct.price,
          discountPercentage: storeProduct.discountPercentage || 0,
          images: storeProduct.images
            ? storeProduct.images.map((img) => ({ img, thumb: img }))
            : [{ img: storeProduct.image, thumb: storeProduct.image }],
        }
      : defaultProduct;

      const [url, setImageUrl] = useState(activeProduct.images[0].img);

  const handleImageClick = (img, index) => {
    setImageUrl(img)
    setActiveIndex(index)
  }
    return (
      <>
        {activeProduct.name !== "Sneaker Company" && <Navbar title={activeProduct.name}/>} // update navbar logo as product name
        <Card
          name={activeProduct.name}
          edition={activeProduct.edition}
          description={activeProduct.description}
          price={activeProduct.pricing?.price || activeProduct.price}
          discount={
            activeProduct.pricing?.discountPercentage ||
            activeProduct.discountPercentage
          }
          url={url}
        />

        {activeProduct.images.length > 1 && ( // check if default product
          <aside className="flex">
            {images.map((obj, k) => {
              return (
                <article
                  key={k}
                  onClick={(e) => handleImageClick(obj.img, k)}
                  style={{
                    border: activeIndex === k ? "2px solid white" : "none",
                    fontWeight: activeIndex === k ? "bold" : "normal",
                  }}
                >
                  <img src={obj.thumb} alt={`thumbnail-${k + 1}`} />
                </article>
              );
            })}
          </aside>
        )}
      </>
    );
}

export default Main;