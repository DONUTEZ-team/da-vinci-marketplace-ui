import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { BaseLayout } from '@layouts/BaseLayout';
import { FirstScreen } from '@components/home/FirstScreen';
import { Marketplace } from '@components/home/Marketplace';
import { Auction } from '@components/home/Auction';

import s from '@styles/Home.module.sass';

const Home: React.FC = () => {
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
      <FirstScreen />
      <Marketplace />
      <Auction />
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
});

export default Home;
