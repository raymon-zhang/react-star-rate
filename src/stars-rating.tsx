import * as React from 'react';

import { setup, css, CSSAttribute } from 'goober';
import { prefix } from 'goober/prefixer';

import Star from './star';

setup(React.createElement, prefix);

const noop = () => {};

export interface StarsRatingProps {
  allowClear?: boolean;
  allowHalf?: boolean;
  autoFocus?: boolean;
  classNamePrefix?: string;
  count?: number;
  defaultValue?: number;
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: (value?: number) => void;
  onFocus?: () => void;
  onHoverChange?: (value?: number) => void;
  style?: StarsRatingStyles;
  symbol?: React.ReactNode;
  tabIndex?: number;
  value?: number;
}

type StarsRatingStyles = {
  style?: CSSAttribute;
  full?: {
    first?: CSSAttribute;
    second?: CSSAttribute;
    star?: CSSAttribute;
  };
  half?: {
    first?: CSSAttribute;
    second?: CSSAttribute;
    star?: CSSAttribute;
  };
  zero?: {
    first?: CSSAttribute;
    second?: CSSAttribute;
    star?: CSSAttribute;
  };
  hover?: Omit<StarsRatingStyles, 'hover'>;
};

interface StarsRatingState {
  clearedValue?: number;
  hoverValue?: number;
  value?: number;
}

class StarsRating extends React.Component<StarsRatingProps, StarsRatingState> {
  static defaultProps = {
    allowClear: true,
    allowHalf: true,
    classNamePrefix: 'react-star-rate',
    count: 5,
    defaultValue: 0,
    direction: 'ltr',
    disabled: false,
    onChange: noop,
    onHoverChange: noop,
    style: {},
    symbol: '★',
    tabIndex: 0,
  };

  ratingContainerRef?: HTMLUListElement | null;

  starRefs?: { [key: number]: Star };

  constructor(props: StarsRatingProps) {
    super(props);

    const { defaultValue, value } = props;

    this.starRefs = {};

    this.state = {
      value: value ?? defaultValue,
    };
  }

  componentDidMount() {
    const { autoFocus, disabled } = this.props;
    if (autoFocus && !disabled) {
      this.focus();
    }
  }

  static getDerivedStateFromProps(
    nextProps: StarsRatingProps,
    state: StarsRatingState
  ) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      return {
        ...state,
        value: nextProps.value,
      };
    }
    return state;
  }

  onHover = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    const { onHoverChange } = this.props;
    const { clearedValue } = this.state;
    const hoverValue = this.getStarValue(index, event.pageX);
    if (hoverValue !== clearedValue) {
      this.setState({
        hoverValue,
        clearedValue: undefined,
      });
    }
    onHoverChange!(hoverValue);
  };

  onMouseLeave = () => {
    const { onHoverChange } = this.props;
    this.setState({
      hoverValue: undefined,
      clearedValue: undefined,
    });
    onHoverChange!(undefined);
  };

  onClick = (event: React.MouseEvent, index: number) => {
    const { allowClear } = this.props;
    const { value } = this.state;
    const newValue = this.getStarValue(index, event.pageX);
    const isClear = allowClear ? newValue === value : false;
    this.onMouseLeave();
    this.changeValue(isClear ? 0 : newValue);
    this.setState({
      clearedValue: isClear ? newValue : undefined,
    });
  };

  onFocus = () => {
    const { onFocus } = this.props;
    onFocus && onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    onBlur && onBlur();
  };

  changeValue = (value: number) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    onChange!(value);
  };

  saveStarRef = (index: number) => (node: Star) => {
    this.starRefs![index] = node;
  };

  getStarValue = (index: number, x: number) => {
    const { direction } = this.props;
    const reverse = direction === 'rtl';
    return this.starRefs![index].getValue(x, reverse);
  };

  focus = () => {
    const { disabled } = this.props;
    if (!disabled) {
      this.ratingContainerRef?.focus();
    }
  };

  render() {
    const {
      allowHalf,
      classNamePrefix,
      count,
      direction,
      disabled,
      style,
      symbol,
      tabIndex,
    } = this.props;
    const { hoverValue, value } = this.state;

    const stars = [];
    for (let index = 0; index < (count ?? 0); index++) {
      stars.push(
        <Star
          allowHalf={allowHalf}
          classNamePrefix={classNamePrefix}
          count={count}
          disabled={disabled}
          index={index}
          key={index}
          ref={this.saveStarRef(index)}
          onClick={this.onClick}
          onHover={this.onHover}
          reverse={direction === 'rtl'}
          style={{
            full: style?.full?.star,
            half: style?.half?.star,
            zero: style?.zero?.star,
          }}
          styleFull={style?.full}
          styleFullHover={style?.hover?.full}
          styleHalf={style?.half}
          styleHalfHover={style?.hover?.half}
          styleHover={{
            full: style?.hover?.full?.star,
            half: style?.hover?.half?.star,
            zero: style?.hover?.zero?.star,
          }}
          styleZero={style?.zero}
          styleZeroHover={style?.hover?.zero}
          symbol={symbol}
          value={hoverValue === undefined ? value : hoverValue}
        />
      );
    }

    const ListContainerStyles = css`
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 40px;
      display: inline-block;
      vertical-align: middle;
      font-weight: normal;
      font-style: normal;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `;

    const ListContainerHoverStyles = css({
      '&:hover': style?.hover?.style,
    });

    return (
      <ul
        aria-label="Stars Rating"
        className={`${classNamePrefix} ${ListContainerStyles} ${ListContainerHoverStyles} ${
          direction === 'rtl'
            ? `${classNamePrefix}--rtl ${css`
                direction: rtl;
              `}`
            : `${classNamePrefix}--ltr ${css`
                direction: ltr;
              `}`
        }`}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onMouseLeave={disabled ? undefined : this.onMouseLeave}
        ref={ref => {
          this.ratingContainerRef = ref;
        }}
        role="radiogroup"
        style={style?.style}
        tabIndex={disabled ? -1 : tabIndex}
      >
        {stars}
      </ul>
    );
  }
}

export default StarsRating;
