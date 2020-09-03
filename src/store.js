import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        Softwares: [],
        Machines: [],
        Users: [],
        AssignedMachines: [],
        colors: ["deep-purple", "teal", "grey", "indigo", "yellow", "black", "cyan"]
    },
    getters: {
        getLabelColor: (state) => (id) => {
            //return state.colors
            return "w3-tag" + " w3-" + state.colors[id % state.colors.length];
        },
        getAssignedVms: (state) => {
            return state.Machines.filter((item) => {
                return item.assigned == true;
            });
        },
        getUnAssignedVms: (state) => {
            return state.Machines.filter((item) => {
                return item.assigned == false;
            });
        },
        isLoggedIn() {
            //return firebase.auth().currentUser;
        },

    },
    mutations: {
        ...vuexfireMutations,
        addSoftware(state, payload) {
            state.Softwares.push(payload);
        },
        removeSoftware(state, payload) {
            state.Softwares.splice(payload, 1);
        },
        addMachine(state, payload) {
            state.Machines.push(payload);
        },
        removeMachine(state, payload) {
            state.Machines.splice(payload, 1);
        },
        addUser(state, payload) {
            state.Users.push(payload);
        },
        removeUser(state, payload) {
            state.Users.splice(payload, 1);
        },
        assignMachine(state, payload) {
            state.AssignedMachines.push(payload);
        },
        unAssignMachine(state, payload) {
            state.AssignedMachines.splice(payload, 1);
        }
    },
    actions: {


        bindSoftwares: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('Softwares', db.collection('Softwares'))
        }),
        addSoftware: firestoreAction((context, payload) => {
            return db.collection('Softwares').add(payload)
        }),
        removeSoftware: firestoreAction((context, payload) => {
            db.collection('Softwares')
                .doc(payload)
                .delete()
        }),
        updateSoftware: firestoreAction((context, payload) => {
            db.collection('Softwares')
                .doc(payload.id)
                .set(payload)
        }),

        //Machines

        bindMachines: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('Machines', db.collection('Machines'))
        }),
        addMachine: firestoreAction((context, payload) => {
            return db.collection('Machines').add(payload)
        }),
        updateMachine: firestoreAction((context, payload) => {
            db.collection('Machines')
                .doc(payload.id)
                .set(payload)
        }),
        removeMachine: firestoreAction((context, payload) => {
            db.collection('Machines')
                .doc(payload)
                .delete()
        }),

        assignMachine: firestoreAction((context, payload) => {
            const allocation = {
                'user': payload.user,
                'testCycle': payload.testCycle,
                'remarks': payload.remarks
            }
            db.collection('Machines')
                .doc(payload.machine.id)
                .update({ allocation: allocation, assigned: true })
        }),
        unAssignMachine: firestoreAction((context, payload) => {
            console.log("unassignmachine", payload);
            db.collection('Machines')
                .doc(payload.id)
                .update({ allocation: {}, assigned: false })
        }),

        updateAssignedMachine: firestoreAction((context, payload) => {

            db.collection('Machines')
                .doc(payload.id)
                .update({ allocation: payload.allocation, assigned: true })
        }),

        //Users
        bindUsers: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('Users', db.collection('Users'))
        }),
        addUser: firestoreAction((context, payload) => {
            return db.collection('Users').add(payload)
        }),
        removeUser: firestoreAction((context, payload) => {
            db.collection('Users')
                .doc(payload)
                .delete()
        }),
    }
})