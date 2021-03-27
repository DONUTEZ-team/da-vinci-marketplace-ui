import React from 'react';
import cx from 'classnames';

import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import { Button } from '@components/ui/Button';
import { Heading } from '@components/ui/Heading';
import { MarketplaceCard } from '@components/common/MarketplaceCard';
import BackgroundIcon from '@icons/BackgroundHomeMarketplace.svg';

import s from './Marketplace.module.sass';

const content = [
  {
    id: 0,
    title: 'incredibly rare shit right here.',
    description: 'A small desciption about the NFT token on a couple of lins',
    image: '/images/Marketplace1.jpg',
    author: {
      image: '/images/User1.jpg',
      name: 'John Smith',
    },
    price: 120,
  },
  {
    id: 1,
    title: 'Bone Masked Girl no.1',
    description: 'Its plant blooms when it is absorbing solar energy. It stays...',
    image: '/images/Marketplace2.jpg',
    author: {
      image: '/images/User2.jpg',
      name: 'Alex Trainer',
    },
    price: 40.324,
  },
  {
    id: 2,
    title: 'Hands on Hands Collectible',
    description: 'The seed slowly grows larger. ',
    image: '/images/Marketplace3.jpg',
    author: {
      image: '/images/User3.jpg',
      name: 'Carlos Mayve',
    },
    price: 80000,
    isSold: true,
  },
  {
    id: 3,
    title: 'Rarible Lighter',
    description: 'Purchase includes link to 4k png download.',
    image: '/images/Marketplace4.jpg',
    author: {
      image: '/images/User4.jpg',
      name: 'Tratus Sheur',
    },
    price: 32893,
  },
];

type MarketplaceProps = {
  className?: string
};

export const Marketplace: React.FC<MarketplaceProps> = ({ className }) => (
  <section className={cx(s.root, className)}>
    <Container>
      <Row>
        <Heading title="Marketplace" items={58} />

        <div className={s.cards}>
          {content.map((card) => (
            <MarketplaceCard
              key={card.id}
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
        <Button className={s.button}>All items (52)</Button>
      </Row>
    </Container>
    <BackgroundIcon className={s.icon} />
  </section>
);
