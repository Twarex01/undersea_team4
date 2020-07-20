import React from 'react'
import {Colors} from '../../constants/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Image,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  onPress: () => void
  image: ImageSourcePropType
  style: StyleProp<ViewStyle>
}

const RoundButton = ({onPress, image, style}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButtonContainer, style]}>
      <LinearGradient
        colors={[
          Colors.vibrantDarkBlue,
          Colors.vibrantMiddleBlue,
          Colors.vibrantLightBlue,
        ]}
        style={styles.customButtonGradient}>
        <Image source={image} />
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  customButtonContainer: {
    borderRadius: 30,
    height: 60,
    width: '70%',
    backgroundColor: Colors.vibrantLightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {height: 1, width: 1},
    elevation: 2,
  },
  customButtonGradient: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    color: Colors.darkBlue,
    fontSize: FontSizes.b2_normal,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },
})

export default RoundButton
