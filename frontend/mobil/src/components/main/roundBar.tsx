import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import {Colors} from '../../constants/colors'
import {Strings} from '../../constants/strings'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  round: number
  place: number
  onPress: () => void
}

const RoundBar = ({round, place, onPress}: Props) => {
  return (
    <View style={styles.roundView}>
      <TouchableOpacity style={styles.transparentView} onPress={onPress}>
        <Text style={styles.roundText}>
          {round}
          {'.'}
          {Strings.round}
          {'  '}
          {place}
          {'.'}
          {Strings.place}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  transparentView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: '70%',
    width: '40%',
    borderRadius: 15,
    shadowColor: Colors.black,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {height: 1, width: 1},
    elevation: 4,
  },
  roundView: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundText: {
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
    color: Colors.middleBlue,
  },
})

export default RoundBar
