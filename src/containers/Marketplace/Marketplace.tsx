import React from 'react';
import cx from 'classnames';

import { MarketplaceCard, MarketplaceCardProps } from '@components/common/MarketplaceCard';

import s from './Marketplace.module.sass';

type MarketplaceProps = {
  cards: MarketplaceCardProps[]
  className?: string
};

export const MarketplaceContainer: React.FC<MarketplaceProps> = ({ cards, className }) => (
  <div className={cx(s.root, className)}>
    {cards.map((card) => (
      <MarketplaceCard
        key={card.title}
        title={card.title}
        description={card.description}
        image={card.image}
        author={card.author}
        className={s.card}
        price={card.price}
        isSold={card.isSold}
      />
    ))}
  </div>
);
