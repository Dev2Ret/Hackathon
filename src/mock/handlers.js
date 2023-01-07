import { rest } from "msw";
import Web3 from "web3";

const raffle1 = {
  contractId: "0x0123456789abcdef1",
  nft: {
    name: "COOL CAT #6337",
    image:
      "http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg",
    chain: {
      id: 1,
      symbol: "eth",
    },
  },
  ended: 1673592239,
  ticketPrice: 0.1,
  totalTicketNum: 100,
};

const raffle2 = {
  contractId: "0x0123456789abcdef2",
  nft: {
    name: "DOODLE #8761",
    image:
      "http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg",
    chain: {
      id: 1,
      symbol: "eth",
    },
  },
  ended: 1673592239,
  ticketPrice: 0.2,
  totalTicketNum: 200,
};

const raffle3 = {
  contractId: "0x0123456789abcdef3",
  nft: {
    name: "MAYC #18144",
    image:
      "http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg",
    chain: {
      id: 1,
      symbol: "eth",
    },
  },
  ended: 1673592239,
  ticketPrice: 0.1,
  totalTicketNum: 50,
};

const raffle4 = {
  contractId: "0x0123456789abcdef4",
  nft: {
    name: "KITARO #4515",
    image:
      "http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg",
    chain: {
      id: 1,
      symbol: "eth",
    },
  },
  ended: 1673592239,
  ticketPrice: 0.2,
  totalTicketNum: 80,
};

const raffle5 = {
  contractId: "0x0123456789abcdef5",
  nft: {
    name: "KITARO #1122",
    image:
      "http://localhost:3000/static/media/Logo.0f193fad515c0d2463ac44ec95490c0f.svg",
    chain: {
      id: 2,
      symbol: "matic",
    },
  },
  ended: 1673592239,
  ticketPrice: 0.3,
  totalTicketNum: 40,
};

const handlers = [
  rest.get("/api/raffles/0x0123456789abcdef1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(raffle1));
  }),

  rest.get("/api/raffles/0x0123456789abcdef2", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(raffle2));
  }),

  rest.get("/api/raffles/0x0123456789abcdef3", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(raffle3));
  }),

  rest.get("/api/raffles/0x0123456789abcdef4", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(raffle4));
  }),

  rest.get("/api/raffles/0x0123456789abcdef5", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(raffle5));
  }),

  rest.get("/api/raffles", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([raffle1, raffle2, raffle3, raffle4, raffle5])
    );
  }),

  // rest.get("/api/showall", async (req, res, ctx) => {

  //   const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER);

  //   let contract = new web3.eth.Contract(
  //     RaffleABI,
  //     "0x6355f6638e4a005c3bf94f1d0ffe7161072950bd"
  //   );


  //   let result = await contract.methods.showAll().call();
  //   return res(
  //     ctx.status(200),
  //     ctx.json(result)
  //   );

  //   // return res(
  //   //   ctx.status(200), ctx
  //   // )
  // }),
];






export default handlers;
