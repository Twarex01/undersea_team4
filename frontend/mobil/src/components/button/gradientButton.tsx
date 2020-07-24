import React from 'react'
import {Colors} from '../../constants/colors'
import {LinearGradient} from 'expo-linear-gradient'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  title: string
  onPress: () => void
  style: StyleProp<ViewStyle>
  disabled?: boolean
}

const GradientButton = ({onPress, title, style, disabled}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButtonContainer, style]}
      disabled={disabled}>
      {disabled ? (
        <Text style={styles.customButtonText}>{title}</Text>
      ) : (
        <LinearGradient
          colors={[
            Colors.vibrantDarkBlue,
            Colors.vibrantMiddleBlue,
            Colors.vibrantLightBlue,
          ]}
          style={styles.customButtonGradient}
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.customButtonText}>{title}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  customButtonContainer: {
    borderRadius: 30,
    height: 60,
    width: 192,
    backgroundColor: Colors.transparentWhite,
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

export default GradientButton
