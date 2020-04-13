import test from 'tape'
import React, { HTMLProps, FC } from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { pipe } from '@buenger/fp'

import {
  withOption,
  withFlag,
  withClassName,
  toElement,
} from '../src'

configure({ adapter: new Adapter() })

const TestCmp: FC<HTMLProps<HTMLSpanElement>> = (props) => (
  <span {...props} />
)

test('withClassName', (assert) => {
  const WithSingleClass = withClassName('foo')(TestCmp)
  assert.equal(
    shallow(<WithSingleClass />).contains(
      <span className="foo" />,
    ),
    true,
    'Adds a given className to the decorated component.',
  )

  const WithMultipleClasses = withClassName(['foo', 'bar'])(
    TestCmp,
  )

  assert.equal(
    shallow(<WithMultipleClasses />).contains(
      <span className="foo bar" />,
    ),
    true,
    'Accepts a list of classes.',
  )

  assert.equal(
    shallow(<WithMultipleClasses className="x" />).contains(
      <span className="foo bar x" />,
    ),
    true,
    'The decorated component respects passed className props.',
  )
  assert.end()
})

test('withFlag', (assert) => {
  const WithSingleClassFlag = withFlag(
    'foo',
    'bar',
  )(TestCmp)

  assert.equal(
    shallow(<WithSingleClassFlag foo />).contains(
      <span className="bar" />,
    ),
    true,
    'Adds a className to the decorated component if the flag property equals true.',
  )
  assert.equal(
    shallow(<WithSingleClassFlag />).contains(<span />),
    true,
    'Skips the className processing if the flag property equals false.',
  )

  const WithMultiClassFlag = withFlag('foo', [
    'bar',
    'baz',
  ])(TestCmp)

  assert.equal(
    shallow(<WithMultiClassFlag foo />).contains(
      <span className="bar baz" />,
    ),
    true,
    'Can handle a list of classNames.',
  )

  const WithFallbackFlag = withFlag(
    'foo',
    ['bar', 'baz'],
    'foo',
  )(TestCmp)

  assert.equal(
    shallow(<WithFallbackFlag />).contains(
      <span className="foo" />,
    ),
    true,
    'Adds a given fallback class if the flag is false.',
  )

  const WithForwardProps = withFlag(
    'contentEditable',
    ['bar', 'baz'],
    null,
    true,
  )(TestCmp)

  assert.equal(
    shallow(<WithForwardProps contentEditable />).contains(
      <span className="bar baz" contentEditable />,
    ),
    true,
    'Forwards the prop if forwardProp is true.',
  )

  assert.equal(
    shallow(
      <WithMultiClassFlag foo className="x" />,
    ).contains(<span className="bar baz x" />),
    true,
    'The decorated component respects passed className props.',
  )

  assert.end()
})

test('withOption', (assert) => {
  const WithOption = withOption('foo', {
    bar: 'with-bar',
    baz: ['with-baz', 'with-another-baz'],
  })(TestCmp)

  assert.equal(
    shallow(<WithOption foo="bar" />).contains(
      <span className="with-bar" />,
    ),
    true,
    'Resolves an option prop to a className and passes it to the decorated component.',
  )

  assert.equal(
    shallow(<WithOption foo="baz" />).contains(
      <span className="with-baz with-another-baz" />,
    ),
    true,
    'Can handle className lists.',
  )

  assert.equal(
    shallow(
      <WithOption foo="bar" className="x" />,
    ).contains(<span className="with-bar x" />),
    true,
    'The decorated component respects passed className props.',
  )

  assert.equal(
    shallow(<WithOption />).contains(<span />),
    true,
    'Skips the className processing if the option property is not provided.',
  )

  const WithOptionAndFallback = withOption(
    'foo',
    {
      bar: 'with-bar',
      baz: ['with-baz', 'with-another-baz'],
    },
    'bar',
  )(TestCmp)

  assert.equal(
    shallow(<WithOptionAndFallback />).contains(
      <span className="with-bar" />,
    ),
    true,
    'Forwards a given default className value if it is provided and the option property is ommitted.',
  )

  const WithForwardProps = withOption(
    'role',
    {
      button: 'button',
      checkbox: 'checkbox',
    },
    null,
    true,
  )(TestCmp)

  assert.equal(
    shallow(<WithForwardProps role="button" />).contains(
      <span className="button" role="button" />,
    ),
    true,
    'Forwards the prop/value if fowardProp equals true.',
  )

  assert.end()
})

test('toElement', (assert) => {
  const Div = toElement('div')

  assert.equal(
    shallow(<Div>Hello div</Div>).contains(
      <div>Hello div</div>,
    ),
    true,
    'returns an HTML component',
  )

  const DivWithRole = toElement('div', {
    role: 'button',
  })

  assert.equal(
    shallow(
      <DivWithRole>Hello div with role</DivWithRole>,
    ).contains(
      <div role="button">Hello div with role</div>,
    ),
    true,
    'Accepts default props',
  )

  assert.end()
})

test('composition with @buenger/pipe', (assert) => {
  const LinkButton = pipe(
    withOption(
      'color',
      { red: 'button-red', blue: 'button-blue' },
      'red',
    ),
    withFlag(
      'data-disabled',
      'button-disabled',
      null,
      true,
    ),
    withClassName('foo'),
  )(toElement('a'))

  assert.equal(
    shallow(
      <LinkButton
        color="blue"
        data-disabled
        className="x"
        href="https://www.wikipedia.org/"
      >
        Hello LinkButton
      </LinkButton>,
    ).contains(
      <a
        data-disabled
        className="button-blue button-disabled foo x"
        href="https://www.wikipedia.org/"
      >
        Hello LinkButton
      </a>,
    ),
    true,
  )

  assert.end()
})
