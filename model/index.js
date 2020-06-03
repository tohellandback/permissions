import UserModel from './UserModel'
import TeamModel from './TeamModel'
import ClassModel from './ClassModel'
import CourseModel from './CourseModel'
import { initConfig } from './../permissions/model'
import permissionsConfig from './../permissionsConfig'

export default function (racer) {
  initConfig(permissionsConfig)
  racer.orm('users.*', UserModel)
  racer.orm('teams.*', TeamModel)
  racer.orm('classes.*', ClassModel)
  racer.orm('courses.*', CourseModel)
}
