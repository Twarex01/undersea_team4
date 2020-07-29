import React, {useState, useEffect} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'
import {useDispatch, useSelector} from 'react-redux'
import {postLogin} from '../store/login/login.actions'
import AsyncStorage from '@react-native-community/async-storage'
import {Token} from '../constants/token'
import jwt_decode from 'jwt-decode'
import FlashMessage, {showMessage} from 'react-native-flash-message'
import {IApplicationState} from '../../store'

interface LoginScreenProps {
  navigation: StackNavigationProp<any>
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  const {login, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.login,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    if (username === '' || password === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [username, password])

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
    dispatch(postLogin({password, username}, successAction, failAction))
  }
  const successAction = () => {
    navigation.replace(Screens.Main)
  }
  const failAction = () => {
    if (error) {
      showMessage({
        message: error,
        backgroundColor: Colors.darkBlue,
        color: Colors.vibrantLightBlue,
      })
    }
  }

  const onRegisterPress = () => {
    navigation.replace(Screens.Registration)
  }
  return (
    <LoginTemplate
      title={Strings.login}
      change={Strings.registration}
      onPressButton={onLoginPress}
      onPressChange={onRegisterPress}
      disabled={disabled}>
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
      <FlashMessage />
    </LoginTemplate>
  )
}

export default LoginScreen
