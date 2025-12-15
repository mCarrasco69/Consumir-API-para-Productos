import { toast } from "react-toastify";

export const validateProduct = (product) => {
  if (!product.title || !product.price || !product.category) {
    toast.warning("Todos los campos son obligatorios");
    return false;
  }
  if (isNaN(product.price) || product.price <= 0) {
    toast.warning("Precio inválido");
    return false;
  }
  return true;
};
