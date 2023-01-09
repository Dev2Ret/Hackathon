import { React, useState, useEffect } from "react";
import { useAccountsValueContext } from "@contexts/AccountsContext";

export default function Dashboard() {
  const accounts = useAccountsValueContext();

  async function fetchNfts() {

  }

  useEffect(() => {
    if (accounts.length > 0) {
      // 메타마스크로부터 성공적으로 연결되어 계정을 불러오게 되면 발동
      fetchNfts();
    }
  }, [accounts]);

  if(accounts.length > 0) {
    return <div>Dashboard</div>;
  } else {
    return <div>지갑이 연결되어 있지 않습니다.</div>;
  }

  
}
