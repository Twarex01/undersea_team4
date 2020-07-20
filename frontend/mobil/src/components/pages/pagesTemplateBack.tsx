import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors} from '../../constants/colors'
import PagesHeader from './pagesHeader'
import {Margins} from '../../constants/margins'
import {ScrollView} from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import {StatusBar} from 'expo-status-bar'
import PagesHeaderBack from './pagesHeaderBack'

interface Props {
  title: string
  children: React.ReactNode
  onPress: () => void
}

const PagesTemplateBack = ({title, children, onPress}: Props) => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <PagesHeaderBack title={title} onPress={onPress} />
        <View style={styles.backgroundView}>{children}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.middleBlue,
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  backgroundView: {
    backgroundColor: Colors.middleDarkBlue,
    flex: 1,
  },
})

export default PagesTemplateBack
