<a href="https://raymon-zhang.github.io/react-star-rate">
  <p align="center">
    <img height=100 alt="React Star Rate" src="https://github.com/raymon-zhang/react-star-rate/raw/main/assets/header.svg"/>
  </p>
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
<div align="center">
  <img alt="React Star Rate" src="https://github.com/raymon-zhang/react-star-rate/raw/main/assets/demo.svg" />
</div>

<br />

## Features

- 🔩 **Easily Customizable**
- 🕊 **Lightweight** - _less than 4kb including styles_
- ✅ **Accessible**

## Table of contents

- [Example](#example)
- [Installation](#installation)
  - [With yarn](#with-yarn)
  - [With NPM](#with-npm)
- [Getting Started](#getting-started)
- [Props](#props)
- [Styling](#styling)
  - [Style Object](#style-object)
    - [Style Keys](#style-keys)
  - [With CSS](#with-css)
    - [Classnames](#classnames)
- [License](#license)

## Example

You can visit the example here:
<br />
[![View on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-star-rate-okxlw)

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
| `allowHalf`       | boolean  | `true`              | Allow half of the star to be selected                                              |
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
| `style`           | object   | `{}`                | Custom styles. See [styling](#styling)                                             |
| `symbol`          | string   | `"★"`               | The symbol to be displayed                                                         |
| `tabIndex`        | number   | `0`                 | The tab index of the stars container                                               |
| `value`           | number   | `-`                 | Controlled value of the component                                                  |

## Styling

### Style Object

Each component inside the `StarsRating` component is keyed and ships with default styles. You can apply custom styles by accessing the key on the `style` prop.

#### Style Keys

- `style.style` - The main wrapper `ul` element.
- `style.full` - Styles for when the star is fully active.
  - `style.full.star` - The wrapper `li` element every star.
  - `style.full.first` - The first half star, on top.
  - `style.full.second` - The second full star, in the background.
- `style.half` - Styles for when the star is half active.
  - `style.half.star` - The wrapper `li` element every star.
  - `style.half.first` - The first half star, on top.
  - `style.half.second` - The second full star, in the background.
- `style.zero` - Styles for when the star is not active.
  - `style.zero.star` - The wrapper `li` element every star.
  - `style.zero.first` - The first half star, on top.
  - `style.zero.second` - The second full star, in the background.
- `style.hover` - Styles for when the element is hovered over. You can use access of the keys listed above in the `hover` object.

### With CSS

You can also apply custom styles using CSS Stylesheets. The classnames are determined with the `classNamePrefix` prop (defaults to `"react-star-rate"`).

#### Classnames

- `${classNamePrefix}` - The main `ul` element.
- `${classNamePrefix}--ltr` | - `${classNamePrefix}--rtl` - If the rating component is from left-to-right or right-to-left respectively.
- `${classNamePrefix}__star` - The star `li` element.
- `${classNamePrefix}__star--zero` | `${classNamePrefix}__star--half` | `${classNamePrefix}__star--full` - When the star is inactive, half, or completely full.
- `${classNamePrefix}__star__first` - The first half star, on top.
- `${classNamePrefix}__star__second` - The second full star, in the background.

## License

[MIT](https://github.com/raymon-zhang/react-star-rate/blob/main/LICENSE) Licensed. Copyright (c) 2021-present, Raymon Zhang.
