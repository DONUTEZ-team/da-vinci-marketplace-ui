import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { AuctionContainer } from '@containers/Auction';
import { BaseLayout } from '@layouts/BaseLayout';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import { Pagination } from '@components/common/Pagination';

import s from '@styles/Home.module.sass';

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
    isSold: true,
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
    isSold: true,
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
    isSold: true,
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
    isSold: true,
  },
];

const AuctionPage: React.FC = () => {
  const { t } = useTranslation(['common', 'home']);

  return (
    <BaseLayout className={s.container}>
      <NextSeo
        title={t('secondary:Home page')}
        description={t('secondary:Home page description. Couple sentences...')}
        openGraph={{
          title: t('secondary:Home page'),
          description: t('secondary:Home page description. Couple sentences...'),
        }}
      />
      <Container>
        <Row>
          <AuctionContainer cards={content} />
          <Pagination size={16} countOfElements={160} />
        </Row>
      </Container>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
});

export default AuctionPage;
