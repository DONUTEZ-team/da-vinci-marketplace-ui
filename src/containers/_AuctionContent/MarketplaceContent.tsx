import React, { useCallback } from 'react';
import { Button } from '@components/ui/Button';
import { Author } from '@components/common/Author';
import Twitter from '@icons/Twitter.svg';
import Facebook from '@icons/Facebook.svg';
import Telegram from '@icons/Telegram.svg';
import Email from '@icons/Email.svg';
import Link from '@icons/Link.svg';

import { getStorageInfo, useAccountPkh, useTezos } from '@utils/dapp';
import { AUCTION_TOKEN_ADDRESS, BLOCK_INTERVAL, FA2_TOKEN_ADDRESS } from '@utils/defaults';
import { hex2a } from '@utils/helpers';
import useBlockchainSWR from '@utils/useBlockchainSWR';
import s from './MarketplaceContent.module.sass';

export const MarketplaceContent: React.FC = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const getMarketplaceContent = useCallback(
    async () => {
      if (!tezos) {
        return {};
      }

      const auctionStorage = await getStorageInfo(
        tezos,
        AUCTION_TOKEN_ADDRESS,
      );
      const { auctions } = auctionStorage;

      const faStorage = await getStorageInfo(
        tezos,
        FA2_TOKEN_ADDRESS,
      );
      const { token_metadata: tokenMetadata } = faStorage;

      const tokenRecord = await auctions.get('1');
      if (!tokenRecord) return {};
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
      if (!metadata) return {};

      const parsedMeta = JSON.parse(hex2a(metadata));

      return {
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
      };
    }, [tezos],
  );

  const {
    error,
    data,
  } = useBlockchainSWR(
    ['auction-single', accountPkh || !!tezos],
    getMarketplaceContent,
    { refreshInterval: BLOCK_INTERVAL },
  );

  if (error) {
    alert('Error!');
  }
  if (!error && !data?.title) {
    return <>Loading...</>;
  }

  return (
    <div className={s.root}>
      <div className={s.imageWrapper}>
        <img src={data?.image} alt={data?.title} />
      </div>
      <div className={s.socials}>
        <button type="button" className={s.social}>
          <Twitter />
        </button>
        <button type="button" className={s.social}>
          <Facebook />
        </button>
        <button type="button" className={s.social}>
          <Telegram />
        </button>
        <button type="button" className={s.social}>
          <Email />
        </button>
        <button type="button" className={s.social}>
          <Link />
        </button>
      </div>
      <div className={s.inner}>
        <h1 className={s.header}>{data?.title}</h1>
        <div className={s.price}>
          {data?.bid}
          {' '}
          XTZ
        </div>
        <Author author={{ image: '/images/User1.jpg', name: data?.author }} />
        <div className={s.description}>
          {data?.description}
        </div>
        <Button className={s.button} theme="purpleSoft">Purchase</Button>
      </div>
    </div>
  );
};
