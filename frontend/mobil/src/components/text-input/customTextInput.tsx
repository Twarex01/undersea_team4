import React from 'react'
import {Colors} from '../../constants/colors'
import {StyleSheet, TextInput, TextInputProps} from 'react-native'
import {Fonts, FontSizes} from '../../constants/fonts'

const CustomTextInput = (props: TextInputProps) => {
  return <TextInput {...props} style={[styles.textInput, props.style]} />
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.white,
    color: Colors.darkBlue,
    height: 40,
    borderRadius: 20,
    width: '100%',
    padding: 10,
    fontSize: FontSizes.os_normal,
    fontFamily: Fonts.OpenSans_Regular,
  },
})

export default CustomTextInput
