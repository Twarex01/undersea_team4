import React, {useState, Children} from 'react'
import CustomButton from '../../components/button/customButton'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import {Colors} from '../../constants/colors'
import {Margins} from '../../constants/margins'
import {Images} from '../../constants/images'
import {Fonts, FontSizes} from '../../constants/fonts'

interface Props {
  title: string
  text: string
  change: string
  onPressButton: () => void
  onPressChange: () => void
  children: React.ReactNode
}

const LoginTemplate = ({
  title,
  text,
  change,
  onPressButton,
  onPressChange,
  children,
}: Props) => {
  return (
    <View style={styles.container}>
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
          <Text style={[styles.simpleText, Margins.mbBig]}>
            {text}{' '}
            <Text style={styles.simpleTextUnderline} onPress={onPressChange}>
              {change}
            </Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.vibrantLightBlue,
  },
  singinText: {
    color: Colors.darkBlue,
    fontSize: FontSizes.ba2_large,
    fontFamily: Fonts.Baloo2_ExtraBold,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  simpleTextUnderline: {
    textDecorationLine: 'underline',
  },
})

export default LoginTemplate
