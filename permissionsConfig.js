module.exports = {
  permissions: {
    Admin: ['global.admin', 'global.addCourse', 'course.edit', 'class.edit'],
    Student: ['course.view'],
    'Class Admin': ['class.edit'],
    'Class Student': ['class.view'],
    'Course Admin': ['course.edit']
  },
  roles: {
    global: ['Admin', 'Student'],
    class: ['Class Admin', 'Class Student'],
    course: ['Course Admin']
  },
  scopes: {
    /* тут будет задавать дерево иерархии скоупов потом, пока не надо */
  },
  entities: {
    class: {
      connections: [
        {
          to: 'user',
          type: 'belongsToMany'
        },
        {
          to: 'team',
          type: 'belongsTo'
        }
      ]
    },
    team: {
      connections: [
        {
          to: 'user',
          type: 'hasMany'
        }
      ]
    }
  }
}
