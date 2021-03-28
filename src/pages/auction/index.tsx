import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { AuctionContainer } from '@containers/Auction';
import { BaseLayout } from '@layouts/BaseLayout';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';

import s from '@styles/Home.module.sass';

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
          <AuctionContainer />
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
