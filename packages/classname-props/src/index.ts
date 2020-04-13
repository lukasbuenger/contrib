import clsx from 'clsx'
import {
  createElement,
  FC,
  ReactHTML,
  HTMLProps,
} from 'react'

type ClassName = string | string[]

type WithOption = <
  TPropName extends string,
  TOptions extends Record<string, ClassName>
>(
  propName: TPropName,
  options: TOptions,
  notSet?: keyof TOptions | null,
  forwardProp?: boolean,
) => <TProps>(
  cmp: FC<TProps>,
) => FC<TProps & Partial<Record<TPropName, keyof TOptions>>>

export const withOption: WithOption = (
  propName,
  options,
  notSet?,
  forwardProp = false,
) => {
  return (cmp) => (props: any) => {
    const propValue = props[propName]
    const prevClassName = props.className
    const nextClassName = clsx(
      propValue
        ? options[propValue]
        : !!notSet
        ? options[notSet]
        : false,
      prevClassName,
    )
    const nextProps = {
      ...props,
      [propName]: forwardProp ? propValue : undefined,
      className: nextClassName || undefined,
    }
    return cmp(nextProps)
  }
}

type WithFlag = <TPropName extends string>(
  prop: TPropName,
  className: ClassName,
  notSet?: ClassName | null,
  forwardProp?: boolean,
) => <TProps>(
  cmp: FC<TProps>,
) => FC<TProps & Partial<Record<TPropName, boolean>>>

export const withFlag: WithFlag = (
  propName,
  className,
  notSet,
  forwardProp = false,
) => {
  return (cmp) => (props: any) => {
    const propValue = !!props[propName]
    const prevClassName = props.className
    const nextClassName = clsx(
      propValue ? className : notSet,
      prevClassName,
    )
    const nextProps = {
      ...props,
      [propName]: forwardProp ? propValue : undefined,
      className: nextClassName || undefined,
    }
    return cmp(nextProps)
  }
}

export type WithClassName = (
  className: ClassName,
) => <TProps extends Record<string, any>>(
  cmp: FC<TProps>,
) => FC<TProps>

export const withClassName: WithClassName = (className) => (
  cmp,
) => (props) => {
  const prevClassName = props.className
  return cmp({
    ...props,
    className: clsx(className, prevClassName),
  })
}

export const toElement = <T extends keyof ReactHTML>(
  cmp: T,
  defaultProps?: HTMLProps<ReactHTML[T]>,
) => (props: HTMLProps<ReactHTML[T]>) =>
  createElement(cmp, { ...defaultProps, ...props })
