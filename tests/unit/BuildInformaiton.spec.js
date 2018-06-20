jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import BuildInformation from '@/components/BuildInformation'
import axios from 'axios'
import { mount } from '@vue/test-utils'

describe('BuildInformation.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(BuildInformation)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test setData', () => {
        const response = {
            builds: [
                {state: 'passed',},
                {state: 'passed',},
                {state: 'failed',},
            ]
        }
        const wrapper = mount(BuildInformation)
        wrapper.vm.setData(response)

        expect(wrapper.vm.passCount).toBe(2)
        expect(wrapper.vm.failCount).toBe(1)
    });
});
