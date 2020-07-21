import React, {useState, useEffect} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'
import {useDispatch} from 'react-redux'
import {postLogin} from '../store/login/login.actions'
import AsyncStorage from '@react-native-community/async-storage'
import {Token} from '../constants/token'
import jwt_decode from 'jwt-decode'
import {exp} from 'react-native-reanimated'

interface LoginScreenProps {
  navigation: StackNavigationProp<any>
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [username, setUsername] = useState(Strings.user_name)
  const [password, setPassword] = useState(Strings.password)

  const dispatch = useDispatch()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const accessToken = await AsyncStorage.getItem(Token.ACCESS_TOKEN)
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken)
      if (Date.now() <= decodedToken.exp * 1000) {
        navigation.replace(Screens.Main)
      } else {
        await AsyncStorage.setItem(Token.ACCESS_TOKEN, '')
      }
    }
  }

  const onLoginPress = () => {
    dispatch(postLogin({password, username}, succesAction))
  }
  const succesAction = () => {
    navigation.replace(Screens.Main)
  }
  const onRegisterPress = () => {
    navigation.replace(Screens.Registration)
  }
  return (
    <LoginTemplate
      title={Strings.login}
      text={Strings.login_text}
      change={Strings.login_replace_text}
      onPressButton={onLoginPress}
      onPressChange={onRegisterPress}>
      <CustomTextInput
        placeholder={Strings.user_name}
        placeholderTextColor={Colors.darkBlue}
        onChangeText={setUsername}
        style={[Margins.mbNormal]}
      />
      <CustomTextInput
        placeholder={Strings.password}
        placeholderTextColor={Colors.darkBlue}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
    </LoginTemplate>
  )
}

export default LoginScreen
