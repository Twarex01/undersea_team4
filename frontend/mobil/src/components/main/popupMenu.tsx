import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors} from '../../constants/colors'
import PopupIcon from '../icon/popupIcon'
import {Images} from '../../constants/images'
import {Margins} from '../../constants/margins'

interface Props {
  shell: number
  coral: number
}

const PopupMenu = ({shell, coral}: Props) => {
  return (
    <View style={styles.transparentView}>
      <View style={[styles.rowView, Margins.mtLarge]}>
        <PopupIcon
          image={Images.shark_icon}
          count={0}
          round={''}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
        <PopupIcon
          image={Images.seal_icon}
          count={5}
          round={''}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
        <PopupIcon
          image={Images.seahorse_icon}
          count={13}
          round={''}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
      </View>
      <View style={[styles.rowView, Margins.mbLarge]}>
        <PopupIcon
          image={Images.shell_icon}
          count={shell}
          round={'12/kör'}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
        <PopupIcon
          image={Images.coral_icon}
          count={coral}
          round={'12/kör'}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
        <PopupIcon
          image={Images.reef_castle_icon}
          count={1}
          round={''}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
        <PopupIcon
          image={Images.flow_control_icon}
          count={0}
          round={''}
          style={[Margins.mrNormal, Margins.mlNormal]}
        />
      </View>
    </View>
  )
}

export default PopupMenu

const styles = StyleSheet.create({
  transparentView: {
    backgroundColor: Colors.transparentWhite,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
