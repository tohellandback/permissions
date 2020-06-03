export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/about',
    exact: true,
    component: components.PAbout
  },
  {
    path: '/courses',
    exact: true,
    component: components.PCourses
  },
  {
    path: '/classes',
    exact: true,
    component: components.PClasses
  },
  {
    path: '/teams',
    exact: true,
    component: components.PTeams
  },
  {
    path: '/users',
    exact: true,
    component: components.PUsers
  }
]
