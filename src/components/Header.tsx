"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "lang/useLang";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  return (
    <header className="w-full bg-[#0C0C0C] text-white flex items-center justify-between px-5 py-2.5 fixed">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={146}
          height={32}
          className="hidden sm:flex object-contain mr-[60px]"
        />
        <Image
          src="/logo-mobile.png"
          alt="Logo"
          width={23}
          height={30}
          className="object-contain sm:hidden"
        />
        <nav className="hidden sm:flex space-x-[30px] md:space-x-[60px] text-sm">
          <Link href="#" className="font-normal text-white">
            Guide
          </Link>
          <Link href="#" className="font-normal text-white">
            Rewards
          </Link>
          <Link href="#" className="font-normal text-white">
            BITTWORLD DEX
          </Link>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 justify-center">
        <Dropdown>
          <DropdownTrigger>
            <button className="hidden sm:flex bg-transparent border-0 justify-center">
              <Image
                src="/setting.png"
                alt="Settings"
                width={22}
                height={22}
                className="border-none"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" className="bg-black">
            <DropdownItem key="lang" className="text-white flex items-center"><Image src="/korea.png" alt="한국어" width={18} height={18} className="inline-block mr-2 object-cover" />한국어</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <button className="bg-primary text-white border-none px-2 py-1 rounded-lg text-sm font-medium">
          Connect
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent text-white border-none p-0 rounded-lg text-sm font-medium flex justify-center sm:hidden"
        >
          <Image
            src="/nav-mobile.png"
            alt="Navigation"
            width={20}
            height={20}
            className="border-none"
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <nav className="absolute left-0 right-0 top-full mt-0 w-full bg-white text-gray-800 shadow-lg px-4 sm:hidden">
          <Link
            href="#"
            className="py-[0.875rem] text-xs text-black hover:bg-gray-100 flex items-center"
          >
            <Image
              src="/Guide.png"
              alt="Guide"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            Guide
          </Link>
          <hr />
          <Link
            href="#"
            className="flex items-center py-[0.875rem] text-xs text-black hover:bg-gray-100"
          >
            <Image
              src="/Rewards.png"
              alt="Rewards"
              width={14}
              height={14}
              className="inline-flex items-center mr-2"
            />
            Rewards
          </Link>
          <hr />
          <Link
            href="#"
            className="flex items-center py-[0.875rem] text-xs text-black hover:bg-gray-100"
          >
            <Image
              src="/Bittworld.png"
              alt="BITTWORLD DEX"
              width={14}
              height={14}
              className="inline-block mr-2"
            />
            BITTWORLD DEX
          </Link>
          <hr />
          <div className="flex items-center py-[0.875rem] text-xs">
            <Image
              src="/english.png"
              alt="English"
              width={18}
              height={18}
              className="inline-block mr-2"
            />
            <span className="mr-2">English</span>
          </div>
        </nav>
      )}
    </header>
  );
}
