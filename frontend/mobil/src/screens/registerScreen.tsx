import React, {useState} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'

interface LoninScreenProps {
  navigation: StackNavigationProp<any>
}

const RegisterScreen = ({navigation}: LoninScreenProps) => {
  const [username, setUsername] = useState(Strings.user_name)
  const [password, setPassword] = useState(Strings.password)
  const [password2, setPassword2] = useState(Strings.password_again)
  const [country, setCountry] = useState(Strings.city_name_what_you_bulid)

  const onLoginPress = () => {
    navigation.replace(Screens.Main)
  }
  const onRegisterPress = () => {
    navigation.replace(Screens.Login)
  }
  return (
    <LoginTemplate
      title={Strings.registration}
      text={Strings.registration_text}
      change={Strings.registration_replace_text}
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
