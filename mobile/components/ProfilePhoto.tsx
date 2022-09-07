import React, { FC } from 'react'
import { Image } from 'react-native'

type ProfilePhotoProps = {
  src?: string
  size: number
  circular?: boolean
}

const ProfilePhoto: FC<ProfilePhotoProps> = ({ src, size, circular }) => {
  const image = src ? { uri: src } : require('../assets/blank-profile-picture.png')

  return <Image source={image} style={{ width: size, height: size, borderRadius: circular ? size / 2 : 0 }} />
}

export default ProfilePhoto
