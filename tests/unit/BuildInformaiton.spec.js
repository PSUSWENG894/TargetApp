import Vue from 'vue'
import BuildInformation from '@/components/BuildInformation'
import { axios } from 'axios'
jest.mock('axios', () => require('./axios.mock'));

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
        console.log(component.info)

        expect(component.info).toBeTruthy()
        expect(component.passCount).toBe(1)
        expect(component.failCount).toBe(0)
        expect(component.loaded).toBe(true)
    });
});
