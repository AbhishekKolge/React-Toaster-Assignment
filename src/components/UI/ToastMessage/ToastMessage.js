import { useContext, useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import ToastContext from '../../../store/toast-context';
import TimerContext from '../../../store/timer-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './ToastMessage.module.css';

const ToastMessage = (props) => {
  const ctx = useContext(ToastContext);
  const ctxSecondary = useContext(TimerContext);
  const [counter, setCounter] = useState(0);
  const deleteToastMessage = () => {
    ctx.deleteToastHandler(props.id);
  };

  useEffect(() => {
    let timer;
    if (counter !== null) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
    }

    if (counter >= ctxSecondary.timer) {
      ctx.deleteToastHandler(props.id);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const stopCounterHandler = () => {
    setCounter(null);
  };

  const startCounterHandler = () => {
    setCounter(0);
  };

  const toastVariant = {
    visible: { opacity: 1, transition: 'tween' },
    hidden: { opacity: 0, transition: 'tween' },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={toastVariant}
        animate='visible'
        initial='hidden'
        exit='hidden'
        onMouseEnter={stopCounterHandler}
        onMouseLeave={startCounterHandler}
        className={styles.toast}
      >
        <span className={styles.text}>{props.text}</span>{' '}
        <button onClick={deleteToastMessage} className={styles.close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToastMessage;
