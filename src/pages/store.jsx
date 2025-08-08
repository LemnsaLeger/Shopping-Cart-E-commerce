import { useState, useEffect } from "react";


const Store = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const numberOfRequest = 20;

    useEffect(() => {
        setLoading(true);
        const fetchAll = async () => {
            try{
                const responses = await Promise.all(
                    Array.from({ length: numberOfRequest }, async (_, i) => {
                        console.log("fetching block hit")
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
    }, [numberOfRequest])
    console.log(items)
}

export default Store;