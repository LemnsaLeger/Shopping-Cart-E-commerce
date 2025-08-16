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
import Navbar from "./navbar";
import { useCart } from "../context/cartcontext";
import Overlay from "./overlay";

import "../index.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Success from "./success";

const Main = () => {
  const { showSuccess } = useCart();
  const location = useLocation();
  const storeProduct = location.state?.product;
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
// get the main imgs
  const mainImg =
    activeProduct.images?.map((item) => item.img) ||
    defaultProduct.images.map((item) => item.img);

  const discountPrice = (
    (activeProduct.pricing?.price || activeProduct.price) *
    (1 -
      (activeProduct.pricing?.discountPercentage ||
        activeProduct.discountPercentage) /
        100)
  ).toFixed(2);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setShowOverlay(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === activeProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeProduct.images.length - 1 : prev - 1
    );
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };



  return (
    <>
    {
      showSuccess && (
        <Success />
      )
    }
      <main className="hello min-h-screen flex flex-col">
        {activeProduct.name !== "Sneaker Company" && (
          <Navbar title={activeProduct.name} />
        )}

        {showOverlay && (
          <Overlay
            url={activeProduct.images[currentImageIndex].img}
            thumbnails={activeProduct.images.map((img) => img.thumb)}
            onClose={handleCloseOverlay}
            onNext={handleNextImage}
            onPrev={handlePrevImage}
            onThumbnailClick={handleThumbnailClick}
            mainImgs={mainImg}
            i={currentImageIndex}
          />
        )}

        {/* mobile next and prev icons */}
        <section className="mobile-change-img-icons">
          <div className="btn" onClick={handlePrevImage}>
            <ChevronLeft strokeWidth={3} width={30} height={30} />
          </div>
          <div className="btn" onClick={handleNextImage}>
            <ChevronRight strokeWidth={3} width={30} height={30} />
          </div>
        </section>

        <section className="mood flex-grow pt-20 relative">
          <Card
            name={activeProduct.name}
            edition={activeProduct.edition}
            description={activeProduct.description}
            price={activeProduct.pricing?.price || activeProduct.price}
            discount={
              activeProduct.pricing?.discountPercentage ||
              activeProduct.discountPercentage
            }
            url={activeProduct.images[currentImageIndex].img}
            thumbnails={activeProduct.images.map((img) => img.thumb)}
            onImageClick={() => {
              setShowOverlay(true);
              setCurrentImageIndex(0);
            }}
            mainImgs={mainImg}
          />

          {activeProduct.images.length > 1 && (
            <section className="absolute flex justify-center gap-2 left-[21%] bottom-[7.5rem]">
              {activeProduct.images.map((imgObj, index) => (
                <article
                  key={index}
                  className={`thumbnail w-20 h-20 cursor-pointer border-2 rounded-lg overflow-hidden ${
                    currentImageIndex === index
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                  }}
                >
                  <img
                    src={imgObj.thumb}
                    alt={`thumbnail-${index}`}
                    className={`w-fit h-fit object-cover rounded-lg block ${
                      currentImageIndex === index
                        ? "active-thumbnail opacity-50 rounded-none"
                        : ""
                    }`}
                  />
                </article>
              ))}
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default Main;