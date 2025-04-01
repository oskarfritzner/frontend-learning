"use client";

import { Category, defaultCategories } from "@/types/categories";
import { createContext, useState, useContext } from "react";

type CategoryContextType = {
  // Data
  categories: Category[];
  // Actions
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, category: Category) => void;
  // Ui state
  isLoading: boolean;
  error: string | null;
};

// Oppretter context

const CategoryContext = createContext<CategoryContextType | null>(null);

// Oppretter provider

function CategoryProvider({ children }: { children: React.ReactNode }) {
  // State
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // action
  const addCategory = async (category: Category) => {
    setIsLoading(true);
    setError(null);
    try {
      setCategories((prev) => [...prev, category]);
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Failed to add category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Deletes a category by its ID from the categories state
   * @param id - The unique identifier of the category to delete
   * @returns A Promise that resolves when the deletion is complete
   */
  const deleteCategory = async (id: string) => {
    // Set loading state to true to show user that operation is in progress
    setIsLoading(true);

    try {
      // Update categories state by filtering out the category with matching id
      // Using functional update pattern to ensure we have the latest state
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error: unknown) {
      // Handle any errors that occur during the deletion process
      // If it's a standard Error object, use its message, otherwise use default message
      setError(
        error instanceof Error ? error.message : "Failed to delete category"
      );
    } finally {
      // Always reset loading state, regardless of success or failure
      setIsLoading(false);
    }
  };

  const updateCategory = (id: string, category: Category) => {
    // Implementation of updateCategory function
    // Setter is loading state to true to show user that operation is in progress
    setIsLoading(true);
    try {
      setCategories((prev) => prev.map((c) => (c.id === id ? category : c)));
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Failed to update category"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    categories,
    addCategory,
    deleteCategory,
    updateCategory,
    isLoading,
    error,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}

export { CategoryProvider, useCategories };
export default CategoryContext;
