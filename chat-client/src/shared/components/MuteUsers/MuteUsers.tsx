import React, { FC } from "react";
import { WsChatUserMutedDto } from "shared/models";
import MuteIcon from "shared/assets/sound-off.png";
import styles from "./MuteUsers.module.scss";

interface Props {
  mutedUsers: WsChatUserMutedDto[];
  toggleMuteUser: (mute: boolean, userId: string) => void;
}

const MuteUsers: FC<Props> = (props) => {
  const { mutedUsers, toggleMuteUser } = props;
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={MuteIcon.src} />
      </div>
      {mutedUsers.length == 0 && (
        <div className={styles.noMutedUsers}>No muted users!</div>
      )}
      {mutedUsers.length != 0 && (
        <div className={styles.mutedUsersContainer}>
          {mutedUsers.map((user) => {
            return (
              <div className={styles.userItem}>
                <div className={styles.details}>
                  <img src={user.user_avatar} className={styles.icon} />
                  <span>{user.user_name}</span>
                </div>
                <button
                  className={styles.unmuteBtn}
                  onClick={() => toggleMuteUser(false, user.user_id)}
                >
                  Unmute
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MuteUsers;
