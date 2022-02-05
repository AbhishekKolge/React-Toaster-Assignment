import ReactDOM from 'react-dom';

import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import FirstComponent from './pages/FirstComponent/FirstComponent';
import SecondComponent from './pages/SecondComponent/SecondComponent';
import ThirdComponent from './pages/ThirdComponent/ThirdComponent';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Notification from './components/Notification/Notification';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/component-1' element={<FirstComponent />} />
          <Route path='/component-2' element={<SecondComponent />} />
          <Route path='/component-3' element={<ThirdComponent />} />
          <Route path='*' element={<Navigate to='/component-1' />} />
        </Routes>
      </main>
      <Footer />
      {ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))}
      {ReactDOM.createPortal(
        <Notification />,
        document.getElementById('notification-root')
      )}
    </>
  );
};

export default App;
