import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/" className="hover:text-blue-200">Home</Link>
            <Link href="/about" className="hover:text-blue-200">About</Link>
            <Link href="/member" className="hover:text-blue-200">Member</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/admin" className="hover:text-blue-200">Admin</Link>
        </nav>
    );
}