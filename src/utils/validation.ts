import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  price: string | number;
  category: string;
}

export const validateProduct = (product: Partial<Product>): boolean => {
  if (!product.title || product.title.trim() === "") {
    toast.error("El nombre del producto es requerido");
    return false;
  }
  if (!product.price || parseFloat(String(product.price)) <= 0) {
    toast.error("El precio debe ser mayor a 0");
    return false;
  }
  if (!product.category || product.category.trim() === "") {
    toast.error("La categoría es requerida");
    return false;
  }
  return true;
};
