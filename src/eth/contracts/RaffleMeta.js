export const RaffleMeta = {
  address: "0x8f79eD685c89719c1aa283e6c606653D954e3d50",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_expiredAt",
          type: "uint256",
        },
        {
          internalType: "uint16",
          name: "_ticketCap",
          type: "uint16",
        },
        {
          internalType: "uint32",
          name: "_ticketPrice",
          type: "uint32",
        },
        {
          internalType: "uint8",
          name: "_ticketPricePointer",
          type: "uint8",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getExpiredAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPurchases",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "purchaser",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tickets",
              type: "uint256",
            },
          ],
          internalType: "struct Raffle.Purchase[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getRaffle",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "",
          type: "bytes",
        },
      ],
      name: "onERC721Received",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "purchaser",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tickets",
          type: "uint256",
        },
      ],
      name: "purchaseTickets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
