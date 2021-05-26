import * as React from 'react';

import { css, CSSAttribute } from 'goober';

export interface StarProps {
  allowHalf?: boolean;
  classNamePrefix?: string;
  count?: number;
  disabled?: boolean;
  index?: number;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, index: number) => void;
  onHover?: (e: React.MouseEvent<HTMLLIElement>, index: number) => void;
  reverse?: boolean;
  style?: { full?: CSSAttribute; half?: CSSAttribute; zero?: CSSAttribute };
  styleFull?: { first?: CSSAttribute; second?: CSSAttribute };
  styleFullHover?: { first?: CSSAttribute; second?: CSSAttribute };
  styleHalf?: { first?: CSSAttribute; second?: CSSAttribute };
  styleHalfHover?: { first?: CSSAttribute; second?: CSSAttribute };
  styleHover?: {
    full?: CSSAttribute;
    half?: CSSAttribute;
    zero?: CSSAttribute;
  };
  styleZero?: { first?: CSSAttribute; second?: CSSAttribute };
  styleZeroHover?: { first?: CSSAttribute; second?: CSSAttribute };
  symbol?: React.ReactNode;
  value?: number;
}

export class Star extends React.Component<StarProps> {
  starRef?: HTMLLIElement | null;

  onClick: React.MouseEventHandler<HTMLLIElement> = e => {
    const { index, onClick } = this.props;
    onClick!(e, index!);
  };

  onHover: React.MouseEventHandler<HTMLLIElement> = e => {
    const { index, onHover } = this.props;
    onHover!(e, index!);
  };

  getStarType = () => {
    const { allowHalf, index, value } = this.props;
    const starValue = index! + 1;

    if (allowHalf && value! + 0.5 >= starValue && value! < starValue) {
      return 'half';
    } else if (starValue <= value!) {
      return 'full';
    }

    return 'zero';
  };

  getValue = (x: number, reverse: boolean) => {
    const { allowHalf, index } = this.props;
    let value = index! + 1;
    if (allowHalf) {
      const doc = this.starRef!.ownerDocument;
      const { body } = doc!;
      const docElem = doc.documentElement;
      const box = this.starRef?.getBoundingClientRect();
      let left = box?.left;
      left! -= docElem?.clientLeft || body.clientLeft || 0;
      const w: Window = doc.defaultView || (doc as any).parentWindow;
      let ret = w.pageXOffset;
      const method = 'scrollLeft';
      if (typeof ret !== 'number') {
        ret = doc.documentElement[method];
        if (typeof ret !== 'number') {
          ret = doc.body[method];
        }
      }
      left! += ret;
      const width = this.starRef?.clientWidth;
      if (!reverse && x - left! < width! / 2) {
        value -= 0.5;
      } else if (reverse && x - left! > width! / 2) {
        value -= 0.5;
      }
    }

    return value;
  };

  render() {
    const {
      classNamePrefix,
      count,
      disabled,
      index,
      reverse,
      style,
      styleFull,
      styleFullHover,
      styleHalf,
      styleHalfHover,
      styleHover,
      styleZero,
      styleZeroHover,
      symbol,
      value,
    } = this.props;

    const symbolNode =
      typeof symbol === 'function' ? symbol(this.props) : symbol;

    const starType = this.getStarType();

    const classNameMap = {
      zero: `${classNamePrefix}__star--zero`,
      half: `${classNamePrefix}__star--half`,
      full: `${classNamePrefix}__star--full`,
    };
    const className = `${classNamePrefix}__star ${classNameMap[starType]}`;

    const styleMap = { zero: styleZero, full: styleFull, half: styleHalf };
    const styleHoverMap = {
      zero: styleZeroHover,
      full: styleFullHover,
      half: styleHalfHover,
    };

    const FirstStarStyles = css`
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;
      opacity: 0;
      transition: all 500ms ease;
    `;

    const FirstStarHoverStyles = css({
      '&:hover': styleHoverMap[starType]?.first,
    });

    const SecondStarHoverStyles = css({
      '&:hover': styleHoverMap[starType]?.second,
    });

    const StarActiveStyles = {
      zero: '',
      half: css`
        .${FirstStarStyles} {
          opacity: 1;
          color: #ffd166;
        }

        &:hover {
          .${FirstStarStyles} {
            color: #ffe3a2;
          }
        }
      `,
      full: css`
        color: #ffd166 !important;

        &:hover {
          color: #ffe3a2;
        }
      `,
    };

    const StarStyles = css`
      margin: 0;
      padding: 0;
      display: inline-block;
      margin-right: 8px;
      position: relative;
      color: #e8eaeb;
      cursor: pointer;
      transition: all 500ms ease;
      ${reverse
        ? `
        margin-right: 0;
        margin-left: 8px;
        float: right;

        .${FirstStarStyles} {
            right: 0;
            left: auto;
        }
      `
        : ``}
    `;

    const StarHoverStyles = css({
      '&:hover': styleHover![starType],
    });

    return (
      <li
        aria-checked={value! > index! ? 'true' : 'false'}
        aria-label={`${index! + 1} out of ${count} stars`}
        aria-posinset={index! + 1}
        aria-setsize={count}
        className={`${className} ${StarStyles} ${StarHoverStyles} ${StarActiveStyles[starType]}`}
        onClick={disabled ? undefined : this.onClick}
        onMouseMove={disabled ? undefined : this.onHover}
        ref={ref => {
          this.starRef = ref;
        }}
        role="radio"
        style={style![starType]}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          aria-hidden="true"
          className={`${classNamePrefix}__star__first ${FirstStarStyles} ${FirstStarHoverStyles}`}
          style={styleMap[starType]?.first}
        >
          {symbolNode}
        </div>
        <div
          aria-hidden="true"
          className={`${classNamePrefix}__star__second ${SecondStarHoverStyles}`}
          style={styleMap[starType]?.second}
        >
          {symbolNode}
        </div>
      </li>
    );
  }
}

export default Star;
