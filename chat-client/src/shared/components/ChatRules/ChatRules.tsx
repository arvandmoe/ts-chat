import { FC } from "react";
import messageIcon from "shared/assets/chat.png";
import styles from "./ChatRules.module.scss";

interface Props {
    onClose: () => void;
}

const ChatRules: FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={messageIcon.src} />
      </div>
      <span className={styles.txt} style={{ marginTop: "24px" }}>
        No use of offensive or toxic language towards other users or moderators.
      </span>
      <span className={styles.txt} style={{ marginTop: "10px" }}>
        Not adhering to the rules can result in temporary or permanent ban from
        the group chat.
      </span>
      <div style={{ overflow: "auto", flexGrow: 1 }}></div>
      <button className={styles.button} onClick={onClose}>
        Alright
      </button>
    </div>
  );
};

export default ChatRules;
