import React, { FC } from "react";
import styles from "./IconButton.module.scss";

interface Props {
  icon: string;
  size: number;
}

const IconButton: FC<Props> = (props) => {
  const { icon, size } = props;
  return (
    <button className={styles.iconContainer} type="submit">
      <img src={icon} className={styles.icon}/>
    </button>
  );
};

export default IconButton;
