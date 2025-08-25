"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="w-full bg-black text-white flex items-center justify-between px-5 py-2.5">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={146} height={32} style={{ objectFit: "contain" , marginRight: "60px" }} />
        <nav className="hidden md:flex space-x-[60px] text-sm">
            <Link href="#" className="font-normal text-white">Guide</Link>
            <Link href="#" className="font-normal text-white">Rewards</Link>
            <Link href="#" className="font-normal text-white">BITTWORLD DEX</Link>
        </nav>
      </div>
      

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          className="bg-transparent border-0"
        >
          <Image src="/setting.png" alt="Settings" width={22} height={22} className="border-none"/>
        </button>
        <button
          onClick={() => setIsConnected(!isConnected)}
          className="bg-primary text-white border-none px-2 py-1 rounded-lg text-sm font-medium"
        >
          {isConnected ? "Connected" : "Connect"}
        </button>
      </div>
    </header>
  );
}
