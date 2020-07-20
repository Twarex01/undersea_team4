import React from 'react'
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import CustomButton from './customButton'

interface Props {
  title: string
  onPress: () => void
  style: StyleProp<ViewStyle>
}

const TransparentButton = ({title, onPress, style}: Props) => {
  return (
    <View style={[styles.transparentView, style]}>
      <CustomButton
        title={title}
        onPress={onPress}
        style={[Margins.mtBig, Margins.mbBig]}
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
