import React from 'react'
import {Colors} from '../../constants/colors'
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
  View,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  count: number
  round: string
  style: StyleProp<ViewStyle>
  image: ImageSourcePropType
}

const MenuButton = ({count, round, style, image}: Props) => {
  return (
    <View style={[styles.popupIconContainer, style]}>
      <Image source={image} />
      <Text style={styles.menuButtonText}>{count}</Text>
      <Text style={styles.menuButtonText}>{round}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  popupIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: Colors.middleBlue,
    fontSize: FontSizes.b2_normal,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },
})

export default MenuButton
