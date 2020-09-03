import home from './Home'
import admin from './Admin'
import softwares from "./components/Admin/Softwares/Softwares"
import machines from './components/Admin/Machines/Machines'
import users from './components/Admin/Users/Users'
import assignedVMs from './components/Admin/AssignedVMs/AssignedVMs'
import login from './Login'
import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase'
Vue.use(Router);
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/login',
            component: login,
            name: 'login',
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/admin',
            component: admin,
            name: 'adminHome',
            meta: {
                requiresAuth: true
            },

            children: [
                {
                    path: '',
                    component: assignedVMs,
                    name: 'assignedVMs',
                    // meta: {
                    //     requiresAuth: true
                    // },
                },
                {
                    path: 'software',
                    component: softwares,
                    name: 'softwares'
                },
                {
                    path: 'machines',
                    component: machines,
                    name: 'machines'
                },
                {
                    path: 'users',
                    component: users,
                    name: 'users'
                }
            ]
        }
    ]
});
// export const routes = [
//     {
//         path: '/',
//         component: home
//     },
//     {
//         path: '/login',
//         component: login,
//         name: 'login',
//         meta: {
//             requiresGuest: true
//         }
//     },
//     {
//         path: '/admin',
//         component: admin,

//         children: [
//             {
//                 path: '',
//                 component: assignedVMs,
//                 name: 'assignedVMs',
//                 meta: {
//                     requiresAuth: true
//                 },
//             },
//             {
//                 path: 'software',
//                 component: softwares,
//                 name: 'softwares'
//             },
//             {
//                 path: 'machines',
//                 component: machines,
//                 name: 'machines'
//             },
//             {
//                 path: 'users',
//                 component: users,
//                 name: 'users'
//             }
//         ]
//     }
// ]
router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if NO logged user
        if (!firebase.auth().currentUser) {
            // Go to login
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Proceed to route
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        // Check if NO logged user
        if (firebase.auth().currentUser) {
            // Go to login
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Proceed to route
            next();
        }
    } else {
        // Proceed to route
        next();
    }
});
export default router;

