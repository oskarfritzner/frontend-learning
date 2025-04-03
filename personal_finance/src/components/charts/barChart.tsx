'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTransactions } from '@/contexts/transactionContextType'
import { useCategories } from '@/contexts/categoryContext'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

//Interface
interface CategoryTotal {
    categoryId: string;
    name: string;
    total: number
}

interface CategoryTotals {
    [key: string]: CategoryTotal;
}

export default function BarChart() {
    const { transactions } = useTransactions();
    const { categories } = useCategories();

    const calculateCategoryTotals = () => {
        // First create the totals object with category names
        const categoryTotals = categories.reduce((totals, category) => {
            totals[category.id] = {
                categoryId: category.id,
                name: category.name,
                total: 0
            };
            return totals;
        }, {} as CategoryTotals);

        // Sum up transactions by matching categoryId
        transactions.forEach((transaction) => {
            // Check if we have this category and it's an expense
            if (categoryTotals[transaction.categoryId] && transaction.type === 'expense') {
                categoryTotals[transaction.categoryId].total += transaction.amount;
            }
        });

        // Convert to Chart.js format
        return {
            labels: Object.values(categoryTotals).map(cat => cat.name),
            data: Object.values(categoryTotals).map(cat => cat.total)
        };
    }

    // Get the calculated totals
    const { labels, data } = calculateCategoryTotals();

    // Chart configuration
    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Spending per Category (NOK)',
            data: data,
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',   // Teal
                'rgba(255, 99, 132, 0.5)',    // Pink
                'rgba(255, 205, 86, 0.5)',    // Yellow
                'rgba(54, 162, 235, 0.5)',    // Blue
                'rgba(153, 102, 255, 0.5)',   // Purple
                'rgba(255, 159, 64, 0.5)',    // Orange
            ],
            borderColor: [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className="w-full p-6 bg-card rounded-lg shadow-sm">
            <h4 className="mb-4">Spending by Category</h4>
            <Bar 
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: true,
                            text: 'Total Expenses by Category'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('no-NB', {
                                            style: 'currency',
                                            currency: 'NOK'
                                        }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return new Intl.NumberFormat('no-NB', {
                                        style: 'currency',
                                        currency: 'NOK'
                                    }).format(value as number);
                                }
                            }
                        }
                    }
                }}
            />
        </div>
    );
}