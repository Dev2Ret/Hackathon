export const RaffleManagerMeta = {
  address: "0xa1fDe45Bc7181eC001980Aca4e9745E7025d96a6",
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
          internalType: "uint256",
          name: "ticketPrice",
          type: "uint256",
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
      inputs: [
        {
          internalType: "address",
          name: "raffleAddr",
          type: "address",
        },
      ],
      name: "closeRaffle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
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
          internalType: "uint256",
          name: "ticketPrice",
          type: "uint256",
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
      inputs: [
        {
          internalType: "address",
          name: "raffleOwner",
          type: "address",
        },
      ],
      name: "getRaffleDetailsByOwner",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "raffleContract",
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
              internalType: "string",
              name: "nftName",
              type: "string",
            },
            {
              internalType: "string",
              name: "nftSymbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "nftTokenURI",
              type: "string",
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
              internalType: "uint16",
              name: "soldTickets",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "ticketPrice",
              type: "uint256",
            },
            {
              internalType: "uint32",
              name: "index",
              type: "uint32",
            },
            {
              internalType: "uint8",
              name: "state",
              type: "uint8",
            },
          ],
          internalType: "struct RaffleManager.RaffleDetail[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "raffleOwner",
          type: "address",
        },
      ],
      name: "getRaffleNFTsByOwner",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "state",
              type: "uint8",
            },
          ],
          internalType: "struct RaffleManager.SimpleRaffle[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
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
    {
      inputs: [
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "itemNums",
          type: "uint256",
        },
      ],
      name: "getRafflesByIndex",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "raffleContract",
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
              internalType: "string",
              name: "nftName",
              type: "string",
            },
            {
              internalType: "string",
              name: "nftSymbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "nftTokenURI",
              type: "string",
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
              internalType: "uint16",
              name: "soldTickets",
              type: "uint16",
            },
            {
              internalType: "uint256",
              name: "ticketPrice",
              type: "uint256",
            },
            {
              internalType: "uint32",
              name: "index",
              type: "uint32",
            },
            {
              internalType: "uint8",
              name: "state",
              type: "uint8",
            },
          ],
          internalType: "struct RaffleManager.RaffleDetail[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nft",
          type: "address",
        },
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "transferERC721",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ],
};
