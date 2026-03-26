import { useMemo, useState } from 'react'

import { Checkbox as Box, Dropdown, Icon, Menu } from 'semantic-ui-react'

import brasilLogo from '../../assets/img/svgs/Countrys/brasil.svg'
import { Checkbox } from '../../components/Form/Checkbox'
import { createRouteTab } from '../../routes'

import { cpfMask, makeHash, phoneMask } from './helpers'
import {
  AccountGroup,
  AccountGroupHeader,
  AccountTable,
  AccountTableLeft,
  AccountTableRight,
  AcessContent,
  AcessData,
  AcessInput,
  BoxContent,
  BoxMenus,
  ButtonArea,
  Container,
  ContainerHeader,
  CustomAcessInput,
  InputContent,
  InputEmail,
  InputImage,
  InputName,
  InputPhone,
  InputSearch,
  LeftContent,
  PersonalInfo,
  PersonalInfoContent,
  PhotoContainer,
  RightContent,
  UserMenus,
  UserPermission,
  UserPermissionContent,
  UserValidation
} from './styles'

const InternalUser = createRouteTab(
  () => {
    const [cpf, setCpf] = useState('00000000000')
    const [avatarProfile, setAvatarFile] = useState(false)
    const [phoneNumber1, setPhoneNumber1] = useState('')
    const [phoneNumber2, setPhoneNumber2] = useState('')
    const [isDisable, setIsDisable] = useState(true)
    const [validateCpf, setValidateCpf] = useState(false)
    const [error, setError] = useState('')
    const [hash, setHash] = useState('')
    const [hasOpacity, setHasOpaticy] = useState(false)

    const handleVerifyCpf = () => {
      if (cpf.length < 14) {
        setValidateCpf(true)
        setError('Para prosseguir é necessário informar um CPF válido!')
        return
      }

      if (cpf.length === 0) {
        setValidateCpf(true)
        setError('Cpf não informado!')
        return
      }
      setIsDisable(false)
      setError('')
      setHasOpaticy(true)
    }

    const preview = useMemo(() => {
      return avatarProfile ? URL.createObjectURL(avatarProfile) : null
    }, [avatarProfile])

    return (
      <Container hasDisable={hasOpacity}>
        <ContainerHeader>
          <h1> Status da Conta</h1>
          <div>
            <span> Inativo </span>
            <Checkbox input='true' toggle={true} disabled={true} />
            <span> Ativo </span>
          </div>
        </ContainerHeader>
        <PhotoContainer>
          <LeftContent>
            <UserValidation>
              <h2> Chave </h2>
              <strong> Cpf*</strong>
              <div>
                <input
                  type='text'
                  placeholder='Informe seu cpf'
                  value={cpfMask(cpf)}
                  onChange={(e) => setCpf(cpfMask(e.target.value))}
                />
                <button type='button' onClick={handleVerifyCpf}>
                  Verifcar
                </button>
              </div>
              {validateCpf && <span className='message-cpf'> {error}</span>}
            </UserValidation>
          </LeftContent>
          <RightContent>
            <InputImage>
              <label htmlFor='image'> Escolher Arquivo </label>
              <input
                type='file'
                id='image'
                disabled={isDisable}
                name='image'
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
              <span> Tamanho máximo(80 X 80)</span>
            </InputImage>
            {preview ? (
              <div className='photo'>
                <img src={preview} alt='' />
              </div>
            ) : null}
          </RightContent>
        </PhotoContainer>

        <PersonalInfo>
          <h1> Dados Básicos</h1>
          <PersonalInfoContent>
            <InputName>
              <span> Nome *</span>
              <input type='text' placeholder='Nome' disabled={isDisable} />
            </InputName>

            <InputEmail>
              <span> E-mail*</span>
              <input
                type='text'
                placeholder='email@mail.com'
                disabled={isDisable}
              />
            </InputEmail>

            <InputPhone>
              <span> Telefone Movel 1 *</span>
              <InputContent>
                <div>
                  <img src={brasilLogo} alt='logo' />
                  <div />
                </div>
                <input
                  type='text'
                  placeholder='(31)0000-0000'
                  value={phoneNumber1}
                  onChange={(e) => setPhoneNumber1(phoneMask(e.target.value))}
                  disabled={isDisable}
                />
              </InputContent>
            </InputPhone>

            <InputPhone>
              <span> Telefone Movel 2 *</span>
              <InputContent>
                <div>
                  <img src={brasilLogo} alt='logo' />
                  <div />
                </div>
                <input
                  type='text'
                  placeholder='(31)0000-0000'
                  value={phoneNumber2}
                  onChange={(e) => setPhoneNumber2(phoneMask(e.target.value))}
                  disabled={isDisable}
                />
              </InputContent>
            </InputPhone>
          </PersonalInfoContent>
        </PersonalInfo>

        <AcessData>
          <h2> Dados de Acesso </h2>
          <AcessContent>
            <AcessInput>
              <span> Função *</span>
              <Menu className='menu'>
                <Dropdown
                  style={{
                    width: 180,
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                    height: 35,
                  }}
                  multiple
                  text='Analista'
                  simple
                  item
                  disabled={isDisable}
                />
              </Menu>
            </AcessInput>

            <AcessInput>
              <span> Nome do usuário*</span>
              <input type='text' disabled={isDisable} />
            </AcessInput>

            <CustomAcessInput>
              <span> Senha*</span>
              <div>
                <input type='text' disabled={isDisable} value={hash} />
                <button type='button'>
                  <Icon name='eye' color='grey' />
                </button>
              </div>
            </CustomAcessInput>
            <AcessInput>
              <button type='button' onClick={() => setHash(makeHash(hash))}>
                {' '}
                Gerar Senha{' '}
              </button>
            </AcessInput>
          </AcessContent>
          <span className='warning-title'>
            * Caso gerar uma senha será necessário a troa da mesma no primeiro
            acesso.
          </span>
        </AcessData>

        <AccountGroup>
          <AccountGroupHeader>
            <h2> Conta e Grupo *</h2>
            <button disabled={isDisable}> Associar</button>
          </AccountGroupHeader>
          <AccountTable.Group horizontal>
            <AccountTableLeft>
              {' '}
              <span> Conta </span>{' '}
            </AccountTableLeft>
            <AccountTableRight>
              {' '}
              <span> Grupo</span>
            </AccountTableRight>
          </AccountTable.Group>
        </AccountGroup>

        <UserPermission>
          <UserPermissionContent>
            <h2>Permissões do usuário</h2>
            <div>
              <p>
                {' '}
                Defina permissões para o acesso as configurações do usuário
              </p>
              <InputSearch>
                <input
                  type='text'
                  placeholder='Pesquisar'
                  disabled={isDisable}
                />
                <button disabled={isDisable}>
                  <Icon name='search' color='grey' />
                </button>
              </InputSearch>
            </div>
          </UserPermissionContent>

          <UserMenus>
            <strong className='menu'> Menus </strong>
            <div>
              <input type='checkbox' disabled={isDisable} />
              <strong>AcessoTotal </strong>
            </div>
            <strong className='grey'> Ver</strong>
            <strong className='grey'> Modificar</strong>
            <strong className='grey'> Criar</strong>
            <strong className='grey'> Excluir</strong>
          </UserMenus>
          <BoxMenus>
            <strong> Home </strong>
            <div>
              <Box label='' className='box' disabled={isDisable}></Box>
              <Box label='' className='box box' disabled={isDisable}></Box>
              <Box label='' className='box box3' disabled={isDisable}></Box>
              <Box label='' className='box box4' disabled={isDisable}></Box>
              <Box label='' className='box box5' disabled={isDisable}></Box>
            </div>
          </BoxMenus>

          <BoxMenus.Group>
            <BoxContent>
              <strong> Cadastros </strong>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box13' disabled={isDisable}></Box>
                <Box label='' className='box box14' disabled={isDisable}></Box>
                <Box label='' className='box box15' disabled={isDisable}></Box>
              </div>
            </BoxContent>

            <BoxMenus>
              <span> Usuários </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Grupos de Contas </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Calendário </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Hierárquias </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box43' disabled={isDisable}></Box>
                <Box label='' className='box  box44' disabled={isDisable}></Box>
                <Box label='' className='box box45' disabled={isDisable}></Box>
              </div>
            </BoxMenus>
          </BoxMenus.Group>

          <BoxMenus.Group>
            <BoxContent>
              <strong> Produtos </strong>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box13' disabled={isDisable}></Box>
                <Box label='' className='box box14' disabled={isDisable}></Box>
                <Box label='' className='box box15' disabled={isDisable}></Box>
              </div>
            </BoxContent>
            <BoxMenus>
              <span> Gerenciar Produto </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Categórias </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Extrair Produto </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box' disabled={isDisable}></Box>
                <Box label='' className='box box3' disabled={isDisable}></Box>
                <Box label='' className='box box4' disabled={isDisable}></Box>
                <Box label='' className='box box5' disabled={isDisable}></Box>
              </div>
            </BoxMenus>

            <BoxMenus>
              <span> Associar Concorrentes </span>
              <div>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box' disabled={isDisable}></Box>
                <Box label='' className='box box43' disabled={isDisable}></Box>
                <Box label='' className='box box44' disabled={isDisable}></Box>
                <Box label='' className='box box45' disabled={isDisable}></Box>
              </div>
            </BoxMenus>
          </BoxMenus.Group>
        </UserPermission>

        <ButtonArea>
          <button type='button'> Cancelar</button>
          <button type='button' onClick={() => alert('Modal')}>
            {' '}
            Salvar
          </button>
        </ButtonArea>
      </Container>
    )
  },
  (props) => <>{props.children}</>,
)

export default InternalUser
