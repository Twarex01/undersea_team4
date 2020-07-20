import React from 'react'
import {View, StyleSheet} from 'react-native'

import {Images} from '../../constants/images'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {LinearGradient} from 'expo-linear-gradient'
import MenuButton from '../../components/button/menuButton'
import {Strings} from '../../constants/strings'

interface Props {
  onBuildingsPress: () => void
  onAttackPress: () => void
  onUpgradesPress: () => void
  onFightPress: () => void
  onBevyPress: () => void
}

const BottomMenu = ({
  onBuildingsPress,
  onAttackPress,
  onUpgradesPress,
  onFightPress,
  onBevyPress,
}: Props) => {
  return (
    <LinearGradient
      colors={[
        Colors.vibrantLightBlue,
        Colors.vibrantMiddleBlue,
        Colors.vibrantDarkBlue,
      ]}
      style={styles.customGradient}>
      <View style={[styles.menuView, Margins.mtNormal, Margins.mbSmall]}>
        <MenuButton
          title={Strings.buildings}
          onPress={onBuildingsPress}
          style={Margins.mlLarge}
          image={Images.city_tab}
        />
        <MenuButton
          title={Strings.attack}
          onPress={onAttackPress}
          style={Margins.mlLarge}
          image={Images.attack_tab}
        />
        <MenuButton
          title={Strings.upgrades}
          onPress={onUpgradesPress}
          style={Margins.mlLarge}
          image={Images.upgrade_icon}
        />
        <MenuButton
          title={Strings.fight}
          onPress={onFightPress}
          style={Margins.mlLarge}
          image={Images.fight_icon}
        />
        <MenuButton
          title={Strings.bevy}
          onPress={onBevyPress}
          style={[Margins.mlLarge, Margins.mrLarge]}
          image={Images.bevy_tab}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customGradient: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default BottomMenu
