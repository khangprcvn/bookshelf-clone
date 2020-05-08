/** @jsx jsx */
/** @jsxFrag Fragment */
import { jsx } from '@emotion/core'
import React from 'react'

import VisuallyHidden from '@reach/visually-hidden'

import { Button, FormGroup, Input, CircleButton } from 'components/Library'
import { Logo } from 'components/Logo'
import { Modal, ModalDismissButton } from 'components/Modal'

import { useAuth } from 'context/AuthContext'
import { useAsync } from 'utils/use-async'

function LoginForm({ submitButton, onSubmit }) {
  const { run } = useAsync()

  const handleSubmit = event => {
    event.preventDefault()
    const { username, password } = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value
      })
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          maxWidth: '400px',
          margin: '10px auto',
          width: '100%'
        }
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="username">Password</label>
        <Input type="password" id="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children])
        )}
      </div>
    </form>
  )
}

const circleDismissButton = (
  <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

function UnauthenticatedApp() {
  const { signup, login } = useAuth()
  return (
    <div
      css={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '1rem',
          marginTop: '10px'
        }}
      >
        <Modal
          aria-label="Login form"
          button={<Button variant="primary">Login</Button>}
        >
          {circleDismissButton}
          <h3 css={{ textAlign: 'center', fontSize: '2rem' }}>Login</h3>
          <LoginForm
            onSubmit={login}
            submitButton={<Button variant="primary">Login</Button>}
          />
        </Modal>
        <Modal
          aria-label="Register form"
          button={<Button variant="secondary">Register</Button>}
        >
          {circleDismissButton}
          <h3 css={{ textAlign: 'center', fontSize: '2rem' }}>Register</h3>
          <LoginForm
            onSubmit={signup}
            submitButton={<Button variant="secondary">Register</Button>}
          />
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
