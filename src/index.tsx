import { useState, useEffect, ReactChildren, ReactChild } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import isOnline from 'is-online';
// @ts-ignore
import root from 'window-or-global';

interface Props {
  children: ReactChild | ReactChildren;
  skip: boolean,
  config: AxiosRequestConfig,
}

export default (
  {
    children,
    skip,
    config,
  }: Props,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const [response, setResponse] = useState<object | null>(null);
  const [networkStatus, setNetworkStatus] = useState<string | null>(null);

  useEffect((): void => {
    checkNetworkConnection();
    if (!skip) {
      fetch();
    }
  }, []);

  const checkNetworkConnection = (): void => {
    if ((typeof document != 'undefined') && root && isOnline) {
      root.addEventListener('offline', () => {
        isOnline({ timeout: 1000 })
          .then(online => {
            if (!online) {
              setNetworkStatus('offline');
            }
          });
      });
      root.addEventListener('online', () => {
        isOnline({ timeout: 1000 })
          .then(online => {
            if (online) {
              setNetworkStatus('online');
            }
          });
      });
      isOnline({ timeout: 1000 })
        .then(online => {
          if ((online && networkStatus !== 'online') || (!online && networkStatus !== 'offline')) {
            setNetworkStatus(online ? 'online' : 'offline');
          }
        });
    }
  };

  const fetch = (): void => {
    if (config) {
      setLoading(true);
      axios(config)
        .then((response) => {
          setResponse(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  // @ts-ignore
  return children({ loading, error, response, refetch: fetch, networkStatus });
};
