"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white flex items-center justify-between px-5 py-2.5">

      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={146} height={32} className="hidden sm:flex object-contain mr-[60px]"/>
        <Image src="/logo-mobile.png" alt="Logo" width={23} height={30} className="object-contain sm:hidden" />
        <nav className="hidden sm:flex space-x-[30px] md:space-x-[60px] text-sm">
            <Link href="#" className="font-normal text-white">Guide</Link>
            <Link href="#" className="font-normal text-white">Rewards</Link>
            <Link href="#" className="font-normal text-white">BITTWORLD DEX</Link>
        </nav>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 justify-center">
        <button
          className="hidden sm:flex bg-transparent border-0 justify-center"
        >
          <Image src="/setting.png" alt="Settings" width={22} height={22} className="border-none"/>
        </button>
        <button
          className="bg-primary text-white border-none px-2 py-1 rounded-lg text-sm font-medium"
        >
          Connect
        </button>
        <button
           onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent text-white border-none p-0 rounded-lg text-sm font-medium flex justify-center sm:hidden"
        >
          <Image src="/nav-mobile.png" alt="Navigation" width={20} height={20} className="border-none"/>
        </button>
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute top-full right-5 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-2 sm:hidden">
          <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
            <Image src="/Guide.png" alt="Guide" width={16} height={16} className="inline-block mr-2" />
            Guide
          </Link>
          <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
            <Image src="/Rewards.png" alt="Rewards" width={16} height={16} className="inline-block mr-2" />
            Rewards
          </Link>
          <Link href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
            <Image src="/Bittworld.png" alt="BITTWORLD DEX" width={16} height={16} className="inline-block mr-2" />
            BITTWORLD DEX
          </Link>
          <div className="flex items-center px-4 py-2 text-sm">
            <span className="mr-2"> English</span>
          </div>
        </nav>
      )}
    </header>
  );
}
