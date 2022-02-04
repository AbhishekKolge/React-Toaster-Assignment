import { useEffect, useState } from 'react';

import styles from './CountryList.module.css';

const CountryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [fromPage, setFromPage] = useState(0);
  const [toPage, setToPage] = useState(itemsPerPage);
  const fetchHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.knowmee.co/api/v1/master/get-country-list'
      );

      if (!response.ok) {
        throw new Error('Something went wrong...!');
      }

      const data = await response.json();
      setCountryList(data.responseData);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchHandler();
  }, []);

  const nextPageHandler = () => {
    if (toPage >= countryList.length) {
      return;
    }
    setFromPage((prevState) => {
      return prevState + itemsPerPage;
    });

    setToPage((prevState) => {
      return prevState + itemsPerPage;
    });
  };

  const prevPageHandler = () => {
    setFromPage((prevState) => {
      return prevState - itemsPerPage;
    });

    setToPage((prevState) => {
      return prevState - itemsPerPage;
    });
  };
  return (
    <div className={styles.container}>
      {isLoading && (
        <p className={styles.loading}>Fetching Data, Please wait...</p>
      )}
      {!isLoading && countryList.length > 0 && (
        <>
          <div className={styles.wrapper}>
            <button
              disabled={fromPage === 0}
              onClick={prevPageHandler}
              className={styles.btn}
            >
              Previous
            </button>
            <button
              disabled={toPage >= countryList.length}
              onClick={nextPageHandler}
              className={styles.btn}
            >
              Next
            </button>
          </div>
          <ul className={styles.list}>
            {countryList.slice(fromPage, toPage).map((country) => {
              return (
                <li key={country.country_id} className={styles.item}>
                  {country.country_name}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CountryList;
