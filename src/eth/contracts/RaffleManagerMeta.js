export const RaffleManagerMeta = {
  address: "0x6355f6638e4a005c3bf94f1d0ffe7161072950bd",
  abi: [
    {
      inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
      name: "createAnotherContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "showAll",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "showAllAddrs",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "showAllContracts",
      outputs: [
        {
          internalType: "contract AnotherContract[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]
};
