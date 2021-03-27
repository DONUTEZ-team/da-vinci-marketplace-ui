import React from 'react';
import cx from 'classnames';

import { Card } from '@components/common/Card';
import { Button } from '@components/ui/Button';

import s from './AuctionCard.module.sass';

export type AuctionCardProps = {
  title: string
  description: string
  image: string
  author: {
    name: string
    image: string
  }
  lastBid: number
  timeLeft: number
  isSold?: boolean
  className?: string
};

export const AuctionCard: React.FC<AuctionCardProps> = ({
  title,
  description,
  image,
  author,
  lastBid,
  timeLeft,
  isSold = false,
  className,
}) => (
  <Card
    title={title}
    description={description}
    image={image}
    author={author}
    className={cx(s.root, { [s.disabled]: isSold }, className)}
  >
    <div className={s.content}>
      {isSold && (
        <span className={s.sold}>Auction ended</span>
      )}
      <div className={s.bidWrapper}>
        Last bid:
        <span className={s.bid}>
          {lastBid}
          {' '}
          XTZ
        </span>
      </div>
      <div className={s.timeWrapper}>
        <span className={s.time}>
          {isSold ? 'Ended' : `${timeLeft} mins left`}
        </span>
        <Button className={s.button} sizeT="medium" theme="blue">Bid</Button>
      </div>
    </div>
  </Card>
);
