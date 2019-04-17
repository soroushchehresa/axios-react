/* eslint-disable */

import { Component } from 'react';
import isOnline from 'is-online';
import axios from 'axios';
import root from 'window-or-global';

export default class ReactUniversalXHR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      response: null,
      networkStatus: null,
    };
  }

  componentWillMount() {
    const { skip } = this.props;
    this.checkNetworkConnection();
    if (!skip) {
      this.fetch();
    }
  }

  checkNetworkConnection = () => {
    root.addEventListener('offline', () => {
      isOnline({ timeout: 1000 })
        .then(online => {
          if (!online) {
            this.setState({ networkStatus: 'offline' });
          }
        });
    });
    root.addEventListener('online', () => {
      isOnline({ timeout: 1000 })
        .then(online => {
          if (online) {
            this.setState({ networkStatus: 'online' });
          }
        });
    });
    isOnline({ timeout: 1000 })
      .then(online => {
        if ((online && this.state.networkStatus !== 'online') || (!online && this.state.networkStatus !== 'offline')) {
          this.setState({ networkStatus: online ? 'online' : 'offline' });
        }
      });
  };

  fetch = () => {
    const { config } = this.props;
    if (config) {
      this.setState({ loading: true });
      axios(config)
        .then((response) => {
          this.setState({ response, loading: false });
        })
        .catch((error) => {
          this.setState({ error: error, loading: false });
        });
    }
  };

  render() {
    const { fetch } = this;
    const { children } = this.props;
    const { loading, error, response, networkStatus } = this.state;
    return children({
      loading,
      error,
      response,
      refetch: fetch,
      networkStatus,
    });
  }
}
