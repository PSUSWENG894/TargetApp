jest.mock('axios', () => require('./axios.mock.post'));

import Vue from 'vue'
import BuildButton from '@/components/BuildButton'
import { mount } from '@vue/test-utils'

describe('BuildButton.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(BuildButton)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test buildRepo', () => {
        const wrapper = mount(BuildButton)
        wrapper.vm.buildRepo()

        expect(wrapper.vm.buildId).toBe(null)
    });
});
