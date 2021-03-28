import React, { useCallback } from 'react';
import cx from 'classnames';
import { Button } from '@components/ui/Button';
import { Author } from '@components/common/Author';
import Twitter from '@icons/Twitter.svg';
import Facebook from '@icons/Facebook.svg';
import Telegram from '@icons/Telegram.svg';
import Email from '@icons/Email.svg';
import Link from '@icons/Link.svg';

import { getStorageInfo, useAccountPkh, useTezos } from '@utils/dapp';
import {
  BLOCK_INTERVAL,
  FA2_TOKEN_ADDRESS,
  MARKETPLACE_TOKEN_ADDRESS,
} from '@utils/defaults';
import { hex2a } from '@utils/helpers';
import useBlockchainSWR from '@utils/useBlockchainSWR';
import { useRouter } from 'next/router';
import s from './MarketplaceContent.module.sass';

export const MarketplaceContent: React.FC = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const router = useRouter();
  const { id } = router.query;

  const getMarketplaceContent = useCallback(
    async () => {
      if (!tezos) {
        return {};
      }

      const auctionStorage = await getStorageInfo(
        tezos,
        MARKETPLACE_TOKEN_ADDRESS,
      );
      const { markets } = auctionStorage;

      const faStorage = await getStorageInfo(
        tezos,
        FA2_TOKEN_ADDRESS,
      );
      const { token_metadata: tokenMetadata } = faStorage;

      const tokenRecord = await markets.get(id);
      if (!tokenRecord) return {};
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
      if (!metadata) return {};

      const parsedMeta = JSON.parse(hex2a(metadata));

      return {
        id: tokenId,
        image: parsedMeta.link,
        title: parsedMeta.title,
        description: parsedMeta.description,
        author: owner,
        price,
        status: +status,
      };
    }, [id, tezos],
  );

  const {
    error,
    data,
  } = useBlockchainSWR(
    [`market-single-${id}`, accountPkh || !!tezos],
    getMarketplaceContent,
    { refreshInterval: BLOCK_INTERVAL },
  );

  const buyHandler = useCallback(async () => {
    const contract = await tezos?.wallet.at(MARKETPLACE_TOKEN_ADDRESS);
    const operation = await contract?.methods
      .buy(data?.id)
      .send({ amount: +data?.price + 500000, mutez: true });
    await operation?.confirmation();
  }, [data?.id, data?.price, tezos?.wallet]);

  if (error) {
    alert('Error!');
  }
  if (!error && !data?.title) {
    return <>Loading...</>;
  }

  return (
    <div className={s.root}>
      <div className={s.imageWrapper}>
        <img
          src={data?.status === 2 ? '/images/Marketplace1.jpg' : data?.image}
          alt={data?.status === 2 ? 'XXXXX' : data?.title}
        />
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
        <h1 className={s.header}>{data?.status === 2 ? 'XXXXX' : data?.title}</h1>
        <div
          className={cx(
            s.price,
            { [s.soldPrice]: data?.status === 1 },
            { [s.removedPrice]: data?.status === 2 },
          )}
        >
          {data?.status === 2 ? 'XXX.XXX' : tezos?.format('mutez', 'tz', data?.price).toString()}
          {' '}
          XTZ
        </div>
        <Author author={
          {
            image: '/images/User1.jpg',
            name: data?.author === 2 ? 'xx0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxXx' : data?.author,
          }
        }
        />
        <div className={s.description}>
          {data?.status === 2 ? 'XXXXXXXXXXXXXXXXX' : data?.description}
        </div>
        {data?.status === 1 && (
          <span className={s.sold}>Sold Out</span>
        )}
        {data?.status === 2 && (
          <span className={cx(s.sold, s.removed)}>Removed</span>
        )}
        {data?.status === 0 && (
          <Button
            className={s.button}
            theme="purpleSoft"
            disabled={data?.status !== 0}
            onClick={buyHandler}
          >
            Buy
          </Button>
        )}
      </div>
    </div>
  );
};
