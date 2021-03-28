import React from 'react';
import cx from 'classnames';

import { AuctionContainer } from '@containers/Auction';
import { Container } from '@components/ui/Container';
import { Row } from '@components/ui/Row';
import BackgroundIcon from '@icons/BackgroundHomeAuction.svg';

import s from './Auction.module.sass';

type AuctionProps = {
  className?: string
};

export const Auction: React.FC<AuctionProps> = ({ className }) => (
  <section className={cx(s.root, className)}>
    <BackgroundIcon className={s.icon} />
    <Container>
      <Row>
        <AuctionContainer isHome />
      </Row>
    </Container>
  </section>
);
