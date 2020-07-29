import React, {useState, useEffect} from 'react'
import LoginTemplate from '../components/login/loginTemplate'
import CustomTextInput from '../components/text-input/customTextInput'
import {StackNavigationProp} from '@react-navigation/stack'
import {Margins} from '../constants/margins'
import {Strings} from '../constants/strings'
import {Screens} from '../constants/screens'
import {Colors} from '../constants/colors'
import {useDispatch, useSelector} from 'react-redux'
import {postRegister} from '../store/register/register.actions'
import {IApplicationState} from '../../store'
import {showMessage} from 'react-native-flash-message'

interface LoninScreenProps {
  navigation: StackNavigationProp<any>
}

const RegisterScreen = ({navigation}: LoninScreenProps) => {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPassword2] = useState('')
  const [countryName, setCountry] = useState('')
  const [disabled, setDisabled] = useState(true)

  const {register, error, isLoading} = useSelector(
    (state: IApplicationState) => state.app.register,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      userName === '' ||
      password === '' ||
      passwordConfirmation === '' ||
      countryName === ''
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [userName, password, passwordConfirmation, countryName])

  const onRegisterPress = () => {
    dispatch(
      postRegister(
        {userName, password, passwordConfirmation, countryName},
        successAction,
        failAction,
      ),
    )
  }
  const successAction = () => {
    navigation.replace(Screens.Login)
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

  const onLoginPress = () => {
    navigation.replace(Screens.Login)
  }
  return (
    <LoginTemplate
      title={Strings.registration}
      change={Strings.login}
      onPressButton={onRegisterPress}
      onPressChange={onLoginPress}
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
