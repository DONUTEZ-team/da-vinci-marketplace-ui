import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Shiitake from 'shiitake';
import { motion } from 'framer-motion';

import { Author } from '@components/common/Author';

import s from './Card.module.sass';

type CardProps = {
  href?: string
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
  href,
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

  const [imageFinal, setImageFinal] = useState('');

  const download = useCallback(() => {
    const url = image;
    if (!url) return;

    const req = new XMLHttpRequest();
    // @ts-ignore
    req.responseType = 'text/html';

    req.onload = () => {
      const img = new Image();
      img.onload = function onload() {
        document.body.appendChild(img);
      };

      setImageFinal(req.response);
    };

    req.open('GET', url, true);
    req.send();
  }, [image]);

  download();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={compoundClassName}
    >
      {href && (
        <Link href={href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a className={s.link} />
        </Link>
      )}
      <div className={s.imageWrapper}>
        <img src={imageFinal} alt={title} />
        <Author author={author} className={s.author} />
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
    </motion.div>
  );
};
