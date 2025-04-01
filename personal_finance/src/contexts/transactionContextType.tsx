"use client";

import { Transaction } from "@/types/finances/transaction";
import { createContext, useContext, useState, useEffect } from "react";

// 1. CONTEXT TYPE DEFINITION
// Dette er kontrakten for hva context-en vår skal inneholde
type TransactionContextType = {
    // Data som skal være tilgjengelig for alle komponenter som bruker contexten
    transactions: Transaction[]; // Array med transaksjoner

    // Actions - Funksjoner som komponenter kan bruke for å endre data
    // Disse funksjonene oppfører seg som et "public API til vår context"
    addTransaction: (transaction: Transaction) => void // Legge til en ny transaskjon til transactions arrayet
    deleteTransaction: (id: string) => void // Slette en transaksjon fra transactions arrayet
    updateTransaction: (id: string, transaction: Transaction) => void // Oppdatere en transaksjon i transactions arrayet

    // Ui state som er relevant på tvers av komponenter
    isLoading: boolean; // Viser om data lastes
    error: string | null; // Holder evnt.feilmeldinger
}

// 2. Oppretter context-en
// Denne er tom til å starte med, men til å bli fylt opp av provider-komponenten siden Typescript vet at den må wrappes i en provider

const TransactionContext = createContext<TransactionContextType | null>(null)

// 3. Oppretter en provider komponent
// Dette er komponenten som faktisk leverer data til alle komponenter som trenger det. Den er ansvarlig for å håndtere state og all logikk
function TransactionProvider({ children }: { children: React.ReactNode }) {
    
    // State management
    // Holder all data som skal deles mellom komponenter
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Actions (CRUD operations)
    // Funksjoner som komponenter kan kalle for å endre data. 
    const addTransaction = async (transaction: Transaction) => {
        setIsLoading(true)
        setError(null)
        try {
            const newTransactions = [...transactions, transaction]
            setTransactions(newTransactions)
            localStorage.setItem('transactions', JSON.stringify(newTransactions))
            // Her kan vi legge til API kall senere
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to add transaction')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteTransaction = async (id: string) => {
        setIsLoading(true)
        setError(null)
        try {
            setTransactions(prev => prev.filter((transaction) => transaction.id !== id))
            localStorage.setItem('transactions', JSON.stringify(transactions))
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to delete transaction')
        } finally {
            setIsLoading(false)
        }
    }

    const updateTransaction = async (id: string, transaction: Transaction) => {
        setIsLoading(true)
        setError(null)
        try {
            setTransactions(prev =>
                prev.map(t => t.id === id ? transaction : t)
            )
            localStorage.setItem('transactions', JSON.stringify(transactions))
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Failed to update transaction')
        } finally {
            setIsLoading(false)
        }
    }

    // Context VALUE
    // Samler alt som skal være tilgjengelig for andre komponenter 
    const value = {
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,// Temporary fix for type error
        isLoading,
        error
    }

    // UseEffect som kjører på første load av komponenten. Henter transaksjoner fra localStorage og setter dem i state

    useEffect(() => {
        const savedTransactions = localStorage.getItem('transactions')
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions))
        }
    }, []);

    // Provider WRAPPER
    // Gjør value tilgjengelig for all child komponenter
    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
    
}

// Custom hook for å bruke context-en
function useTransactions() {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider')
    }
    return context
}

export { TransactionProvider, useTransactions }
export default TransactionContext; 