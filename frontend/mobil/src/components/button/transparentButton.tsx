import React from 'react'
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import GradientButton from './gradientButton'

interface Props {
  title: string
  onPress: () => void
  style: StyleProp<ViewStyle>
  disabled?: boolean
}

const TransparentButton = ({title, onPress, style, disabled}: Props) => {
  return (
    <View style={[styles.transparentView, style]}>
      <GradientButton
        title={title}
        onPress={onPress}
        style={[Margins.mtBig, Margins.mbBig]}
        disabled={disabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  transparentView: {
    backgroundColor: Colors.transparentWhite,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default TransparentButton
