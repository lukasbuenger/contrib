import clsx from 'clsx'
import {
  createElement,
  FC,
  ReactHTML,
  HTMLProps,
} from 'react'

type WithResolver = <
  TName extends string,
  TMap extends Record<string, string | string[]>
>(opts: {
  prop: TName
  map: TMap
  fallback?: string
}) => <TProps>(
  cmp: FC<TProps>,
) => FC<TProps & Partial<Record<TName, keyof TMap>>>

export const withResolver: WithResolver = ({
  prop,
  map,
  fallback,
}) => {
  return (cmp) => (props: any) => {
    const value = props[prop]
    const className = props.className
    const nextProps = {
      ...props,
      className: clsx(
        value
          ? map[value]
          : (fallback ?? false) && fallback,
        className,
      ),
    }
    delete nextProps[prop]
    return cmp(nextProps)
  }
}

type WithFlag = <
  TName extends string,
  TClass extends string | string[]
>(opts: {
  prop: TName
  className: TClass
}) => <TProps>(
  cmp: FC<TProps>,
) => FC<TProps & Partial<Record<TName, boolean>>>

export const withFlag: WithFlag = ({
  prop,
  className: defaultClassName,
}) => {
  return (cmp) => (props: any) => {
    const value = props[prop]
    const className = props.className
    const nextProps = {
      ...props,
      className: clsx(value && defaultClassName, className),
    }
    delete nextProps[prop]
    return cmp(nextProps)
  }
}

type WithClasses = (
  className: string | string[],
) => <TProps extends Record<string, any>>(
  cmp: FC<TProps>,
) => FC<TProps>

export const withClasses: WithClasses = (className) => (
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
