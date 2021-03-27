import React from 'react';
import cx from 'classnames';

import { Card } from '@components/common/Card';
import { Button } from '@components/ui/Button';

import s from './AuctionCard.module.sass';

type MarketplaceCardProps = {
  title: string
  description: string
  image: string
  author: {
    name: string
    image: string
  }
  lastBid: number,
  timeLeft: number,
  className?: string
};

export const AuctionCard: React.FC<MarketplaceCardProps> = ({
  title,
  description,
  image,
  author,
  lastBid,
  timeLeft,
  className,
}) => (
  <Card
    title={title}
    description={description}
    image={image}
    author={author}
    className={cx(s.root, className)}
  >
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
        {timeLeft}
        {' '}
        mins left
      </span>
      <Button sizeT="medium" theme="blue">Bid</Button>
    </div>
  </Card>
);
