import { React, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Contract } from "@eth/Web3";

const getPriceBtnStyle = {
  width: "100%",
};

export default function RaffleDetailCompleted({
  winnerInfo,
  ownerInfo,
  account,
  raffleMeta,
  fetchRaffle,
  ticketCap,
  ticketPrice,
}) {

  const ETH_TO_WEI = 1000000000000000000;

  const [isTaking, setIsTaking] = useState(false);

  async function requestPrize() {
    try {
      setIsTaking(true);

      await Contract(raffleMeta)
        .methods.giveNftToWinner()
        .send({ from: account });

      setIsTaking(false);

      fetchRaffle();
    } catch (e) {
      setIsTaking(false);
      console.log("requestPrize error", e);
    }
  }

  async function requestAllTicketCost() {
    try {
      setIsTaking(true);

      await Contract(raffleMeta)
        .methods.giveAllBalanceToOwner()
        .send({ from: account });

      setIsTaking(false);

      fetchRaffle();
    } catch (e) {
      setIsTaking(false);
      console.log("requestAllTicketCost error", e);
    }
  }

  return (
    <>
      {winnerInfo.winner.toLowerCase().localeCompare(account.toLowerCase()) ===
        0 || true ? (
        <div>
          <p>축하합니다. 래플에 당첨되었습니다.</p>
          {!winnerInfo.given ? (
            <>
              <Button
                style={getPriceBtnStyle}
                variant="primary"
                disabled={isTaking}
                onClick={requestPrize}
              >
                {isTaking ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <>NFT 가져가기</>
                )}
              </Button>
            </>
          ) : null}
        </div>
      ) : (
        <div>래플에 당첨되지 않았습니다.</div>
      )}
      {ownerInfo.owner.toLowerCase().localeCompare(account.toLowerCase()) ===
      0  && !ownerInfo.given ? (
        <div>
          <p>래플이 성공적으로 마감되었으므로 모든 티켓 비용을 가져 갈 수 있습니다.</p>
          <Button
            style={getPriceBtnStyle}
            variant="primary"
            disabled={isTaking}
            onClick={requestAllTicketCost}
          >
            {isTaking ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <>{`${((ticketCap * ticketPrice) / ETH_TO_WEI)} ETH 가져가기`}</>
            )}
          </Button>
        </div>
      ) : null}
    </>
  );
}