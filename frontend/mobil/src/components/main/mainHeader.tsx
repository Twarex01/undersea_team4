import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {Images} from '../../constants/images'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'

interface Props {
  onPressButton: () => void
}

const MainHeader = ({onPressButton}: Props) => {
  return (
    <View style={styles.headerView}>
      <Image
        source={Images.undersea_icon}
        style={[styles.headerImage, Margins.mlNormal]}
      />
      <View style={styles.emptyView}></View>
      <TouchableOpacity style={Margins.mrNormal} onPress={onPressButton}>
        <Image source={Images.profil_icon} style={styles.headerImage} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.middleBlue,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: '100%',
  },
  emptyView: {
    flex: 1,
  },
  headerImage: {},
})

export default MainHeader
