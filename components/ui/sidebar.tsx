"use client";

import { ChartLine, Package2, Settings, ShoppingCart,User,Users } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import { useState } from "react";

const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link href={href}>
      <li className="flex flex-row items-center gap-4 hover:bg-primary-500 hover:text-basic-900 p-2 rounded-md">
        {icon}
        {label}
      </li>
    </Link>
  );
};

export default function Sidebar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const links = [
    { href: "/products", icon: <Package2 width={18} height={18}/>, label: "Products" },
    { href: "/analytics", icon: <ChartLine width={18} height={18}/>, label: "Analytics" },
    { href: "/orders", icon: <ShoppingCart width={18} height={18}/>, label: "Orders" },
    { href: "/customers", icon: <Users width={18} height={18}/>, label: "Customers" },
    { href: "/settings", icon: <Settings width={18} height={18}/>, label: "Settings" },
  ];
  return (
    <section className="flex flex-col gap-6 sticky left-0 top-0 h-screen shadow-md border-r border-ui-border">
      <header className="p-6 pb-2 border-b border-ui-border">
        <h1 className="text-basic-100 font-bold text-2xl mb-2">Future Store</h1>
        <span className="text-basic-300">Admin Panel</span>
      </header>
      <nav className="p-6 flex-1">
        <ul className="flex flex-col gap-4 text-basic-300 text-sm">
          {links.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </ul>
      </nav>
      <footer className="p-6 border-t border-ui-border">
        <button type="button" className={`hover:bg-basic-800 p-4 rounded-md flex flex-row gap-2 items-center text-left cursor-pointer relative ${isProfileDropdownOpen ? 'bg-basic-800 hover:bg-basic-800' : ''}`} onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
        {isProfileDropdownOpen && (
             <ProfileDropdown/>
        )}
        <User
          height={52}
          width={52}
          className={`bg-primary-500 rounded-full p-3 text-basic-900`}
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-basic-300">
            Admin user
          </span>
          <span className="text-basic-400 text-xs">admin@futurestore.com</span>
        </div>
        </button>
      </footer>
    </section>
  );
}
