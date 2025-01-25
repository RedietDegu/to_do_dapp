import CustomizedModal from "./ConnectWalletModal";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/store/appStore";

export default function NavBar() {
  const { client, session, setSession, setLogout, logout } = useStore();
  const { toggleTheme, theme } = useStore();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    setSession(undefined);
    await logout();
  };

  const navLinks = [{ path: "/tasks", label: "My Tasks" }];

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center space-x-2"
            >
              <Image
                src="/dev.png"
                alt="Logo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <h1 className="font-extrabold text-white text-2xl">
                Task Management
              </h1>
            </Link>

            <div className="hidden sm:flex sm:ml-10 sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    pathname === link.path
                      ? "border-b-4 border-white text-white"
                      : "text-gray-200 hover:text-white"
                  } inline-flex items-center px-3 py-2 text-lg font-medium transition duration-200`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!session ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition-all duration-200"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={() => handleLogout()}
                className="bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-500 transition-all duration-200"
              >
                Disconnect Wallet
              </button>
            )}

            <CustomizedModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onLogin={handleLogin}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
