import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors} from '../../constants/colors'
import PagesHeader from './pagesHeader'
import {Margins} from '../../constants/margins'
import {ScrollView} from 'react-native-gesture-handler'
import Constants from 'expo-constants'
import {StatusBar} from 'expo-status-bar'

interface Props {
  title: string
  children: React.ReactNode
}

const PagesTemplate = ({title, children}: Props) => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <PagesHeader title={title} />
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

export default PagesTemplate
