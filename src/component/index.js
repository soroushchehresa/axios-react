import { useState, useEffect } from 'react';
import isOnline from 'is-online';
import axios from 'axios';
import root from 'window-or-global';

export default ({ children, skip }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(null);

  useEffect(() => {
    checkNetworkConnection();
    if (!skip) {
      this.fetch();
    }
  });

  const checkNetworkConnection = () => {
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
        if ((online && this.state.networkStatus !== 'online') || (!online && this.state.networkStatus !== 'offline')) {
          setNetworkStatus(online ? 'online' : 'offline');
        }
      });
  };

  const fetch = () => {
    const { config } = this.props;
    if (config) {
      setLoading(true);
      axios(config)
        .then((response) => {
          this.setState({ response, loading: false });
          setResponse(response);
          setLoading(false);
        })
        .catch((error) => {
          this.setState({ error: error, loading: false });
          setError(error);
          setLoading(false);
        });
    }
  };

  return children({
    loading,
    error,
    response,
    refetch: fetch,
    networkStatus,
  });
}
