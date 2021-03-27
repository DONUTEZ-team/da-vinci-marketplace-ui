import React from 'react';
import cx from 'classnames';

import { AuctionCard, AuctionCardProps } from '@components/common/AuctionCard';

import s from './Auction.module.sass';

type AuctionProps = {
  cards: AuctionCardProps[]
  className?: string
};

export const AuctionContainer: React.FC<AuctionProps> = ({ cards, className }) => (
  <div className={cx(s.cards, className)}>
    {cards.map((card) => (
      <AuctionCard
        key={card.title}
        title={card.title}
        description={card.description}
        image={card.image}
        author={card.author}
        className={s.card}
        lastBid={card.lastBid}
        timeLeft={card.timeLeft}
        isSold={card.isSold}
      />
    ))}
  </div>
);
