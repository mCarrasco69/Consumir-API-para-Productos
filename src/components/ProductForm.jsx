import { toast } from "react-toastify";
import { validateProduct } from "../utils/validation";
import { createProduct, updateProduct } from "../utils/api";

export default function ProductForm({ form, setForm, editingId, setEditingId, onProductSaved }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateProduct(form)) return;

    try {
      if (editingId) {
        await updateProduct(editingId, form);
        toast.success("Producto actualizado");
      } else {
        await createProduct(form);
        toast.success("Producto creado");
      }
      setForm({ title: "", price: "", category: "" });
      setEditingId(null);
      onProductSaved();
    } catch {
      toast.error("Error al procesar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Actualizar Producto" : "Crear Producto"}
      </h2>
      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Nombre del producto"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Precio"
        name="price"
        type="number"
        step="0.01"
        value={form.price}
        onChange={handleChange}
      />
      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Categoría"
        name="category"
        value={form.category}
        onChange={handleChange}
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700">
        {editingId ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}
