import React from 'react';
import cx from 'classnames';

import { Card } from '@components/common/Card';
import { Button } from '@components/ui/Button';

import s from './MarketplaceCard.module.sass';

export type MarketplaceCardProps = {
  title: string
  href?: string
  description: string
  image: string
  author: {
    name: string
    image: string
  }
  price: string
  isSold?: boolean
  className?: string
};

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  title,
  href,
  description,
  image,
  author,
  price,
  isSold,
  className,
}) => (
  <Card
    title={title}
    href={href}
    description={description}
    image={image}
    author={author}
    className={cx(s.root, { [s.disabled]: isSold }, className)}
  >
    <div className={s.prices}>
      {isSold && (
        <span className={s.sold}>Sold Out</span>
      )}
      <span className={s.price}>
        {price}
        {' '}
        XTZ
      </span>
      <Button
        className={s.button}
        sizeT="medium"
        theme="green"
        disabledView={isSold}
      >
        Purchase
      </Button>
    </div>
  </Card>
);
