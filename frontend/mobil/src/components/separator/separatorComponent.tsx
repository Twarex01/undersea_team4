import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors} from '../../constants/colors'

const SeparatorComponent = () => {
  return <View style={styles.line}></View>
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: Colors.transparentWhite,
  },
})

export default SeparatorComponent
