import React from 'react';
import cx from 'classnames';
import Shiitake from 'shiitake';

import s from './Card.module.sass';

type CardProps = {
  title: string
  description: string
  image: string
  author: {
    name: string
    image: string
  }
  className?: string
};

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  author,
  children,
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    className,
  );

  return (
    <div className={compoundClassName}>
      <div className={s.imageWrapper}>
        <img src={image} alt={title} />
        <div className={s.author}>
          <div className={s.authorImage}>
            <img src={author.image} alt={author.name} />
          </div>
          <h5 className={s.authorHeader}>{author.name}</h5>
        </div>
      </div>
      <Shiitake
        lines={1}
        throttleRate={200}
        className={s.title}
        tagName="h3"
      >
        {title}
      </Shiitake>
      <Shiitake
        lines={2}
        throttleRate={200}
        className={s.description}
        tagName="p"
      >
        {description}
      </Shiitake>
      {children}
    </div>
  );
};
