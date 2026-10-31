import Link from "next/link";
import AdminLink from "./AdminLink";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mx-auto py-6 px-4 bg-blue-900 w-full">
      <div className="text-2xl font-bold text-white ">T3 Academy</div>
      <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <li>
          <Link
            href="/"
            className="hover:text-gray-400 cursor-pointer shadow-lg text-white hover:underline"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/about_us"
            className="hover:text-gray-400 cursor-pointer shadow-lg text-white hover:underline"
          >
            About Us
          </Link>
        </li>

        <li>
          <Link
            href="/contact_us"
            className="hover:text-gray-400 cursor-pointer shadow-lg text-white hover:underline"
          >
            Contact Us
          </Link>
        </li>

        <li>
          <Link href="/curricular" className="hover:text-gray-400 cursor-pointer shadow-lg text-white hover:underline"> Extra-Curricular</Link>
         
        </li>

        <li>
          <AdminLink />
        </li>
      </ul>
    </nav>
  );
}
