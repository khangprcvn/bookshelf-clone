import styled from '@emotion/styled'

import * as colors from 'styles/colors'

import { Dialog as ReactDialog } from '@reach/dialog'

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base
  },
  secondary: {
    background: colors.gray,
    color: colors.text
  }
}
const Button = styled.button(
  {
    padding: '13px 20px',
    border: 0,
    borderRadius: '3px',
    lineHeight: 1,
    cursor: 'pointer'
  },
  ({ variant = 'primary' }) => buttonVariants[variant]
)

const Dialog = styled(ReactDialog)({
  maxWidth: '450px',
  borderRadius: '5px',
  boxShadow: '0 10px 30px -3px rgba(0, 0, 0, 0.25)',
  paddingBottom: '3.5rem',
  margin: '20vh auto'
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const Input = styled.input({
  padding: '10px 15px',
  background: colors.gray,
  border: `1px solid ${colors.gray10}`,
  borderRadius: '3px',
  marginTop: '5px'
})

const CircleButton = styled.button({
  width: '40px',
  height: '40px',
  padding: 0,
  borderRadius: '30px',
  border: '0.5px solid rgba(0, 0, 0, 0.1)',
  background: colors.base,
  cursor: 'pointer'
})

export { Button, Dialog, FormGroup, Input, CircleButton }
