// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   // const [products, loading, error] = useCustomQuery("/api/products");
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const response = await axios.get("/api/products/?search=" + search);
//         setProducts(response.data);
//         console.log(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     })();
//   }, [search]);

//   if (error) {
//     return <h1>Something went wrong</h1>;
//   }
//   if (loading) {
//     return <h1>Loading...</h1>;
//   }
//   return (
//     <>
//       <h1>Welcome to the frontend</h1>
//       <input
//         type="text"
//         placeholder="search"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <h2>No of products are: {products.length}</h2>
//     </>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await axios.get("/api/products/?search=" + search, {
            signal: controller.signal,
          });
          setProducts(response.data);
          setLoading(false);
        } catch (err) {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      })();
    }, 500); // Debounce delay in ms

    return () => {
      controller.abort(); // Cancel previous request
      clearTimeout(delayDebounce); // Clear debounce timeout
    };
  }, [search]);

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Welcome to the frontend</h1>
      <input
        type="search"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => <li key={index}>{product.name}</li>)
        ) : (
          <li>No products found</li>
        )}
      </ul>
      <h2>No of products are: {products.length}</h2>
    </>
  );
}

export default App;
