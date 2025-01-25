"use client";
import React, { useState } from "react";
import {
  createKeyStoreInteractor,
  createSessionStorageLoginKeyStore,
  createSingleSigAuthDescriptorRegistration,
  createWeb3ProviderEvmKeyStore,
  hours,
  registerAccount,
  registrationStrategy,
  ttlLoginRule,
} from "@chromia/ft4";
import { getRandomUserName } from "@/app/user";
import { CustomizedModalProps } from "./types";
import { useStore } from "@/store/appStore";
declare global {
  interface Window {
    ethereum: any;
  }
}

export default function CustomizedModal({
  isOpen,
  onClose,
  onLogin,
}: CustomizedModalProps) {
  const { client, setSession, session } = useStore();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  const initSession = async () => {
    if (!client) {
      return;
    }
    if (!window.ethereum) {
      return;
    }
    // 2. Connect with MetaMask
    const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);

    // 3. Get all accounts associated with evm address
    const { getAccounts, login } = createKeyStoreInteractor(
      client,
      evmKeyStore
    );
    const accounts = await getAccounts();
    if (accounts.length > 0) {
      const { session, logout } = await login({
        accountId: accounts[0].id,
        config: {
          flags: ["MySession"],
          rules: ttlLoginRule(hours(1)),
        },
        // loginKeyStore: createSessionStorageLoginKeyStore(),
      });
      setSession(session);
    } else {
      // 5. Create a new account by signing a message using metamask
      const authDescriptor = createSingleSigAuthDescriptorRegistration(
        ["A", "T"],
        evmKeyStore.id
      );
      const { session } = await registerAccount(
        client,
        evmKeyStore,
        registrationStrategy.open(authDescriptor, {
          config: {
            rules: ttlLoginRule(hours(2)),
            flags: ["MySession"],
          },
        }),
        {
          name: "register_user",
          args: [getRandomUserName()],
        }
      );
      setSession(session);
    }
  };

  const handleConnect = () => {
    if (selectedWallet) {
      initSession().catch(console.error);
      localStorage.setItem("selectedWallet", selectedWallet);
      onLogin(selectedWallet);
    }
  };

  const getButtonClass = (wallet: string) =>
    `w-full flex items-center p-3 text-base font-semibold text-white rounded-xl ${
      selectedWallet === wallet
        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        : "bg-gray-800 hover:bg-gray-700"
    } group hover:shadow-lg transition-all ease-in-out`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-500 p-6 rounded-lg shadow-lg mb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-sm p-6 ">
          <h5 className="mb-4 text-2xl text-center font-bold text-white">
            Connect Your Wallet
          </h5>
          <p className="text-sm font-medium text-gray-200 text-center mb-6">
            Select Wallet bellow{" "}
          </p>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleWalletSelect("MetaMask")}
                className={`justify-between ${getButtonClass("MetaMask")}`}
              >
                <div className="flex items-center space-x-3">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6"
                    viewBox="0 0 40 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z"
                      fill="#E17726"
                    />
                    <path
                      d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                      fill="#E27625"
                    />
                    {/* Other SVG paths */}
                  </svg>
                  <span className="font-medium text-white">MetaMask</span>
                </div>
                <span className="text-xs text-gray-300">Connect</span>
              </button>
            </li>
            {/* Add more wallet options similarly */}
          </ul>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConnect}
              className="px-6 py-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 text-white font-bold rounded-xl hover:bg-opacity-80 transition-all"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
