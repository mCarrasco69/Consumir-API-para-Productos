const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchProducts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error fetching products");
    const data = await res.json();
    // Mapear los datos para que tengan el formato esperado (title, price, category)
    return data.slice(0, 12).map(item => ({
      id: item.id,
      title: item.title,
      price: (item.id * 10.5).toFixed(2),
      category: `Category ${Math.ceil(item.id / 3)}`
    }));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        body: product.category,
        userId: 1
      }),
    });
    if (!res.ok) throw new Error("Error creating product");
    const data = await res.json();
    return {
      id: data.id,
      title: data.title,
      price: product.price,
      category: data.body
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: product.title,
        body: product.category,
        userId: 1
      }),
    });
    if (!res.ok) throw new Error("Error updating product");
    const data = await res.json();
    return {
      id: data.id,
      title: data.title,
      price: product.price,
      category: data.body
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error deleting product");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
