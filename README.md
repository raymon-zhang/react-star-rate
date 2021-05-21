<a href="https://raymon-zhang.github.io/react-star-rate">
    <p align="center"><img height=100 alt="React Star Rate" src="https://github.com/raymon-zhang/react-star-rate/raw/main/assets/header.svg"/></p>
</a>

<div align="center">
    <img src="https://badgen.net/npm/v/react-star-rate" alt="NPM Version" />
  <img src="https://badgen.net/bundlephobia/minzip/react-star-rate" alt="minzipped size"/>
    <img src="https://github.com/raymon-zhang/react-star-rate/workflows/CI/badge.svg" alt="Build Status" />
</div>
<br />
<div align="center"><strong>Lightweight, customizable star ratings component for React.</strong></div>
<br />
<div align="center">
  <sub>Created by <a href="https://github.com/raymon-zhang">Raymon Zhang</a></sub>
</div>

<br />

## Features

- 🔩 **Easily Customizable**
- 🕊 **Lightweight** - _less than 4kb including styles_
- ✅ **Accessible**

## Table of contents

- [Installation](#installation)
  - [With yarn](#with-yarn)
  - [With NPM](#with-npm)
- [Getting Started](#getting-started)
- [Props](#props)
- [Example](#example)

## Installation

#### With yarn

```sh
yarn add react-star-rate
```

#### With NPM

```sh
npm install react-star-rate
```

## Getting Started

You can add React Stars Rating to your project using the `<StarsRating />` component.

```jsx
import { useState } from 'react';

import StarsRating from 'react-star-rate';

const App = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <StarsRating
        value={value}
        onChange={value => {
          setValue(value);
        }}
      />
    </div>
  );
};
```

## Props

| Name              | Type     | Default             | Description                                                                        |
| ----------------- | -------- | ------------------- | ---------------------------------------------------------------------------------- |
| `allowClear`      | boolean  | `true`              | Allow the value to be reset when clicked again                                     |
| `allowHalf`       | boolean  | `true`              | Support half of the star to be selected                                            |
| `autoFocus`       | boolean  | -                   | Automatically focus the element                                                    |
| `classNamePrefix` | string   | `"react-star-rate"` | The components will have classNames with the given prefix                          |
| `count`           | number   | `5`                 | Number of stars                                                                    |
| `defaultValue`    | number   | `0`                 | The default value of the stars. Should be the same as the default `useState` value |
| `direction`       | string   | `"ltr"`             | The direction of the selected stars. Either `"ltr"` or `"rtl"`                     |
| `disabled`        | boolean  | `false`             | Disable the rating element                                                         |
| `onBlur`          | function | -                   | Will be triggered on blur                                                          |
| `onChange`        | function | `(value) => {}`     | Will be triggered on change of value                                               |
| `onFocus`         | function | -                   | Will be triggered on focus                                                         |
| `onHoverChange`   | function | `(value) => {}`     | Will be triggered on hover                                                         |
| `style`           | object   | `{}`                | Custom styles                                                                      |
| `symbol`          | string   | `"★"`               | The symbol to be displayed                                                         |
| `tabIndex`        | number   | `0`                 | The tab index of the stars container                                               |
| `value`           | number   | `-`                 | Controlled value of the component                                                  |

## Example

You can visit the example here: [https://codesandbox.io/s/react-star-rate-okxlw](https://codesandbox.io/s/react-star-rate-okxlw).
