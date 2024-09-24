"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/assets/logo.svg";
import userIconWhite from "../public/assets/user_white.svg";

const Header: FC = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Ferme le dropdown
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoie l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header>
      <nav className="flex justify-between p-2 items-center border-b border-grey">
        <Link href="/">
          <Image src={logo} width={100} height={100} alt="Autolog logo"></Image>
        </Link>
        <div ref={dropdownRef} className="flex flex-col items-end">
          <Image
            src={userIconWhite}
            width={40}
            height={40}
            alt="user not connected logo"
            role="button"
            onClick={handleClick}
            className="cursor-pointer"
          />
          {isOpen && (
            <ul className="absolute border-solid border border-black cursor-pointer text-base mt-14 w-52 rounded py-2">
              <Link href="/register">
                <li className="hover:bg-blue hover:text-white p-2">Sign In</li>
              </Link>
              <Link href="/login">
                <li className="hover:bg-blue hover:text-white p-2">Sign Up</li>
              </Link>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
