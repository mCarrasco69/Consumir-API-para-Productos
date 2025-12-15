
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { fetchProducts } from "./utils/api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setForm({ 
      title: product.title, 
      price: product.price, 
      category: product.category 
    });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          CRUD Productos
        </h1>

        <ProductForm
          form={form}
          setForm={setForm}
          editingId={editingId}
          setEditingId={setEditingId}
          onProductSaved={loadProducts}
        />

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onProductDeleted={loadProducts}
          />
        )}
      </div>
    </div>
  );
}
