jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import Repositories from '@/components/Repositories'
import { mount } from '@vue/test-utils'

describe('Repositories.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(Repositories)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test getRepoHref', () => {
        const response = 'test';

        const wrapper = mount(Repositories)
	var href = wrapper.vm.getRepoHref({"@href": "test"})
        expect(href).toEqual(response);
    });

    it('test buildAll', () => {
	const response = false;
	
        const wrapper = mount(Repositories)
	wrapper.vm.buildAll()
        expect(wrapper.vm.needsReload).toEqual(response);
    });
});
