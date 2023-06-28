import clsx from "clsx";
import React, { FC } from "react";
import styles from "./ContainedButton.module.scss";

interface Props {
  title: string;
  disabled?: boolean;
  onClick: () => void;
}

const ContainedButton: FC<Props> = ({ title, disabled = false, onClick }) => {
  return (
    <button
      className={clsx(styles.btn, {
        [styles.btnActive]: !disabled,
      })}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.btnTxt}>{title}</span>
    </button>
  );
};

export default ContainedButton;
