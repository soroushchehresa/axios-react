<div align="center">
  
# Axios React
[![NPM](https://img.shields.io/npm/v/axios-react.svg)](https://www.npmjs.com/package/axios-react)
[![NPM](https://img.shields.io/npm/dt/axios-react)](https://www.npmjs.com/package/axios-react)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

HTTP client component for React with child function callback to create async requests in render based on [Axios](https://github.com/axios/axios).
</div>

<br>

## Installation
Yarn:
```bash
$ yarn add axios-react
```
npm:
```bash
$ npm i -S axios-react
```

<br>

## Live example
**[Online Playground](https://stackblitz.com/edit/react-2et9ls)**

<br>

## Usage

```jsx
import React from 'react';
import Request from 'axios-react';

const Demo = () => (
  <Request
    config={{
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos/1',
    }}
  >
    {({ loading, response, error, refetch, networkStatus }) => (
      <div>
          {networkStatus && <span>{networkStatus}</span>}
          {loading && <span>Loading...</span>}
          {error && <span>{error.response.data}</span>}
          {response && <h3>{response.data.title}</h3>}
          <button onClick={refetch}>Refetch!</button>
      </div>
    )}
  </Request>
);
```

<br>

## Arguments
| Name | Type | Description |
| ---- | ---- | ----------- |
| loading | boolean | Request loading. |
| response | object | The response for a request contains the [Axios response schema](https://github.com/axios/axios#response-schema). |
| error | object | The error for a request. |
| refetch | function | Refetch method for a request. |
| networkStatus | string | Network Connection Status. |

<br>

## Props

| Name | Type | Default value | Options | Description |
| ---- | ---- |------ | ------------- | ----------- |
| config | object | None | [Axios request config options](https://github.com/axios/axios#request-config) | Config options for making requests. |
| skip | boolean | false | true or false | Disable sending requests when mounting the component. |

<br>

## Read more
- [The easiest way to create HTTP requests in React.js](https://medium.com/@soroushchehresa/the-easiest-way-to-create-http-requests-in-react-js-6fa4b1819b3c)

<br>

## Support
<a href="https://www.patreon.com/soroushchehresa">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
