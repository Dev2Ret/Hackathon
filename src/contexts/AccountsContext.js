import MetaMaskOnboarding from "@metamask/onboarding";
import { createContext, useContext, useState, useEffect } from "react";

const AccountsContext = createContext();

export const AccountsProvider = ({children}) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }

    function handleChainChanged(chainId) {
      // TODO 체인 변경에 대한 올바른 계정 처리 필요
      setAccounts([]);
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      window.ethereum.on("chainChanged", handleChainChanged);
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
