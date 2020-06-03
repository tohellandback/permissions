import React from 'react'
import { View, TextInput, Button } from 'react-native'
import { observer, useValue } from 'startupjs'
import './index.styl'

function AddItem ({ onOk, placeholder }) {
  const [data, $data] = useValue({})

  async function handleSubmit () {
    await onOk({ ...data })
    $data.set({})
  }

  return pug`
    View.root
      TextInput.input(
        value=data.name
        placeholder=placeholder
        onChangeText=(text) => $data.set('name', text)
      )
      Button(
        title='ok'
        onPress=handleSubmit
      )
  `
}

export default observer(AddItem)
