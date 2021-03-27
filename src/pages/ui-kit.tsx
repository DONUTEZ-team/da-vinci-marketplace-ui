import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { BaseLayout } from '@layouts/BaseLayout';
import { Row } from '@components/ui/Row';
import { Container } from '@components/ui/Container';
import { Button } from '@components/ui/Button';
import { Heading } from '@components/ui/Heading';
import { Tag } from '@components/ui/Tag';
import { MarketplaceCard } from '@components/common/MarketplaceCard';
import { AuctionCard } from '@components/common/AuctionCard';

import s from '@styles/Home.module.sass';

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

const contentAuction = [
  {
    id: 4,
    title: 'The Signal',
    description: 'Fun Augmented Reality Experiment',
    image: '/images/Auction1.jpg',
    author: {
      image: '/images/User4.jpg',
      name: 'Daria Protsova',
    },
    lastBid: 120,
    timeLeft: 12,
  },
  {
    id: 1,
    title: '"Beyond the Seventh Heaven" Some words to take 2 lines',
    description: '"Dumb Presidents" collection #02.a. Clown in chief.',
    image: '/images/Auction2.jpg',
    author: {
      image: '/images/User5.jpg',
      name: 'Cyril Tasher',
    },
    lastBid: 28,
    timeLeft: 56,
  },
  {
    id: 2,
    title: 'Sleepwalker',
    description: 'Introducing our new collection called Super Tickets.',
    image: '/images/Auction3.jpg',
    author: {
      image: '/images/User6.jpg',
      name: 'Abstract Person',
    },
    lastBid: 1900,
    timeLeft: 38,
  },
  {
    id: 3,
    title: 'Sleepwalker',
    description: 'Introducing our new collection called Super Tickets.',
    image: '/images/Auction4.jpg',
    author: {
      image: '/images/User7.jpg',
      name: 'Abstract Person',
    },
    lastBid: 24.123,
    timeLeft: 13,
  },
];

const UiKit: React.FC = () => (
  <BaseLayout>
    <Container>
      <Row className={s.row}>
        <h1>Ui Kit</h1>

        <Heading title="Buttons" items={6} />
        <div className={s.buttons}>
          <Button className={s.button}>
            Purple
          </Button>
          <Button className={s.button} theme="green">
            Green
          </Button>
          <Button className={s.button} theme="blue">
            Blue
          </Button>
          <Button sizeT="medium" className={s.button}>
            Purple
          </Button>
          <Button sizeT="medium" className={s.button} theme="green">
            Green
          </Button>
          <Button sizeT="medium" className={s.button} theme="blue">
            Blue
          </Button>
        </div>

        <Heading title="Tags" items={2} theme="orange" />
        <div className={s.tags}>
          <Tag className={s.tag}>12 items</Tag>
          <Tag className={s.tag} theme="orange">48 items</Tag>
        </div>

        <Heading title="Cards" items={8} theme="pink" />
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
          {contentAuction.map((card) => (
            <AuctionCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              author={card.author}
              className={s.card}
              lastBid={card.lastBid}
              timeLeft={card.timeLeft}
            />
          ))}
        </div>

      </Row>
    </Container>
  </BaseLayout>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
});

export default UiKit;
