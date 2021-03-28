import React from 'react';
import cx from 'classnames';

import { shortize } from '@utils/helpers';

import s from './Author.module.sass';

type AuthorProps = {
  author: {
    image: string
    name: string
  }
  className?: string
};

export const Author: React.FC<AuthorProps> = ({ author, className }) => (
  <div className={cx(s.root, className)}>
    <div className={s.image}>
      <img src={author.image} alt={author.name} />
    </div>
    <h5 className={s.name}>{shortize(author.name)}</h5>
  </div>
);
