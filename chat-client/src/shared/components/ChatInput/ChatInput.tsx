import React, { ChangeEvent, FC, FormEvent } from "react";
import { WsChatMessageReplyToDto } from "shared/models";
import styles from "./ChatInput.module.scss";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<any>) => void;
  replyTo?: WsChatMessageReplyToDto;
  onCancelReply: () => void;
}

const ChatInput: FC<Props> = ({ value, onChange, replyTo, onCancelReply }) => {
  return (
    <div className={styles.inputContainer}>
      {replyTo && (
        <span className={styles.replyTxt} onClick={onCancelReply}>
          @{replyTo.user?.user_name} &nbsp;
        </span>
      )}
      <input
        id="message"
        className={styles.input}
        placeholder="Write a message"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ChatInput;
