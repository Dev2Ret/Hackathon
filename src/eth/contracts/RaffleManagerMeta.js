export const RaffleManagerMeta = {
  address: "0x69c63114B54CC7987F81Cdc8D86AB4750F9afFFE",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "raffleOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "nftTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "nftTokenType",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "expiredAt",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "ticketCap",
          type: "uint16",
        },
        {
          indexed: false,
          internalType: "uint32",
          name: "ticketPrice",
          type: "uint32",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "ticketPricePointer",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "address",
          name: "raffleAddress",
          type: "address",
        },
      ],
      name: "NFTRaffleCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "checkExpiredRaffles",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "closeRaffle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "raffleOwner",
          type: "address",
        },
        {
          internalType: "address",
          name: "nftContract",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "nftTokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "nftTokenType",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expiredAt",
          type: "uint256",
        },
        {
          internalType: "uint16",
          name: "ticketCap",
          type: "uint16",
        },
        {
          internalType: "uint32",
          name: "ticketPrice",
          type: "uint32",
        },
        {
          internalType: "uint8",
          name: "ticketPricePointer",
          type: "uint8",
        },
      ],
      name: "createRaffle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deleteRaffle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getRaffles",
      outputs: [
        {
          internalType: "contract Raffle[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
