import React, { useContext, useState } from 'react'

import { FiCamera, FiUsers } from 'react-icons/fi'

import ImageCrop from '../../../../../../../../../../../components/ImageCrop'
import NewGroupContext from '../../../../context'

import {
  Form,
  GroupInfoContainer,
  GroupInfoImage,
  GroupInformation,
} from './styles'

const GroupInfo = () => {
  const { name, setName } = useContext(NewGroupContext)
  const [groupImage, setGroupImage] = useState<string>('')
  const [croppedImage, setCroppedImage] = useState<string>('')
  const [openCropImage, setOpenCropImage] = useState<boolean>(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const finalImage = URL.createObjectURL(e.target.files[0])
    setGroupImage(finalImage)
    setOpenCropImage(true)
  }

  return (
    <GroupInfoContainer>
      {croppedImage ? (
        <GroupInfoImage htmlFor='image-upload'>
          <img src={croppedImage} />
          <input
            id='image-upload'
            accept='image/*'
            type='file'
            onChange={(e) => handleImageUpload(e)}
          />
        </GroupInfoImage>
      ) : (
        <GroupInfoImage htmlFor='image-upload'>
          <FiCamera size={22} color='#A6ACB1' />
          <span>Adicione imagem</span>
          <input
            id='image-upload'
            accept='image/*'
            type='file'
            onChange={(e) => handleImageUpload(e)}
          />
        </GroupInfoImage>
      )}
      <Form>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Informe o nome do grupo'
        />
      </Form>
      <GroupInformation>
        <FiUsers size={16} color='#A6ACB1' />
        <span>Você + 8 participantes </span>
      </GroupInformation>

      {openCropImage && (
        <ImageCrop
          close={() => setOpenCropImage(false)}
          image={groupImage}
          saveAvatar={setCroppedImage}
        />
      )}
    </GroupInfoContainer>
  )
}

export default GroupInfo
