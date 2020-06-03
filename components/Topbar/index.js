import React from 'react'
import { View, Button } from 'react-native'
import { observer, emit } from 'startupjs'
import './index.styl'

function Topbar () {
  return pug`
    View.root
      View.button
        Button(
          title='Home'
          onPress=() => emit('url', '/')
        )
      View.button
        Button(
          title='Courses'
          onPress=() => emit('url', '/courses')
        )
      View.button
        Button(
          title='Classes'
          onPress=() => emit('url', '/classes')
      )
      View.button
        Button(
          title='Teams'
          onPress=() => emit('url', '/teams')
      )
      View.button
        Button(
          title='Users'
          onPress=() => emit('url', '/users')
      )
  `
}

export default observer(Topbar)
