import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { MarketplaceContainer } from '@containers/Marketplace';
import { BaseLayout } from '@layouts/BaseLayout';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import { Button } from '@components/ui/Button';
import { Heading } from '@components/ui/Heading';
import { Author } from '@components/common/Author';
import Twitter from '@icons/Twitter.svg';
import Facebook from '@icons/Facebook.svg';
import Telegram from '@icons/Telegram.svg';
import Email from '@icons/Email.svg';
import Link from '@icons/Link.svg';

import s from '@styles/MarketplaceSingle.module.sass';

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

const MarketplaceSinglePage: React.FC = () => {
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
          <div className={s.content}>
            <div className={s.imageWrapper}>
              {/* <div className={s.image}> */}
              <img src="/images/Marketplace3.jpg" alt="incredibly rare shit right here" />
              {/* </div> */}
            </div>
            <div className={s.socials}>
              <button type="button" className={s.social}>
                <Twitter />
              </button>
              <button type="button" className={s.social}>
                <Facebook />
              </button>
              <button type="button" className={s.social}>
                <Telegram />
              </button>
              <button type="button" className={s.social}>
                <Email />
              </button>
              <button type="button" className={s.social}>
                <Link />
              </button>
            </div>
            <div className={s.inner}>
              <h1 className={s.header}>incredibly rare shit right here.</h1>
              <div className={s.price}>120 XTZ</div>
              <Author author={{ image: '/images/User1.jpg', name: 'John Smith' }} />
              <div className={s.description}>
                {'Blackman\'s work is the fourth in the Goldboy Brothers collection. Although Blackman is not their brother, he has very close ties to them.\n\nThe name of the collector who purchased the item will be listed here.\n\nOwner: https://twitter.com/Kanzory\n\nThe size of the finished work 4800x4800 px'}
              </div>
              <Button className={s.button} theme="purpleSoft">Purchase</Button>
            </div>
          </div>
          <Heading title="More by this author" />
          <MarketplaceContainer cards={content} />
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

export default MarketplaceSinglePage;
