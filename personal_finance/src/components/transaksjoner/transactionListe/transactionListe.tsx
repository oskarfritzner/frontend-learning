'use client'

import { useTransactions } from "@/contexts/transactionContextType"
import { useCategories } from "@/contexts/categoryContext";

export default function TransactionListe() {

    const { transactions } = useTransactions();
    const { deleteTransaction } = useTransactions(); 
    const { categories } = useCategories();


    const handleDeleteTransaction = (transactionId: string) => {
        return deleteTransaction(transactionId)
    }


    const getCategoryName = (categoryId: string) => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.name : 'Unknown Category'
        
    }

    // Add console.log to see what we're working with
    console.log("Original transactions:", transactions);

    // Sort transactions by date (oldest first)
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log("Sorted transactions:", sortedTransactions);

     
    return (
        <div className="w-full h-full">
            <h4 className="mb-4">TransactionListe</h4>
                <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                    Desc
                                </th>
                                <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                    Cat
                                </th>
                                <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                    Date
                                </th>
                                <th className="p-2 md:p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                                    NOK
                                </th>
                                <th className="w-8 p-2 md:p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                            {sortedTransactions.map((transaction) => (
                                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="p-2 md:p-3 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {transaction.description}
                                    </td>
                                    <td className="p-2 md:p-3 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {getCategoryName(transaction.categoryId)}
                                    </td>
                                    <td className="p-2 md:p-3 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                        }).format(new Date(transaction.date))}
                                    </td>
                                    <td className="p-2 md:p-3 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {transaction.amount}
                                    </td>
                                    <td className="p-2 md:p-3 whitespace-nowrap">
                                        <button 
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            ×
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}