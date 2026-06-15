import { useState, useEffect } from "react";
import { Product } from "@/types";
import { api } from "@/services/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
    } catch {
      setError("Erro ao carregar produtos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Mudamos o Omit para remover "_id"
  async function addProduct(product: Omit<Product, "_id">) {
    try {
      const response = await api.post<Product>("/products", product);
      setProducts(prev => [...prev, response.data]);
    } catch {
      setError("Erro ao adicionar produto");
    }
  }

  async function updateProduct(
    id: string,
    updatedProduct: Omit<Product, "_id">
  ) {
    try {
      const response = await api.put<Product>(`/products/${id}`, updatedProduct);

      setProducts(prev =>
        prev.map(product =>
          product._id === id ? response.data : product // Comparação com _id
        )
      );
    } catch {
      setError("Erro ao atualizar produto");
    }
  }

  async function deleteProduct(id: string) {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id)); // Filtro com _id
    } catch {
      setError("Erro ao remover produto");
    }
  }

  return {
    products,
    isLoading,
    error,
    reload: loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
}