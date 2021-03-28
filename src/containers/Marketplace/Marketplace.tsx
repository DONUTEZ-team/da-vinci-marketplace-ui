import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import {
  BLOCK_INTERVAL,
  FA2_TOKEN_ADDRESS, ITEMS_PER_PAGE, MARKETPLACE_TOKEN_ADDRESS,
} from '@utils/defaults';
import {
  getStorageInfo,
  useAccountPkh,
  useTezos,
} from '@utils/dapp';
import useBlockchainSWR from '@utils/useBlockchainSWR';

import { Button } from '@components/ui/Button';
import { Heading } from '@components/ui/Heading';

import { useRouter } from 'next/router';
import { Pagination } from '@components/common/Pagination';
import { MarketplaceCard } from '@components/common/MarketplaceCard';
import s from './Marketplace.module.sass';

const hex2a = (hex: string) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

type MarketplaceProps = {
  isHome?: boolean
  className?: string
};

export const MarketplaceContainer: React.FC<MarketplaceProps> = ({
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
        MARKETPLACE_TOKEN_ADDRESS,
      );
      const { markets, lastTokenId } = auctionStorage;
      setDataAmount(+lastTokenId);

      const faStorage = await getStorageInfo(
        tezos,
        FA2_TOKEN_ADDRESS,
      );
      const { token_metadata: tokenMetadata } = faStorage;

      let startAuctionId = 1;
      let lastFinalAuctionId = 1;
      if (isHome) {
        startAuctionId = +lastTokenId < 4 ? 1 : +lastTokenId - 3;
        lastFinalAuctionId = +lastTokenId;
      } else {
        if ((currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + 1) <= +lastTokenId) {
          startAuctionId = (currentPage * ITEMS_PER_PAGE) - ITEMS_PER_PAGE + 1;
        } else {
          await router.replace(`${parentPath}?page=${Math.ceil(+lastTokenId / ITEMS_PER_PAGE)}`);
        }
        lastFinalAuctionId = currentPage * ITEMS_PER_PAGE;
      }

      for (let i = startAuctionId; i <= +lastFinalAuctionId; i++) {
        const tokenRecord = await markets.get(i.toString());
        if (!tokenRecord) break;
        const {
          owner,
          tokenId,
          price,
          status,
        } = tokenRecord;

        const tokenMetaRecord = await tokenMetadata.get(tokenId.toString());
        const { extras } = tokenMetaRecord;
        const metadata = extras.get('metadata');
        // eslint-disable-next-line no-continue
        if (!metadata) continue;

        const parsedMeta = JSON.parse(hex2a(metadata));

        resultItems.push({
          id: i.toString(),
          image: parsedMeta.link,
          title: parsedMeta.title,
          description: parsedMeta.description,
          author: owner,
          price: tezos.format('mutez', 'tz', price).toString(),
          status: +status,
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
    [`marketplace-${isHome ? 'home' : currentPage}`, accountPkh || !!tezos],
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
        <Heading title="Marketplace" items={dataAmount} />
      )}
      <div className={cx(s.cards, className)}>
        {data?.result?.map((card) => (
          <MarketplaceCard
            key={card.id}
            href={`/marketplace/${card.id}`}
            title={card.status === 2 ? 'XXXXX' : card.title}
            description={card.status === 2 ? 'XXXXXXXXXXXXXXXXX' : card.description}
            image={card.status === 2 ? '/images/Marketplace1.jpg' : card.image}
            author={{
              image: '/images/User1.jpg',
              name: card?.status === 2 ? 'xx0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxXx' : card.author,
            }}
            isSold={card.status === 1}
            price={card.status === 2 ? 'XXX.XXX' : card.price}
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
