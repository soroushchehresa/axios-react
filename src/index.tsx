import { useState, useEffect, ReactChildren, ReactChild } from 'react';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import isOnline from 'is-online';
// @ts-ignore
import root from 'window-or-global';

interface ChildrenProps {
  loading: boolean,
  error: AxiosError<any> | null,
  response: AxiosResponse<any> | null,
  refetch: () => void,
  networkStatus: string | null;
}

interface Props {
  children: (props: ChildrenProps) => ReactChild | ReactChild[] | ReactChildren | ReactChildren[] | JSX.Element | JSX.Element[];
  skip: boolean,
  config: AxiosRequestConfig,
}

export default ({ children, skip, config }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<any> | null>(null);
  const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
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
        .then((response: AxiosResponse<any>) => {
          setResponse(response);
          setLoading(false);
        })
        .catch((error: AxiosError<any>) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  return children({ loading, error, response, refetch: fetch, networkStatus }) as JSX.Element | JSX.Element[];
};
