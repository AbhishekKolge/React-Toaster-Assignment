import { useContext, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import ModalContext from '../../store/modal-context';
import TimerContext from '../../store/timer-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.css';

const Modal = () => {
  const ctx = useContext(ModalContext);
  const ctxSecondary = useContext(TimerContext);
  const inputRef = useRef(null);
  const preventClose = (e) => {
    e.stopPropagation();
  };
  const backdropVariant = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariant = {
    visible: { opacity: 1, y: 0, transition: 'tween' },
    hidden: { opacity: 0, y: -100, transition: 'tween' },
  };

  const setTimerHandler = (e) => {
    e.preventDefault();
    if (!inputRef.current.value.trim()) {
      alert('Please enter a timeout value');
      return;
    }
    ctxSecondary.setTimerHandler(inputRef.current.value.trim());
    ctx.toggleModal();
  };
  return (
    <AnimatePresence>
      {ctx.showModal && (
        <motion.div
          variants={backdropVariant}
          animate='visible'
          initial='hidden'
          exit='hidden'
          className={styles.backdrop}
          onClick={ctx.toggleModal}
        >
          <motion.div
            variants={modalVariant}
            animate='visible'
            initial='hidden'
            exit='hidden'
            className={styles.modal}
            onClick={preventClose}
          >
            <button onClick={ctx.toggleModal} className={styles.close}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <form onSubmit={setTimerHandler} className={styles.form}>
              <div className={styles.control}>
                <label className={styles.label} htmlFor='timeoutInput'>
                  Set timeout:
                </label>
                <input
                  ref={inputRef}
                  className={styles.input}
                  id='timeoutInput'
                  type='number'
                />
              </div>
              <button className={styles.btn}>Confirm</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
