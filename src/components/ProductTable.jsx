import { toast } from "react-toastify";
import { deleteProduct } from "../utils/api";

export default function ProductTable({ products, onEdit, onProductDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      toast.success("Producto eliminado");
      onProductDeleted();
    } catch {
      toast.error("Error al eliminar producto");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Precio</th>
            <th className="p-3 text-left">Categoría</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{product.title}</td>
                <td className="p-3">${parseFloat(product.price).toFixed(2)}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
