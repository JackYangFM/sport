const ParentWy =()=>import('./parentwy')
const ParentTbl =()=>import('./parenttbl')
const ParentHhl =()=>import('./parenthhl')

export default [
  {
    path:'/parentwy',
    name:'parentwy',
    component:ParentWy
  },
  {
    path:'/parenttbl',
    name:'parenttbl',
    component:ParentTbl
  },
  {
    path:'/parenthhl',
    name:'parenthhl',
    component:ParentHhl
  }
]

