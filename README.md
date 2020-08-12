# Axios React
[![NPM](https://img.shields.io/npm/v/axios-react.svg)](https://www.npmjs.com/package/axios-react)
![npm](https://img.shields.io/npm/dt/axios-react)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

HTTP client component for React with child function callback to creating async requests in render based on [Axios](https://github.com/axios/axios).


## Installation:
Yarn:
```bash
$ yarn add axios-react
```
npm:
```bash
$ npm i -S axios-react
```

## Live example:
**[Online Playground](https://stackblitz.com/edit/react-2et9ls)**

## Usage:

```jsx
import React, { Fragment } from 'react';
import Request from 'axios-react';

const Demo = () => (
  <Request
    config={{
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    }}
    skip={false} // optional - default is false
  >
    {({ loading, response, error, refetch, networkStatus }) => (
      <Fragment>
          {networkStatus && <span>{networkStatus}</span>}
          {loading && <span>Loading...</span>}
          {error && <span>{error.response.data}</span>}
          {response && <h3>{response.data.title}</h3>}
          <button onClick={refetch}>Refetch!</button>
      </Fragment>
    )}
  </Request>
);
```

You can use the `skip` to disable send the request on the component mounting and you can resend the request using the `refetch` method every time.

## Request config:
These are the available config options for making requests. Only the URL is required. Requests will default to get if the method is not specified. You can use all of the [Axios request config options](https://github.com/axios/axios#request-config)


## Response schema:
The response for a request contains the [Axios response schema](https://github.com/axios/axios#response-schema).


## Support:
<a href="https://www.patreon.com/soroushchehresa">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
