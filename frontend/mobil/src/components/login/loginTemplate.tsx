import React, {useState, Children} from 'react'
import CustomButton from '../../components/button/customButton'
import {StatusBar} from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {Images} from '../../constants/images'
import {Fonts, FontSizes} from '../../constants/fonts'
import {ScrollView} from 'react-native-gesture-handler'

interface Props {
  title: string
  change: string
  onPressButton: () => void
  onPressChange: () => void
  children: React.ReactNode
}

const LoginTemplate = ({
  title,
  change,
  onPressButton,
  onPressChange,
  children,
}: Props) => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
      <StatusBar style="dark" />
      <ImageBackground
        source={Images.sign_in_bg}
        style={styles.imageBackground}>
        <Image
          source={Images.undersea}
          style={[{marginTop: 80}, Margins.mbLarge]}
        />
        <View style={styles.transparentView}>
          <Text style={[styles.singinText, Margins.mtBig, Margins.mbBig]}>
            {title}
          </Text>
          {children}
          <CustomButton
            style={[Margins.mtBig, Margins.mbBig]}
            title={title}
            onPress={onPressButton}
          />

          <Text
            style={[styles.simpleText, Margins.mbBig]}
            onPress={onPressChange}>
            {change}
          </Text>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singinText: {
    color: Colors.darkBlue,
    fontSize: FontSizes.ba2_large,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },

  imageBackground: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  transparentView: {
    width: '90%',
    minHeight: '60%',
    backgroundColor: Colors.transparentWhite,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  simpleText: {
    color: Colors.darkBlue,
    fontSize: FontSizes.b2_normal,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },
  scrollView: {
    flex: 1,
  },
})

export default LoginTemplate
