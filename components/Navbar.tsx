
"use client";
import Link from "next/link";
import logo from '@/assets/logo.png'
import Image from "next/image";
export default function Navbar() {
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Linked In", href: "/contact" },
    { label: "Github", href: "/contact" },
  ];

  return (
    <nav className="w-full px-[5%] flex justify-between items-center p-4 bg-background">
         <div className="[font-family:var(--font-amelaryas)] text-[20px] font-black">
          <Link href="/" className="group relative inline-flex items-center cursor-pointer ">
          {/* <Image src={logo} alt="logo" className=" h-8 w-8 inline-block transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 mr-2" /> */}

            <span >Nandini</span>
            <span className="inline-block transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ml-2">
              das
            </span>
          </Link>
         </div>
        <ul className="flex space-x-3 text-[16px] font-medium [font-family:var(--font-montreal)]">
            {navItems.map((item) => (
            <li key={item.label}>
                <Link href={item.href}>
                <span className="group relative block h-[20px] overflow-hidden cursor-pointer">
                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {item.label}
                    </span>

                    <span className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {item.label}
                    </span>
                </span>
                </Link>
            </li>
            ))}
        </ul>
    </nav>
  );
}