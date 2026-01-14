import { useState, useEffect } from 'react';
import { Product } from '@/types';

const STORAGE_KEY = 'restaurant_products';

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Hambúrguer Artesanal',
    description: 'Blend de 180g, queijo cheddar, bacon crocante, alface e molho especial',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mozzarella de búfala, manjericão fresco e azeite',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Açaí Premium',
    description: 'Açaí batido com banana, granola, leite em pó e mel',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Salada Caesar',
    description: 'Alface romana, croutons, parmesão e molho caesar caseiro',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Suco Natural',
    description: 'Suco de laranja natural, 500ml',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'Brownie com Sorvete',
    description: 'Brownie de chocolate belga com sorvete de creme e calda quente',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&h=400&fit=crop'
  }
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    }
    setIsLoading(false);
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    saveProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Omit<Product, 'id'>) => {
    const newProducts = products.map(p => 
      p.id === id ? { ...updatedProduct, id } : p
    );
    saveProducts(newProducts);
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter(p => p.id !== id));
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
