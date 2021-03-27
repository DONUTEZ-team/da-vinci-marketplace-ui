import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { MarketplaceContainer } from '@containers/Marketplace';
import { BaseLayout } from '@layouts/BaseLayout';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import { Pagination } from '@components/common/Pagination';

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
  {
    id: 4,
    title: 'incredibly rare shit right here.',
    description: 'A small desciption about the NFT token on a couple of lins',
    image: '/images/Marketplace1.jpg',
    author: {
      image: '/images/User1.jpg',
      name: 'John Smith',
    },
    price: 120,
    isSold: true,
  },
  {
    id: 5,
    title: 'Bone Masked Girl no.1',
    description: 'Its plant blooms when it is absorbing solar energy. It stays...',
    image: '/images/Marketplace2.jpg',
    author: {
      image: '/images/User2.jpg',
      name: 'Alex Trainer',
    },
    price: 40.324,
    isSold: true,
  },
  {
    id: 6,
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
    id: 7,
    title: 'Rarible Lighter',
    description: 'Purchase includes link to 4k png download.',
    image: '/images/Marketplace4.jpg',
    author: {
      image: '/images/User4.jpg',
      name: 'Tratus Sheur',
    },
    price: 32893,
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
    title: 'Hands on Hands Collectible',
    description: 'The seed slowly grows larger. ',
    image: '/images/Marketplace3.jpg',
    author: {
      image: '/images/User3.jpg',
      name: 'Carlos Mayve',
    },
    price: 80000,
  },
  {
    id: 11,
    title: 'Rarible Lighter',
    description: 'Purchase includes link to 4k png download.',
    image: '/images/Marketplace4.jpg',
    author: {
      image: '/images/User4.jpg',
      name: 'Tratus Sheur',
    },
    price: 32893,
  },
  {
    id: 12,
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
    id: 13,
    title: 'Bone Masked Girl no.1',
    description: 'Its plant blooms when it is absorbing solar energy. It stays...',
    image: '/images/Marketplace2.jpg',
    author: {
      image: '/images/User2.jpg',
      name: 'Alex Trainer',
    },
    price: 40.324,
    isSold: true,
  },
  {
    id: 14,
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
    id: 15,
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

const MarketplacePage: React.FC = () => {
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
          <MarketplaceContainer cards={content} />
          <Pagination size={16} countOfElements={80} />
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

export default MarketplacePage;
