import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native'
import {Images} from '../../constants/images'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'

interface Props {
  onPressProfil: () => void
  onNextRoundPressed: () => void
}

const MainHeader = ({onPressProfil, onNextRoundPressed}: Props) => {
  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={onNextRoundPressed}>
        <Image
          source={Images.undersea_icon}
          style={[styles.headerImage, Margins.mlNormal]}
        />
      </TouchableOpacity>

      <View style={styles.emptyView}></View>
      <TouchableOpacity style={Margins.mrNormal} onPress={onPressProfil}>
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
