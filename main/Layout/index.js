import React from 'react'
import { observer, emit } from 'startupjs'
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Topbar } from 'components'
import './index.styl'

export default observer(function ({ children }) {
  return pug`
    ScrollView(style={flex: 1})
      View.menu
        Topbar
        TouchableOpacity.item(onPress=() => emit('url', '/'))
          Text.logo App
        TouchableOpacity.item(onPress=() => emit('url', '/about'))
          Text About us
      View.body= children
  `
})
