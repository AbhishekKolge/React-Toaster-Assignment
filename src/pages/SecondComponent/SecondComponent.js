import { useContext, useRef } from 'react';

import ToastContext from '../../store/toast-context';

import SettingsBtn from '../../components/UI/SettingsBtn/SettingsBtn';

import styles from './SecondComponent.module.css';

const SecondComponent = () => {
  const ctx = useContext(ToastContext);
  const inputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    ctx.addToastHandler(value);
    inputRef.current.value = '';
  };
  return (
    <section className={`${styles.section} section`}>
      <div className={`${styles.container} container`}>
        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.control}>
            <label className={styles.label} htmlFor='toastText'>
              Enter Custom Toast Text
            </label>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder='Enter Here'
              id='toastText'
              type='text'
            />
          </div>
          <button className={`${styles.btn} btn`}>
            Show Custom Toast Message
          </button>
        </form>
        <SettingsBtn />
      </div>
    </section>
  );
};

export default SecondComponent;
