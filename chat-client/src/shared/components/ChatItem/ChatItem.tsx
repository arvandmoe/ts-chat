import clsx from "clsx";
import { FC, useState } from "react";
import { WsChatMessageDto, WsChatMessageReplyToDto } from "shared/models";
import styles from "./ChatItem.module.scss";

interface Props {
  chatMessage: WsChatMessageDto;
  setReplyTo: (replyTo: WsChatMessageReplyToDto) => void;
  toggleMuteUser: (mute: boolean, userId: string) => void;
}

const ChatItem: FC<Props> = (props) => {
  const { chatMessage, setReplyTo, toggleMuteUser } = props;
  const [showActions, setShowActions] = useState(false);
  const isAdmin = chatMessage.user == null;

  const onReplyClicked = () => {
    setReplyTo(chatMessage);
    setShowActions(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {!isAdmin && (
          <img
            src={chatMessage.user?.user_avatar}
            className={styles.avatar}
            alt="avatar-image"
          />
        )}
        {isAdmin && (
          <>
            <div className={styles.greenBadge}>MOD</div>
            <span className={styles.greenTxt}>Admin</span>
          </>
        )}
        {!isAdmin && (
          <>
            <div className={styles.greenBadge}>User</div>
          </>
        )}
        {chatMessage.user?.user_name && (
          <span
            className={styles.name}
            onClick={() => setShowActions(!showActions)}
          >
            {chatMessage.user?.user_name}
          </span>
        )}
      </div>
      <div
        className={clsx(styles.message, {
          [styles.adminMessage]: isAdmin,
        })}
      >
        {chatMessage.reply_to && (
          <span className={styles.replyMessage}>
            @{chatMessage.reply_to.user?.user_name}
          </span>
        )}
        {chatMessage.message}
      </div>
      {showActions && (
        <div className={styles.actionsContainer}>
          <button className={styles.actionBtn} onClick={onReplyClicked}>
            Reply
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => {
              if(chatMessage.user?.user_name) toggleMuteUser(true, chatMessage.user?.user_id)
            }}
          >
            Mute
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
