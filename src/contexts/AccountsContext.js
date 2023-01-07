import MetaMaskOnboarding from "@metamask/onboarding";
import { createContext, useContext, useState, useEffect } from "react";

const AccountsContext = createContext();

export const AccountsProvider = ({children}) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, []);

  return (
    <AccountsContext.Provider value={[accounts, setAccounts]}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccountsContext = () => {
  return useContext(AccountsContext);
};

export const useAccountsValueContext = () => {
  return useContext(AccountsContext)[0];
};

export const useAccountsSetContext = () => {
  return useContext(AccountsContext)[1];
};
