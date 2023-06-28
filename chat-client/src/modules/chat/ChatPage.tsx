import clsx from "clsx";
import { NextPage } from "next";
import Head from "next/head";
import moreIcon from "shared/assets/more.png";
import signOutIcon from "shared/assets/log-out.png";
import sendIcon from "shared/assets/send.png";
import {
  Card,
  ChatInput,
  ChatItem,
  ChatOptionItem,
  ContainedButton,
  IconButton,
  Modal,
  ChatRules,
  MuteUsers,
} from "shared/components";
import styles from "./ChatPage.module.scss";
import useChat from "./hooks/useChat";
import muteIcon from "shared/assets/sound-off.png";
import chatRulesIcon from "shared/assets/help.png";
import hideChatIcon from "shared/assets/hide.png";

const ChatPage: NextPage = () => {
  const {
    messages,
    usersCount,
    isConnected,
    formik,
    replyTo,
    onSetReplyTo,
    showChatOptions,
    setShowChatOptions,
    showMutedUsers,
    toggleMuteUser,
    setShowMutedUsers,
    showChatRules,
    setShowChatRules,
    hideChat,
    setHideChat,
    onSignOut,
    mutedUsers,
  } = useChat();

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat | {isConnected ? "online" : "offline"}</title>
        <meta name="description" content="React chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showMutedUsers && (
        <Modal
          title="Mute Users"
          show={true}
          onClose={() => setShowMutedUsers(false)}
        >
          <MuteUsers mutedUsers={mutedUsers} toggleMuteUser={toggleMuteUser} />
        </Modal>
      )}

      {showChatRules && (
        <Modal
          title="Chat Rules"
          show={true}
          onClose={() => setShowChatRules(false)}
        >
          <ChatRules onClose={() => setShowChatRules(false)} />
        </Modal>
      )}

      <main className={styles.main}>
        <div className={styles.chatContainer}>
          <Card wrap={hideChat}>
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderDetail}>
                {isConnected && <div className={styles.onlineDot} />}
                {!isConnected && <div className={styles.offlineDot} />}
                <span className={styles.title}>
                  {isConnected ? "Online Users" : "Offline"} &nbsp;{" "}
                  {isConnected && usersCount}
                </span>
              </div>
              {!hideChat ? (
                <img
                  src={moreIcon.src}
                  alt="more"
                  className={clsx(styles.moreIcon, {
                    [styles.moreIconActive]: showChatOptions,
                  })}
                  onClick={() => setShowChatOptions(!showChatOptions)}
                />
              ) : (
                <img
                  src={signOutIcon.src}
                  className={styles.moreIcon}
                  alt="sign-out"
                  onClick={() => onSignOut()}
                />
              )}
            </div>
            {!hideChat && (
              <>
                {showChatOptions && (
                  <div className={styles.chatOptionsContainer}>
                    <ChatOptionItem
                      text="Muted Users"
                      icon={muteIcon.src}
                      onClick={() => {
                        setShowMutedUsers(true);
                        setShowChatOptions(false);
                      }}
                    />
                    <ChatOptionItem
                      text="Chat Rules"
                      icon={chatRulesIcon.src}
                      onClick={() => {
                        setShowChatRules(true);
                        setShowChatOptions(false);
                      }}
                    />
                    <ChatOptionItem
                      text="Hide Chat"
                      icon={hideChatIcon.src}
                      onClick={() => {
                        setHideChat(true);
                        setShowChatOptions(false);
                      }}
                    />
                  </div>
                )}
                {messages.length > 0 && (
                  <div className={styles.messagesContainer}>
                    {messages
                      .filter(
                        ({ user }) =>
                          !mutedUsers.some(
                            (item) => item.user_id === user?.user_id
                          )
                      )
                      .map((chatMessage) => (
                        <ChatItem
                          key={chatMessage.id}
                          chatMessage={chatMessage}
                          setReplyTo={onSetReplyTo}
                          toggleMuteUser={toggleMuteUser}
                        />
                      ))}
                  </div>
                )}
                {messages.length == 0 && (
                  <div className={styles.noMessages}>
                    <span>No messages</span>
                  </div>
                )}
                <form
                  className={styles.chatActions}
                  onSubmit={formik.handleSubmit}
                >
                  <ChatInput
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    replyTo={replyTo}
                    onCancelReply={() => onSetReplyTo(undefined)}
                  />
                  <IconButton icon={sendIcon.src} size={28} />
                </form>
              </>
            )}
            {hideChat && (
              <ContainedButton
                title="Show Chat"
                onClick={() => setHideChat(false)}
              />
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
