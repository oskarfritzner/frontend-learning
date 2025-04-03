import Link from "next/link";

export default function NavBar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/test">Test</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}