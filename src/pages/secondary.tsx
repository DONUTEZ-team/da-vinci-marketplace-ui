import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';

import { BaseLayout } from '@layouts/BaseLayout';
import { Row } from '@components/ui/Row';
import { Container } from '@components/ui/Container';
import WeatherIcon from '@icons/Weather.svg';

import s from '@styles/Home.module.sass';

const Secondary: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'secondary']);

  return (
    <BaseLayout>
      <Container>
        <Row className={s.row}>
          <NextSeo
            title={t('secondary:Secondary page')}
            description={t('secondary:Secondary page description. Couple sentences...')}
            openGraph={{
              title: t('secondary:Secondary page'),
              description: t('secondary:Secondary page description. Couple sentences...'),
            }}
          />

          <div className={s.main}>
            <h1 className={s.title}>
              <WeatherIcon className={s.icon} />
              {t('secondary:Welcome to Secondary Page')}
            </h1>

            <p className={cx(s.description, s.secondaryDescription)}>
              {t('secondary:To edit this page open file')}
              {' '}
              <code className={s.code}>pages/secondary.tsx</code>
            </p>

            <span>
              {t('common:Change language')}
              :
              {' '}
              {router.locales?.map((locale) => (
                <React.Fragment key={locale}>
                  <Link href="/secondary" locale={locale}>{locale.toUpperCase()}</Link>
                  {' '}
                </React.Fragment>
              ))}
            </span>
          </div>
        </Row>
      </Container>
    </BaseLayout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'secondary']),
  },
});

export default Secondary;
