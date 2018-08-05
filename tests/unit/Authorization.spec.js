jest.mock("axios", () => require("./axios.mock"));

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import VueMaterial from "vue-material";
import Cookies from 'js-cookie';
import createPersistedState from 'vuex-persistedstate';

import Authorization from '@/components/Authorization'

describe('Authorization.vue', () => {
    Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            gitOrgName: null,
            gitAPIKey: null,
            travisAPIKey: null
        },
        plugins: [createPersistedState({
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, {
                    expires: 3
                }),
                removeItem: key => Cookies.remove(key)
            }
        })],
        mutations: {
            setGitOrg(state, orgName) {
                state.gitOrgName = orgName
            },
            setGitAPI(state, apiKey) {
                state.gitAPIKey = apiKey
            },
            setTravisAPI(state, apiKey) {
                state.travisAPIKey = apiKey
            }
        }
    })
    let router = new VueRouter({
        routes: [{
            name: "dashboard-home",
            path: "dashboard-home"
        }]
    });

    beforeAll(() => {
        Vue.use(VueRouter);
        Vue.use(VueMaterial);
        Vue.use(Vuex);
    });

    it('should create without props', () => {
        const Constructor = Vue.extend({ ...Authorization,
            store
        })
        const vm = new Constructor().$mount()

        expect(vm).toBeTruthy();
    });

    it('should create with props', () => {

        store.commit('setGitOrg', 'test')
        store.commit('setGitAPI', 'test')
        store.commit('setTravisAPI', 'test')

        const Constructor = Vue.extend({ ...Authorization,
            router,
            store
        });

        const spy = jest.spyOn(router, 'push');
        const vm = new Constructor().$mount();

        expect(vm).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should alert when form is not filled out correctly', () => {
        const spy = jest.spyOn(window, 'alert');

        const Constructor = Vue.extend({ ...Authorization,
            store
        })
        const vm = new Constructor().$mount();

        vm.checkForm();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should route when form properly filled out', () => {

        const Constructor = Vue.extend({ ...Authorization,
            router,
            store
        });

        const routerSpy = jest.spyOn(router, 'push');
        const storeSpy = jest.spyOn(store, 'commit');

        const vm = new Constructor().$mount();
        vm.form.organization = 'test'
        vm.form.organization = 'test'
        vm.form.apiKeyGitHub = 'test'
        vm.form.apiKey = 'test'

        vm.checkForm()

        expect(routerSpy).toHaveBeenCalledTimes(3);
        expect(storeSpy).toHaveBeenCalledTimes(3);
    });
});