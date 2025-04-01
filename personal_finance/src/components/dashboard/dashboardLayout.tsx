import { CategoryProvider} from "@/contexts/categoryContext";
import { TransactionProvider } from "@/contexts/transactionContextType";
import CreateTransactionForm from "../transaksjoner/transactions/createTransactionForm.tsx/createTransactionForm";
import { ThemeToggle } from "../ThemeToggle";
import KategoriGrid from "../transaksjoner/kategoriGrid/kategoriGrid";
import TransactionListe from "../transaksjoner/transactionListe/transactionListe";
export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <CategoryProvider>
                <TransactionProvider>
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className=" flex justify-between items-center">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <div className="flex items-center gap-2">
                                <ThemeToggle />
                            </div>
                        </div>
                        {/*Stats */}

                        {/*Main content grids */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <CreateTransactionForm />
                            <KategoriGrid />
                            <TransactionListe />
                        </div>
                    </div>
                </TransactionProvider>
            </CategoryProvider>
        </div>
    )
}