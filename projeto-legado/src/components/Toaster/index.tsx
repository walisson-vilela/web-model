import { toast } from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

import { ToasterContentContainer } from './styles'
import './styles.css'

export const ToasterContent = (props: any) => {
  const handleCloseToast = () => toast.remove()

  return (
    <ToasterContentContainer color={props.color}>
      <IoMdClose size={16} color='#1E561F' onClick={handleCloseToast} />
      <p className='title'>
        {props.title
          ? props.title
          : props.color === 'normal'
          ? 'Ação realizada com sucesso'
          : 'Falha ao realizar ação'}
      </p>
      <p className='description'>
        {props.description
          ? props.description
          : props.color === 'normal'
          ? 'Sua solicitação foi concuída.'
          : 'Sua solicitação não foi concluída.'}
      </p>
    </ToasterContentContainer>
  )
}

export const SuccessStyle = {
  duration: 1000,
  className: 'toast-align',
  style: {
    padding: '14px 28px 21px 28px',
    borderRadius: 4,
    border: '1px solid #A8C599',
    background: '#FCFFF5',
    minWidth: 460,
  },
}

export const ErrorStyle = {
  duration: 1000,
  className: 'toast-align',
  style: {
    padding: '14px 28px 21px 28px',
    borderRadius: 4,
    border: '1px solid #C59999',
    background: '#FFF5F5',
    minWidth: 460,
  },
}
