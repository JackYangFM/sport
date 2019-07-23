const CourseArrangement = () => import('./courseArrangement')
const CourseArrangementPlan = () => import('./courseArrangementPlan')

export default [
    {
        path: '/courseArrangement',
        name: 'courseArrangement',
        component: CourseArrangement
    },
    {
        path: '/courseArrangementPlan',
        name: 'courseArrangementPlan',
        component: CourseArrangementPlan
    },
]


