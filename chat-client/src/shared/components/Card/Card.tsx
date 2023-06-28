import clsx from "clsx";
import { FC, ReactNode } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  wrap?: boolean
}

const Card: FC<CardProps> = (props) => {
  const { children, wrap = false } = props;
  return <div className={clsx(styles.card, {
    [styles.wrap] : wrap
  })}>{children}</div>;
};

export default Card;
