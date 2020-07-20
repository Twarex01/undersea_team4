import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  LayoutAnimation,
  Dimensions,
} from 'react-native'
import {Colors} from '../../constants/colors'
import PopupIcon from '../icon/popupIcon'
import {Images} from '../../constants/images'
import {Margins} from '../../constants/margins'
import WhiteButton from '../button/whiteButton'
import Constants from 'expo-constants'

interface Props {
  shell: number
  coral: number
}

const PopupMenu = ({shell, coral}: Props) => {
  //28 button, 56 header, statusbar
  var screenHeight =
    Dimensions.get('window').height - 28 - 50 - Constants.statusBarHeight
  const [isClosed, setIsClosed] = useState(true)

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsClosed(!isClosed)
  }

  return (
    <View
      style={[styles.container, isClosed ? {top: screenHeight} : {bottom: 0}]}>
      <WhiteButton onPress={onPress} isClosed={isClosed} />
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
    </View>
  )
}

export default PopupMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
  },
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
