import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {Colors} from '../constants/colors'
import ScrollablePagesTemplate from '../components/pages/scrollablePagesTemplate'
import {Strings} from '../constants/strings'
import {Images} from '../constants/images'
import {Fonts, FontSizes} from '../constants/fonts'
import {Margins} from '../constants/margins'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../constants/screens'

interface ProfilScreenProps {
  navigation: StackNavigationProp<any>
}

const ProfilScreen = ({navigation}: ProfilScreenProps) => {
  const onBackPressed = () => {
    navigation.pop(1)
  }
  const onRankingPressed = () => {
    navigation.navigate(Screens.Ranking)
  }
  const onLogoutPressed = () => {
    navigation.goBack()
    navigation.replace(Screens.Login)
  }
  return (
    <ScrollablePagesTemplate title={Strings.profil}>
      <View style={styles.headerView}>
        <Image source={Images.profil} />
        <Text style={[styles.usernameText, Margins.mtBig, Margins.mbBig]}>
          Jakabjátékos
        </Text>
      </View>
      <View>
        <Text style={styles.rankingText} onPress={onRankingPressed}>
          {Strings.ranking}
        </Text>
        <Text style={styles.logoutText} onPress={onLogoutPressed}>
          {Strings.log_out}
        </Text>
      </View>
    </ScrollablePagesTemplate>
  )
}

const styles = StyleSheet.create({
  headerView: {
    alignItems: 'center',
  },
  usernameText: {
    color: Colors.white,
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
  },
  rankingText: {
    color: Colors.white,
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
    borderColor: Colors.transparentWhite,
    borderTopWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
  },

  logoutText: {
    color: Colors.vibrantLightBlue,
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_normal,
    borderColor: Colors.transparentWhite,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
  },
})

export default ProfilScreen
