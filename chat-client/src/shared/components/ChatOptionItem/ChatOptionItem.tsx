import React, { FC, ReactNode } from 'react'
import styles from "./ChatOptionItem.module.scss"

interface Props {
  text: string
  icon: string
  onClick: () => void
}

const ChatOptionItem: FC<Props> = ({text, icon, onClick}) => {
  return (
    <div onClick={onClick} className={styles.root}>
      <img src={icon} className={styles.icon}/>
      <span className={styles.txt}>{text}</span>
    </div>
  )
}

export default ChatOptionItem