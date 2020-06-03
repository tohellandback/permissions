import React from 'react'
import { View, Text } from 'react-native'
import { observer, useQuery, $root } from 'startupjs'
import { AddItem, Card } from 'components'
import { getConfig } from './../../../permissions/model'
import './index.styl'

function PCourses () {
  const [courses, $courses] = useQuery('courses', {})
  console.log(getConfig())

  async function addItem (data) {
    const courseId = await $courses.add(data)
    console.log('[NEW COURSE]: ', courseId)
  }

  return pug`
    View.root
      AddItem(
        onOk=addItem
      )
      each course in courses
        Card.course(key=course.id)
          Text Name:&nbsp;
            Text= course.name
          Text ID:&nbsp;
            Text= course.id
      else
        Text Hello PCourses
  `
}

export default observer(PCourses)
