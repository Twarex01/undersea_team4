import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Colors} from '../../constants/colors'
import {Images} from '../../constants/images'

interface Props {
  onPress: () => void
  isClosed: boolean
}

const WhiteButton = ({onPress, isClosed}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={isClosed ? Images.up_arrow : Images.down_arrow} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 28,
  },
})

export default WhiteButton
