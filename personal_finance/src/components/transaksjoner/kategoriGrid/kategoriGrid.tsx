'use client'

import { useCategories } from "@/contexts/categoryContext";
import { useTransactions } from "@/contexts/transactionContextType";

export default function KategoriGrid() {
    const { categories } = useCategories();
    const { transactions } = useTransactions();

    const getCategoryTotal = (categoryId: string) => { 

        const categoryTotal = transactions.reduce((total, transaction) => {
            if (transaction.categoryId === categoryId) {
                return total + transaction.amount;
            }
            return total;
        }, 0);
        return categoryTotal;
    }


    
    return (
        <div>
            <div className="flex flex-col">
                <h4 className="mb-4">
                    Category Totals
                </h4>
                <div className="grid">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-background p-4 rounded-lg shadow-md">
                            <h4 className="font-bold text-sm text">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">
                                {getCategoryTotal(category.id)}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}