import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";


const Store = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const numberOfRequest = 20;

    useEffect(() => {
        setLoading(true);
        const fetchAll = async () => {
            try {
                const responses = await Promise.all(
                    Array.from({ length: numberOfRequest }, async (_, i) => {
                        // console.log("fetching block hit")
                        return fetch(`https://fakestoreapi.com/products/${i + 1}`, {mode : 'cors'})
                        .then((response) => {
                            if(response.status >= 400) {
                                throw new Error("Server Error");
                            }
                            return response.json();
                        })
                    })
                );
                setItems(responses);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } 
        fetchAll();
    }, [numberOfRequest]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>{error}</p>


    return (
      <>
        <Navbar />
        <div className="grid grid-cols-4 gap-6 p-6">
          {items.map((product) => (
            <Link
              key={product.id}
              to={`/store/${encodeURIComponent(product.title)}`}
              state={{ product }}
              className="block border p-4 rounded hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-2"
              />
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </>
    );
    
}

export default Store;