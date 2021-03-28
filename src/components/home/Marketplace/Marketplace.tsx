import React from 'react';
import cx from 'classnames';

import { MarketplaceContainer } from '@containers/Marketplace';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import BackgroundIcon from '@icons/BackgroundHomeMarketplace.svg';

import s from './Marketplace.module.sass';

type MarketplaceProps = {
  className?: string
};

export const Marketplace: React.FC<MarketplaceProps> = ({ className }) => (
  <section className={cx(s.root, className)}>
    <Container>
      <Row>
        <MarketplaceContainer isHome />
      </Row>
    </Container>
    <BackgroundIcon className={s.icon} />
  </section>
);
