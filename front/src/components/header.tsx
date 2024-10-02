"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import du hook usePathname
import Image from "next/image";
import Link from "next/link";
import logo from "../public/assets/logo.svg";
import userIconWhite from "../public/assets/user_white.svg";
import userIconBlack from "../public/assets/user_black.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Utilisation du hook usePathname
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Ferme le dropdown si on clique en dehors
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoie l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ferme le dropdown lorsque le pathname change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header>
      <nav className="flex justify-between p-2 items-center border-b border-grey">
        <Link href="/">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="Autolog logo"
            className="w-32 h-auto"
          />
        </Link>
        <div ref={dropdownRef} className="flex flex-col items-end">
          <Image
            src={isAuthenticated ? userIconBlack : userIconWhite}
            width={40}
            height={40}
            alt="user not connected logo"
            role="button"
            onClick={handleClick}
            className="cursor-pointer w-10 h-auto"
          />
          {isOpen && (
            <ul className="absolute bg-white border border-grey cursor-pointer text-base mt-14 w-52 rounded py-2">
              <li>
                <Link
                  href="/login"
                  className="block hover:bg-blue hover:text-white p-2"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="block hover:bg-blue hover:text-white p-2"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
