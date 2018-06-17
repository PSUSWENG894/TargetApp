jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import BuildInformation from '@/components/BuildInformation'
import axios from 'axios'

describe('BuildInformation.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(BuildInformation)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('should get data', () => {
        const response = {
            data: [{
                builds: [{
                    state: 'passed',
                }]
            }]
        }
        axios.get.mockResolvedValue(Promise.resolve(response))
        const Constructor = Vue.extend(BuildInformation)
        const component = new Constructor().$mount()
        
        console.log(component)
        console.log(component._data.info)

        expect(component._data.info).toBeTruthy()
        expect(component._data.passCount).toBe(1)
        expect(component._data.failCount).toBe(0)
        expect(component._data.loaded).toBe(true)
    });
});
