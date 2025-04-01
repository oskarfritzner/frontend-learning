"use client";

import { useCategories } from "@/contexts/categoryContext"
import { useTransactions } from "@/contexts/transactionContextType";
import { v4 as uuidv4 } from "uuid";
import { FormEvent, useState } from "react";
import { Transaction } from "@/types/finances/transaction";
import { TransactionType } from "@/types/finances/transaction";


export default function CreateTransactionForm() {
    // Henting av funksjoner fra contexter 

    //Kategorier som skal vises i dropdown
    const { categories } = useCategories();
    const {addTransaction } = useTransactions();
    
    // Setter op state for å håndtere input
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        description: "",
        categoryId: "",
        type: "",
    })

    // Håndterer input endringer
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // Håndterer form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted!', formData);
        
        // Create transaction object
        const newTransaction: Transaction = {
            id: uuidv4(),
            amount: Number(formData.amount),
            date: new Date(formData.date),
            description: formData.description,
            categoryId: formData.categoryId,
            type: formData.type as TransactionType,
            createdAt: new Date(),
            updatedAt: new Date(),
        }; 
        console.log('New transaction:', newTransaction);

        try {
            await addTransaction(newTransaction);
            console.log('Transaction added successfully!');
            // reset form
            setFormData({
                amount: "",
                date: "",
                description: "",
                categoryId: "",
                type: "",
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

         
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">New Transaction</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div className="space-y-2">
                    <label 
                        htmlFor="amount" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter amount"
                    />
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                    <label 
                        htmlFor="date" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                    <label 
                        htmlFor="description" 
                        className="text-sm font-medium leading-none"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter description"
                    />
                </div>

                {/* Type Select */}
                <div className="space-y-2">
                    <label 
                        htmlFor="type" 
                        className="text-sm font-medium leading-none"
                    >
                        Type
                    </label>
                    <select
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="">Select type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                    <label 
                        htmlFor="categoryId" 
                        className="text-sm font-medium leading-none"
                    >
                        Category
                    </label>
                    <select
                        id="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Create Transaction
                </button>
            </form>
        </div>
    )
}