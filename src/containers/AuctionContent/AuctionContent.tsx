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
  AUCTION_TOKEN_ADDRESS,
  BLOCK_INTERVAL,
  FA2_TOKEN_ADDRESS,
} from '@utils/defaults';
import { hex2a } from '@utils/helpers';
import useBlockchainSWR from '@utils/useBlockchainSWR';
import { useRouter } from 'next/router';
import { Input } from '@components/ui/Input';
import { composeValidators, required } from '@utils/validators';
import { Field, Form } from 'react-final-form';
import { FormApi } from 'final-form';
import s from './AuctionContent.module.sass';

// Default stake value
type FormValues = {
  bid: string
};

export const AuctionContent: React.FC = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const router = useRouter();
  const { id } = router.query;

  const getAuctionContent = useCallback(
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

      const tokenRecord = await auctions.get(id);
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
      const ourSecs = +newFinalDate.getSeconds();
      const plusSecs = +lifetime;
      newFinalDate.setSeconds(ourSecs + plusSecs);

      const finalTimeLeft = finished
        ? 0
        // @ts-ignore
        : Math.floor(((newFinalDate - new Date()) / 1000) / 60);

      const tokenMetaRecord = await tokenMetadata.get(tokenId.toString());
      const { extras } = tokenMetaRecord;
      const metadata = extras.get('metadata');
      // eslint-disable-next-line no-continue
      if (!metadata) return {};

      const parsedMeta = JSON.parse(hex2a(metadata));

      return {
        tokenId,
        image: parsedMeta.link,
        title: parsedMeta.title,
        description: parsedMeta.description,
        author: creator,
        bid: lastBid.bid.lt(initialPrice)
          ? tezos.format('mutez', 'tz', initialPrice).toString()
          : tezos.format('mutez', 'tz', lastBid.bid).toString(),
        lifetime: finalTimeLeft,
        minBidStep: tezos.format('mutez', 'tz', minBidStep).toString(),
        isSold: finished || finalTimeLeft < 0,
      };
    }, [id, tezos],
  );

  const {
    error,
    data,
  } = useBlockchainSWR(
    [`auction-single-${id}`, accountPkh || !!tezos],
    getAuctionContent,
    { refreshInterval: BLOCK_INTERVAL },
  );

  // const onSubmit = useCallback(async () => {
  //   const contract = await tezos?.wallet.at(MARKETPLACE_TOKEN_ADDRESS);
  //   const operation = await contract?.methods
  //     .buy(data?.id)
  //     .send({ amount: data?.price, mutez: true });
  //   await operation?.confirmation();
  // }, [data?.id, data?.price, tezos?.wallet]);
  const onSubmit = useCallback(async (
    values: FormValues,
    form: FormApi<FormValues>,
  ) => {
    try {
      if (tezos) {
        console.log('inside');
        const contract = await tezos?.wallet.at(AUCTION_TOKEN_ADDRESS);
        console.log('contract');
        const operation = await contract?.methods
          .makeBid(data?.tokenId, values.bid)
          .send();
        console.log('operation');
        await operation?.confirmation();

        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        setTimeout(form.restart);
      }
    } catch (e) {
      console.log(e);
    }
  }, [data?.tokenId, tezos]);

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
        {!data?.isSold && (
          <div className={cx(s.item)}>
            <h2 className={s.header}>Min bid step:</h2>
            <p className={s.amount}>
              {data?.minBidStep}
              {' '}
              XTZ
            </p>
          </div>
        )}
        <div className={cx(s.item, s.lastBid)}>
          <h2 className={s.header}>Last bid:</h2>
          <p className={s.amount}>
            {data?.bid}
            {' '}
            XTZ
          </p>
        </div>
        {!data?.isSold && (
          <div className={cx(s.item, s.time)}>
            <h2 className={s.header}>Time left:</h2>
            <p className={s.amount}>
              {data?.lifetime}
              {' '}
              minutes
            </p>
          </div>
        )}
        {data?.isSold && (
          <span className={s.sold}>Ended</span>
        )}
        {(!data?.isSold) && (
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit, submitting,
          }) => (
            <form className={s.form} onSubmit={handleSubmit}>
              <Field
                name="bid"
                validate={composeValidators(
                  required,
                )}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    type="number"
                    className={s.input}
                    placeholder="120"
                    label="Your bid"
                    labelClassName={s.label}
                    inputClassName={s.inputInner}
              // @ts-ignore
                    min={+data?.lastBid + data?.minBidStep}
                    step={0.000001}
                    error={(meta.touched && meta.error) || meta.submitError}
                    success={!meta.error && meta.touched && !meta.submitError}
                  />
                )}
              </Field>
              <Button
                type="submit"
                disabled={submitting}
                className={s.button}
                theme="purpleSoft"
              >
                {submitting ? 'Loading...' : 'Bid'}
              </Button>
            </form>
          )}
        />
        )}
      </div>
    </div>
  );
};
