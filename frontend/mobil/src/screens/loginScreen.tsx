import React, {useState} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'

interface LoginScreenProps {
  navigation: StackNavigationProp<any>
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [username, setUsername] = useState(Strings.user_name)
  const [password, setPassword] = useState(Strings.password)
  const onLoginPress = () => {
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
