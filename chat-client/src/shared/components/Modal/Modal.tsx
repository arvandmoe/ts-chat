import React, { FC } from 'react'
import styles from './Modal.module.scss'

interface Props {
    title: string
    show: boolean
    onClose: () => void
    children?: React.ReactNode
}

const Modal: FC<Props> = ({title , show, onClose, children}) => {
  return (
    <div className={styles.modal}>
      <section className={styles.modalMain}>
        <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.closeButton} onClick={onClose}>
          <span>x</span>
        </div>
        <div  style={{ height: '20px'}}/>
        {children}
      </section>
    </div>
  )
}

export default Modal