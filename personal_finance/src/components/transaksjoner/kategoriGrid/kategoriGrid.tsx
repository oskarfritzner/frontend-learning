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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-background p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">{category.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            {getCategoryTotal(category.id)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}