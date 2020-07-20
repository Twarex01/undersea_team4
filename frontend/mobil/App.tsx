import React, {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import LoginScreen from './src/screens/loginScreen'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import RegisterScreen from './src/screens/registerScreen'
import {useFonts, Baloo2_800ExtraBold} from '@expo-google-fonts/baloo-2'
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans'
import {View, UIManager, Platform} from 'react-native'
import {Screens} from './src/constants/screens'
import MainScreen from './src/screens/mainScreen'
import BuildingsScreen from './src/screens/buildingsScreen'
import UpgradesScreen from './src/screens/upgradesScreen'
import FightScreen from './src/screens/fightScreen'
import BevyScreen from './src/screens/bevyScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ProfilScreen from './src/screens/profilScreen'
import RankingScreen from './src/screens/rankingScreen'
import AttackFirstScreen from './src/screens/attackFirstScreen'
import AttackSecondScreen from './src/screens/attackSecondScreen'
import {Provider} from 'react-redux'
import {configureStore} from './config/storeconfig'
import {Fonts, FontSizes} from './src/constants/fonts'
import {Colors} from './src/constants/colors'

const RootStack = createStackNavigator()
const LoginStack = createStackNavigator()

function RootStackScreen() {
  return (
    <RootStack.Navigator mode={'modal'} screenOptions={{headerShown: false}}>
      <RootStack.Screen name={'LoginStack'} component={LoginStackScreen} />
      <RootStack.Screen name={Screens.Profil} component={ProfilScreen} />
    </RootStack.Navigator>
  )
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name={Screens.Login} component={LoginScreen} />
      <LoginStack.Screen
        name={Screens.Registration}
        component={RegisterScreen}
      />
      <LoginStack.Screen name={Screens.Main} component={TabStackScreen} />
    </LoginStack.Navigator>
  )
}

const AttackStack = createStackNavigator()

function AttackStackScreen() {
  return (
    <AttackStack.Navigator screenOptions={{headerShown: false}}>
      <AttackStack.Screen
        name={Screens.AttackFirst}
        component={AttackFirstScreen}
      />
      <AttackStack.Screen
        name={Screens.AttackSecond}
        component={AttackSecondScreen}
      />
    </AttackStack.Navigator>
  )
}

const TabStack = createBottomTabNavigator()

function TabStackScreen() {
  return (
    <TabStack.Navigator
      tabBarOptions={{
        labelStyle: styles.tab,
        activeTintColor: Colors.darkBlue,
        style: styles.background,
      }}>
      <TabStack.Screen name={Screens.Main} component={MainScreen} />
      <TabStack.Screen name={Screens.Buildings} component={BuildingsScreen} />
      <TabStack.Screen
        name={Screens.AttackFirst}
        component={AttackStackScreen}
      />
      <TabStack.Screen name={Screens.Fight} component={FightScreen} />
    </TabStack.Navigator>
  )
}

const App = () => {
  const store = configureStore()

  let [fontsLoaded] = useFonts({
    Baloo2_800ExtraBold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  })

  useEffect(() => {
    if (Platform.OS === 'android')
      UIManager.setLayoutAnimationEnabledExperimental(true)
  }, [])

  if (!fontsLoaded) {
    return <View />
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  tab: {
    fontFamily: Fonts.Baloo2_ExtraBold,
    fontSize: FontSizes.b2_small,
  },
  background: {
    backgroundColor: Colors.vibrantLightBlue,
  },
})

export default App
