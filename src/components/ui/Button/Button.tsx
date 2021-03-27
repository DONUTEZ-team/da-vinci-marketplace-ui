/* eslint-disable react/button-has-type */
import React from 'react';
import Link, { LinkProps } from 'next/link';
import cx from 'classnames';
import { motion } from 'framer-motion';

import s from './Button.module.sass';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  theme?: keyof typeof themeClass
  sizeT?: keyof typeof sizeClass
  disabledView?: boolean
  external?: boolean
  className?: string
} & (
  | React.HTMLProps<HTMLButtonElement>
  | LinkProps
  | React.HTMLProps<HTMLAnchorElement>
);

const themeClass = {
  purple: s.purple,
  purpleSoft: s.purpleSoft,
  green: s.green,
  blue: s.blue,
};

const sizeClass = {
  small: s.small,
  medium: s.medium,
  large: s.large,
};

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  theme = 'purple',
  sizeT = 'small',
  external = false,
  disabledView,
  className,
  children,
  ...props
}) => {
  const compoundClassName = cx(
    s.root,
    { [s.disabled]: disabledView },
    themeClass[theme],
    sizeClass[sizeT],
    className,
  );

  if ('href' in props) {
    if (external) {
      return (
        <a
          target="_blank"
          rel="noreferrer noopener"
          className={compoundClassName}
          {...(props as React.HTMLProps<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...(props as LinkProps)}>
        <motion.a
          className={compoundClassName}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      // @ts-ignore
      type={type}
      {...(props as React.HTMLProps<HTMLButtonElement>)}
      className={compoundClassName}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};
