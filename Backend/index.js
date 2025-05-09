import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5000;
// Start server
app.get("/", (req, res) => {
  res.send("Welcome to the API server!");
});
app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Headphones",
      price: 2999,
      description: "Bluetooth headphones with noise cancellation.",
      category: "Electronics",
      inStock: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mouse",
      price: 1499,
      description: "Ergonomic gaming mouse with RGB lighting.",
      category: "Accessories",
      inStock: true,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Chair",
      price: 7499,
      description: "Comfortable mesh chair with adjustable height.",
      category: "Furniture",
      inStock: false,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Watch",
      price: 5999,
      description: "Smart watch with heart rate and fitness tracking.",
      category: "Wearables",
      inStock: true,
      rating: 4.3,
    },
  ];
  if (req.query.search) {
    const filteredProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    return res.json(filteredProducts);
  }
  setTimeout(() => {
    res.json(products);
  }, 2000);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
