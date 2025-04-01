import DashboardLayout from "@/components/dashboard/dashboardLayout";

export default function Dashboard() {
    return (
        <div className="w-full h-screen">
            <header className="bg-background text-foreground p-4 top-0 left-0 right-0 border-b border-border text-center">
                <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
            </header>
            <DashboardLayout />
        </div>
    )
}