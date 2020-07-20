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

const ScrollablePagesTemplate = ({title, children}: Props) => {
  return (
    <View style={styles.statusBar}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <PagesHeader title={title} />

        <ScrollView style={styles.scrollView}>
          <View
            style={[
              styles.contentView,
              Margins.mtLarge,
              Margins.mlBig,
              Margins.mrBig,
            ]}>
            {children}
          </View>
        </ScrollView>
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
  scrollView: {
    backgroundColor: Colors.middleDarkBlue,
  },
  contentView: {},
})

export default ScrollablePagesTemplate
