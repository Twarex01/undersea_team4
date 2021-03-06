import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/strings'
import {Images} from '../constants/images'
import {Fonts, FontSizes} from '../constants/fonts'
import {Margins} from '../constants/margins'
import {StackNavigationProp} from '@react-navigation/stack'
import {Screens} from '../constants/screens'
import PagesTemplateBack from '../components/pages/pagesTemplateBack'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {Token} from '../constants/token'
import {useSelector, useDispatch} from 'react-redux'
import {IApplicationState} from '../../store'
import {getCountry} from '../store/country/country.actions'

interface ProfilScreenProps {
  navigation: StackNavigationProp<any>
}

const ProfilScreen = ({navigation}: ProfilScreenProps) => {
  const {country, isLoading, error} = useSelector(
    (state: IApplicationState) => state.app.country,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCountry())
  }, [dispatch])

  const onBackPressed = () => {
    navigation.goBack()
  }
  const onEditPressed = () => {}

  const setToken = async () => {
    await AsyncStorage.setItem(Token.ACCESS_TOKEN, '')
  }

  const onLogoutPressed = () => {
    setToken()
    navigation.goBack()
    navigation.replace(Screens.Login)
  }
  return (
    <PagesTemplateBack title={Strings.profil} onPress={onBackPressed}>
      <View style={styles.containerPadding}>
        <View style={styles.headerView}>
          <Image source={Images.profil} />
          <Text style={[styles.usernameText, Margins.mtBig, Margins.mbBig]}>
            Jakabjátékos
          </Text>
        </View>
        <View>
          <View style={styles.rowView}>
            <View>
              <Text style={styles.rankingText}>{Strings.city_name}</Text>
              <Text style={styles.cityText}>{country.name} </Text>
            </View>
            <View style={{flex: 1}}></View>
            <TouchableOpacity onPress={onEditPressed}>
              <Image source={Images.edit} />
            </TouchableOpacity>
          </View>
          <Text style={styles.logoutText} onPress={onLogoutPressed}>
            {Strings.log_out}
          </Text>
        </View>
      </View>
    </PagesTemplateBack>
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
    paddingTop: 15,
  },
  cityText: {
    color: Colors.white,
    fontFamily: Fonts.OpenSans_Regular,
    fontSize: FontSizes.os_large,
    borderColor: Colors.transparentWhite,
    paddingBottom: 15,
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
  containerPadding: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  rowView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.transparentWhite,
    borderTopWidth: 1,
  },
})

export default ProfilScreen
