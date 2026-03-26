import React from 'react'

import useFormContext from '../../context'

import { RulesContainer, Title } from './styles'

const PasswordRules = () => {
  const {
    passwordRules: [passwordRules],
  } = useFormContext()

  if (passwordRules.length < 1) return null

  return (
    <React.Fragment>
      <Title children='Regras de formato da senha' />

      <RulesContainer>
        <div>
          {passwordRules.map((item, index) => (
            <div key={index}>
              <div>
                {item.label.map((label, index) => (
                  <div key={index} children={label} />
                ))}
              </div>

              <img
                src={`/assets/icons/check_${
                  item.success ? 'green' : 'grey'
                }.svg`}
                alt='confirmation icon'
              />
            </div>
          ))}
        </div>
      </RulesContainer>
    </React.Fragment>
  )
}

export default PasswordRules
