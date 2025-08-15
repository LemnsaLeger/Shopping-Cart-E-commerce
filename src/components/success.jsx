import { X } from "lucide-react";


import "../index.css"
import { useCart } from "../context/cartcontext";

const Success = () => {
    const { setShowSuccess } = useCart();
    const handleClose = () => {
        setShowSuccess(false)
    }
    return (
      <>
        <section className="bg-green-100 border border-green-300 p-3 rounded-md flex items-center justify-between shadow-sm absolute top-9 right-0">
          <section className="flex gap-2">
            <p className="flex items-center gap-2">
              <span className="bg-green-500 p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </p>
            <p className="text-green-950 font-medium text-sm">
              Successfully Added to Cart
            </p>
          </section>
          <p>
            <X
              strokeWidth="2"
              width={15}
              height={15}
              className="text-green-700 cursor-pointer"
              onClick={handleClose}
            />
          </p>
        </section>
      </>
    );
}

export default Success;