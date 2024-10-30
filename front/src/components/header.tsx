"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/assets/logo.svg";
import userIconWhite from "../public/assets/user_white.svg";
import userIconBlack from "../public/assets/user_black.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearToken } from "../../store/authSlice";
import { clearUser } from "../../store/userSlice";
import { logout } from "../../services/apiUser";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Récupérer l'état d'authentification depuis le store Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const isAdmin = useSelector((state: RootState) => state.user.userAdminStatus);

  // Gérer l'ouverture et la fermeture du dropdown
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

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearToken()); // Déconnexion du state Redux
      dispatch(clearUser());
      setIsOpen(false);
      router.replace("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Log out error:", error.message); // Log the error
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

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
            <ul className="absolute bg-white border border-grey cursor-pointer text-greydark mt-14 w-52 rounded py-2">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="block hover:bg-blue hover:text-white p-2"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={isAdmin ? "/admin" : "/dashboard"}
                      className="block hover:bg-blue hover:text-white p-2"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block text-left w-full hover:bg-blue hover:text-white p-2"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
