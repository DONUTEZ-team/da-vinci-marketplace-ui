import React from 'react';
import cx from 'classnames';

import { AuctionContainer } from '@containers/Auction';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import { Heading } from '@components/ui/Heading';
import { Button } from '@components/ui/Button';
import BackgroundIcon from '@icons/BackgroundHomeAuction.svg';

import s from './Auction.module.sass';

const content = [
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
    isSold: true,
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

type AuctionProps = {
  className?: string
};

export const Auction: React.FC<AuctionProps> = ({ className }) => (
  <section className={cx(s.root, className)}>
    <BackgroundIcon className={s.icon} />
    <Container>
      <Row>
        <Heading title="Auction" items={13} theme="orange" />
        <AuctionContainer cards={content} />
        <Button
          href="/auction"
          className={s.button}
        >
          All items (13)
        </Button>
      </Row>
    </Container>
  </section>
);
