"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Questions", href: "/dashboard/questions" },
    { name: "How it works", href: "/dashboard/how" },
    { name: "Upgrade", href: "/upgrade" },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-secondary shadow-sm">
      {/* Logo */}
      <Link href="/dashboard">
        <Image
          src="/logo.svg"
          width={80}
          height={50}
          alt="logo"
          className="cursor-pointer"
        />
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-all hover:text-primary hover:font-semibold ${
              path === link.href
                ? "text-primary font-semibold"
                : "text-gray-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* User */}
      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
}

export default Header;
