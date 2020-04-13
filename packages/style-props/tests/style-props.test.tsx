import test from 'tape'
import React, { HTMLProps, FC } from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {
  withResolver,
  withFlag,
  withClasses,
  toElement,
} from '../src'

configure({ adapter: new Adapter() })

const TestCmp: FC<HTMLProps<HTMLSpanElement>> = (props) => (
  <span {...props} />
)

test('withClasses', (assert) => {
  const WithSingleClass = withClasses('foo')(TestCmp)
  assert.equal(
    shallow(<WithSingleClass />).contains(
      <span className="foo" />,
    ),
    true,
  )

  const WithMultipleClasses = withClasses(['foo', 'bar'])(
    TestCmp,
  )

  assert.equal(
    shallow(<WithMultipleClasses />).contains(
      <span className="foo bar" />,
    ),
    true,
  )

  assert.equal(
    shallow(<WithMultipleClasses className="x" />).contains(
      <span className="foo bar x" />,
    ),
    true,
  )
  assert.end()
})

test('withFlag', (assert) => {
  const WithSingleClassFlag = withFlag({
    prop: 'foo',
    className: 'bar',
  })(TestCmp)

  assert.equal(
    shallow(<WithSingleClassFlag foo />).contains(
      <span className="bar" />,
    ),
    true,
  )
  assert.equal(
    shallow(<WithSingleClassFlag />).contains(
      <span className="bar" />,
    ),
    false,
  )

  const WithMultiClassFlag = withFlag({
    prop: 'foo',
    className: ['bar', 'baz'],
  })(TestCmp)

  assert.equal(
    shallow(<WithMultiClassFlag foo />).contains(
      <span className="bar baz" />,
    ),
    true,
  )
  assert.equal(
    shallow(<WithMultiClassFlag />).contains(
      <span className="bar baz" />,
    ),
    false,
  )

  assert.equal(
    shallow(
      <WithMultiClassFlag foo className="x" />,
    ).contains(<span className="bar baz x" />),
    true,
  )
  assert.end()
})

test('withKey', (assert) => {
  const WithKey = withResolver({
    prop: 'foo',
    map: {
      bar: 'with-bar',
      baz: 'with-baz',
    },
    fallback: 'bar',
  })(TestCmp)

  assert.equal(
    shallow(<WithKey foo="bar" />).contains(
      <span className="with-bar" />,
    ),
    true,
  )

  assert.equal(
    shallow(<WithKey foo="baz" />).contains(
      <span className="with-baz" />,
    ),
    true,
  )

  assert.equal(
    shallow(<WithKey />).contains(<span className="bar" />),
    true,
  )

  assert.equal(
    shallow(<WithKey className="x" />).contains(
      <span className="bar x" />,
    ),
    true,
  )

  assert.equal(
    shallow(<WithKey foo="bar" className="x" />).contains(
      <span className="with-bar x" />,
    ),
    true,
  )

  assert.end()
})

test('toElement', (assert) => {
  const ToDiv = toElement('div')

  assert.equal(
    shallow(<ToDiv>Hello div</ToDiv>).contains(
      <div>Hello div</div>,
    ),
    true,
  )

  assert.end()
})
