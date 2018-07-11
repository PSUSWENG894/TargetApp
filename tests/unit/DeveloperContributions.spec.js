jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import DeveloperContributions from '@/components/DeveloperContributions'
import { mount } from '@vue/test-utils'

describe('DeveloperContributions.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(DeveloperContributions)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test setData', () => {
        const response =
            [
                {author: 'auth1', contributions: [
                    {repository: 'TestRepo1', contribution: {total: 1}},
                    {repository: 'TestRepo2', contribution: {total: 4}}]},
                {author: 'auth2', contributions: [{repository: 'TestRepo1', contribution: {total: 4}}]},
                {author: 'auth3', contributions: [{repository: 'TestRepo2', contribution: {total: 5}}]},
            ];

        const wrapper = mount(DeveloperContributions)
        wrapper.vm.setData(response)
        expect(wrapper.vm.info).toEqual(response);
    });
});
