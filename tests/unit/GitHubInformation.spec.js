jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import GitHubInformation from '@/components/GitHubInformation'
import { mount } from '@vue/test-utils'

describe('GitHubInformation.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(GitHubInformation)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test setData', () => {
        const response =
            [
                {name: 'test'},
                {name: 'test2'},
                {name: 'test3'}
            ];

        const wrapper = mount(GitHubInformation)
        wrapper.vm.setData(response)
        expect(wrapper.vm.info).toEqual(response);
    });

    it('should fetch data with error', () => {
        const wrapper = mount(GitHubInformation);
        wrapper.vm.apiService.get = jest.fn(() => Promise.reject({}))

        wrapper.vm.fetchData();

        expect(wrapper.vm.error).toBe(null);
    });

    it('should fetch data', async () => {
        const wrapper = mount(GitHubInformation);
        wrapper.vm.apiService.get = jest.fn(() => Promise.resolve({}))
        const spy = jest.spyOn(wrapper.vm,'setData')

        await wrapper.vm.fetchData();

        expect(spy).toHaveBeenCalled();
    });
});
