import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import {
  AUCTION_TOKEN_ADDRESS,
  BLOCK_INTERVAL,
  FA2_TOKEN_ADDRESS, ITEMS_PER_PAGE,
} from '@utils/defaults';
import {
  getStorageInfo,
  useAccountPkh,
  useTezos,
} from '@utils/dapp';
import useBlockchainSWR from '@utils/useBlockchainSWR';

import { Button } from '@components/ui/Button';
import { Heading } from '@components/ui/Heading';
import { AuctionCard } from '@components/common/AuctionCard';

import { useRouter } from 'next/router';
import { Pagination } from '@components/common/Pagination';
import { hex2a } from '@utils/helpers';
import s from './Auction.module.sass';

type AuctionProps = {
  isHome?: boolean
  className?: string
};

export const AuctionContainer: React.FC<AuctionProps> = ({
  isHome = false,
  className,
}) => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const [dataAmount, setDataAmount] = useState(0);

  const router = useRouter();
  const parentPath = router.asPath.split('?')[0];
  const currentPage: number = router.query.page ? +router.query.page : 1;
  if (currentPage < 1) {
    router.replace(parentPath);
  }

  const getLiquidityTopLineStats = useCallback(
    async () => {
      if (!tezos) {
        return {};
      }
      const resultItems = [];

      const auctionStorage = await getStorageInfo(
        tezos,
        AUCTION_TOKEN_ADDRESS,
      );
      const { auctions, lastAuctionId } = auctionStorage;
      setDataAmount(+lastAuctionId);

      const faStorage = await getStorageInfo(
        tezos,
        FA2_TOKEN_ADDRESS,
      );
      const { token_metadata: tokenMetadata } = faStorage;

      let startAuctionId = 1;
      let lastFinalAuctionId = 1;
      if (isHome) {
        startAuctionId = +lastAuctionId < 4 ? 1 : +lastAuctionId - 3;
        lastFinalAuctionId = +lastAuctionId;
      } else {
        if ((currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1) <= +lastAuctionId) {
          startAuctionId = (currentPage * ITEMS_PER_PAGE) - ITEMS_PER_PAGE + 1;
        } else {
          await router.replace(`${parentPath}?page=${Math.ceil(+lastAuctionId / ITEMS_PER_PAGE)}`);
        }
        lastFinalAuctionId = currentPage * ITEMS_PER_PAGE;
      }

      for (let i = startAuctionId; i <= +lastFinalAuctionId; i++) {
        const tokenRecord = await auctions.get(i.toString());
        if (!tokenRecord) break;
        const {
          creator,
          tokenParams,
          lastBid,
          finished,
          createdAt,
        } = tokenRecord;
        const {
          tokenId,
          initialPrice,
          minBidStep,
          lifetime,
        } = tokenParams;

        const newFinalDate: Date = new Date(createdAt);
        newFinalDate.setSeconds(newFinalDate.getSeconds() + lifetime);
        // @ts-ignore
        const finalTimeLeft = Math.floor((Math.abs(newFinalDate - new Date()) / 1000) / 60);

        const tokenMetaRecord = await tokenMetadata.get(tokenId.toString());
        const { extras } = tokenMetaRecord;
        const metadata = extras.get('metadata');
        // eslint-disable-next-line no-continue
        if (!metadata) continue;

        const parsedMeta = JSON.parse(hex2a(metadata));

        resultItems.push({
          id: tokenId.toString(),
          image: parsedMeta.link,
          title: parsedMeta.title,
          description: parsedMeta.description,
          author: creator,
          bid: lastBid.bid.lt(initialPrice)
            ? tezos.format('mutez', 'tz', initialPrice).toString()
            : tezos.format('mutez', 'tz', lastBid.bid).toString(),
          lifetime: finalTimeLeft,
          minBidStep: tezos.format('mutez', 'tz', minBidStep).toString(),
          isSold: finished,
        });
      }

      return { result: resultItems };
    },
    [currentPage, isHome, parentPath, router, tezos],
  );

  const {
    error,
    data,
  } = useBlockchainSWR(
    [`auction-${isHome ? 'home' : currentPage}`, accountPkh || !!tezos],
    getLiquidityTopLineStats,
    { refreshInterval: BLOCK_INTERVAL },
  );

  if (error) {
    alert('Error!');
  }
  if (!error && !data?.result) {
    return (
      <div className={cx(s.cards, className)}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {isHome && (
        <Heading title="Auction" items={dataAmount} theme="orange" />
      )}
      <div className={cx(s.cards, className)}>
        {data?.result?.map((card) => (
          <AuctionCard
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            author={{
              image: '/images/User1.jpg',
              name: card.author,
            }}
            lastBid={card.bid}
            minBidStep={card.minBidStep}
            timeLeft={+card.lifetime}
            isSold={card.isSold}
            className={s.card}
          />
        ))}
      </div>
      {isHome
        ? (
          <Button
            href="/auction"
            className={s.button}
          >
            All items (
            {dataAmount}
            )
          </Button>
        )
        : (
          <Pagination size={ITEMS_PER_PAGE} countOfElements={dataAmount} />
        )}
    </>
  );
};
