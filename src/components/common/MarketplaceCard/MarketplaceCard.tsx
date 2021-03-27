import React from 'react';
import cx from 'classnames';

import { Card } from '@components/common/Card';
import { Button } from '@components/ui/Button';

import s from './MarketplaceCard.module.sass';

type MarketplaceCardProps = {
  title: string
  description: string
  image: string
  author: {
    name: string
    image: string
  }
  price: number,
  className?: string
};

export const MarketplaceCard: React.FC<MarketplaceCardProps> = ({
  title,
  description,
  image,
  author,
  price,
  className,
}) => (
  <Card
    title={title}
    description={description}
    image={image}
    author={author}
    className={cx(s.root, className)}
  >
    <div className={s.prices}>
      <span className={s.price}>
        {price}
        {' '}
        XTZ
      </span>
      <Button sizeT="medium" theme="green">Purchase</Button>
    </div>
  </Card>
);
