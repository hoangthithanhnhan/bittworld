"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "lang/useLang";
import { Sun, Moon, ChevronUp, ChevronDown } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    img: "/english.png",
  });
  const { t } = useLang();
  const [theme, setTheme] = useState("light");
  const toggleTheme = (newTheme: any) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  const languages = [
    { name: "Korean", img: "/korea.png" },
    { name: "English", img: "/english.png" },
  ];
  const handleSelectLanguage = (lang: { name: string; img: string }) => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
  };

  return (
    <header className="w-full bg-[#0C0C0C] text-white flex items-center justify-between px-5 py-2.5 fixed z-10">
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
            <button className="hidden sm:flex bg-transparent border-0 justify-center hover:cursor-pointer">
              <Image
                src="/setting.png"
                alt="Settings"
                width={22}
                height={22}
                className="border-none"
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="bg-black rounded-lg py-2 px-2 min-w-[200px] shadow-[0_0_1px_0px_#E6E9EC]"
          >
            <DropdownItem
              key="lang"
              className="text-white mb-4 text-sm font-bold flex items-center"
            >
              <Image
                src="/korea.png"
                alt="한국어"
                width={25}
                height={18}
                className="inline-block mr-2 object-cover -mb-1"
              />
              <span className=" inline-block">한국어</span>
            </DropdownItem>
            <DropdownItem
              key="light-theme"
              className="text-white flex items-center cursor-pointer justify-around"
              onClick={() => toggleTheme("light")}
            >
              <button
                className="border-none bg-transparent hover:cursor-pointer mr-7"
                onClick={() => toggleTheme("dark")}
              >
                <Moon
                  className={`mr-2 ${
                    theme === "dark" ? "text-white" : "text-[#E6E9EC]"
                  }`}
                />
              </button>
              <button
                className="border-none bg-transparent hover:cursor-pointer"
                onClick={() => toggleTheme("light")}
              >
                <Sun
                  className={`mr-2 ${
                    theme === "light" ? "text-white" : "text-[#E6E9EC]"
                  }`}
                />
              </button>
            </DropdownItem>
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
          {/* language selector */}
          <div
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center justify-between py-[0.875rem] text-xs relative"
          >
            <div className="flex items-center">
              <Image
                src={selectedLanguage.img}
                alt={selectedLanguage.name}
                width={18}
                height={18}
                className="inline-block mr-2 object-cover rounded-full"
              />
              <span className="mr-2">{selectedLanguage.name}</span>
            </div>
            <button className="border-none bg-transparent hover:cursor-pointer">
              {isLangOpen ? (
                <ChevronUp strokeWidth={1} width={18} height={18} />
              ) : (
                <ChevronDown strokeWidth={1} width={18} height={18} />
              )}
            </button>
          </div>

          {/* Language Dropdown */}
          {isLangOpen && (
            <div className="absolute w-full bg-primary left-0 px-4 z-10">
              {languages.map((lang, index) => (
                <>
                  <Link
                    href="#"
                    key={lang.name}
                    onClick={() => handleSelectLanguage(lang)}
                    className="flex items-center py-[0.875rem] text-xs text-white font-normal w-full"
                  >
                    <Image
                      src={lang.img}
                      alt={lang.name}
                      width={18}
                      height={18}
                      className="inline-block mr-2 object-cover rounded-full"
                    />
                    <span className="mr-2 text-xs">{lang.name}</span>
                  </Link>
                  <hr className={`${index==0 ? 'block' : 'hidden'} shadow-none`} />
                </>
              ))}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
