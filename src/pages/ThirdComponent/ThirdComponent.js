import { useContext, useRef, useState, useEffect } from 'react';

import ToastContext from '../../store/toast-context';
import TimerContext from '../../store/timer-context';

import CountryList from '../../components/CountryList/CountryList';

import styles from './ThirdComponent.module.css';

let firstRender = true;

const ThirdComponent = () => {
  const ctx = useContext(ToastContext);
  const ctxSecondary = useContext(TimerContext);
  const inputRef = useRef(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [timer, setTimer] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (!value) {
      alert('Please Enter Time');
      return;
    }
    ctxSecondary.setTimerHandler(value);
    ctx.addToastHandler(value);
    setTimer(+value);
    inputRef.current.value = '';
    setDisableBtn(true);
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    const countdown = setTimeout(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);

    ctx.changeToastTextHandler(timer);

    if (timer === 0) {
      clearTimeout(countdown);
      setShowCountries(true);
    }

    return () => {
      clearTimeout(countdown);
    };
  }, [timer]);
  return (
    <section className={`${styles.section} section`}>
      {!showCountries && (
        <div className={`${styles.container} container`}>
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.control}>
              <label className={styles.label} htmlFor='toastTime'>
                Enter Countdown Time
              </label>
              <input
                ref={inputRef}
                className={styles.input}
                placeholder='Enter Here'
                id='toastTime'
                type='number'
              />
            </div>
            <button disabled={disableBtn} className={`${styles.btn} btn`}>
              Start Timer
            </button>
          </form>
        </div>
      )}
      {showCountries && <CountryList />}
    </section>
  );
};

export default ThirdComponent;
