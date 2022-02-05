import { useContext, useEffect } from 'react';

import ToastContext from '../../store/toast-context';

import SettingsBtn from '../../components/UI/SettingsBtn/SettingsBtn';

import styles from './FirstComponent.module.css';

const FirstComponent = () => {
  const ctx = useContext(ToastContext);
  const addToastMessage = () => {
    ctx.addToastHandler();
  };

  useEffect(() => {
    ctx.clearNotificationHandler();
  }, []);
  return (
    <section className={`${styles.section} section`}>
      <div className={`${styles.container} container`}>
        <button onClick={addToastMessage} className={`${styles.btn} btn`}>
          Show Toast Message
        </button>
        <SettingsBtn />
      </div>
    </section>
  );
};

export default FirstComponent;
