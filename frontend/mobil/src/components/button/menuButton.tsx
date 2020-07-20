import React from 'react'
import {Colors} from '../../constants/colors'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  title: string
  onPress: () => void
  style: StyleProp<ViewStyle>
  image: ImageSourcePropType
}

const MenuButton = ({onPress, title, style, image}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.menuButtonContainer, style]}
      onPress={onPress}>
      <Image source={image} />
      <Text style={styles.menuButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: Colors.darkBlue,
    fontSize: FontSizes.b2_small,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },
})

export default MenuButton
