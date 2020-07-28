import React, {useState, useEffect} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'
import {useDispatch} from 'react-redux'
import {postRegister} from '../store/register/register.actions'

interface LoninScreenProps {
  navigation: StackNavigationProp<any>
}

const RegisterScreen = ({navigation}: LoninScreenProps) => {
  const [userName, setUsername] = useState(Strings.user_name)
  const [password, setPassword] = useState(Strings.password)
  const [passwordConfirmation, setPassword2] = useState(Strings.password_again)
  const [countryName, setCountry] = useState(Strings.city_name_what_you_bulid)

  const dispatch = useDispatch()

  useEffect(() => {})

  const onRegisterPress = () => {
    dispatch(
      postRegister(
        {userName, password, passwordConfirmation, countryName},
        successAction,
      ),
    )
  }
  const successAction = () => {
    navigation.replace(Screens.Login)
  }

  const onLoginPress = () => {
    navigation.replace(Screens.Login)
  }
  return (
    <LoginTemplate
      title={Strings.registration}
      change={Strings.login}
      onPressButton={onRegisterPress}
      onPressChange={onLoginPress}>
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
        style={[Margins.mbNormal]}
        secureTextEntry={true}
      />
      <CustomTextInput
        placeholder={Strings.password_again}
        placeholderTextColor={Colors.darkBlue}
        onChangeText={setPassword2}
        style={[Margins.mbNormal]}
        secureTextEntry={true}
      />
      <CustomTextInput
        placeholder={Strings.city_name_what_you_bulid}
        placeholderTextColor={Colors.darkBlue}
        onChangeText={setCountry}
      />
    </LoginTemplate>
  )
}

export default RegisterScreen
