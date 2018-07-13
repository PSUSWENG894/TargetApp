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

    it('test organizeData', () => {
        const user1 = 'auth1';
        const user2 = 'auth2';
        const user3 = 'auth3';
        const auth1Repo1Contributions = 1;
        const auth2Repo1Contributions = 4;
        const auth1Repo2Contributions = 4;
        const auth3Repo2Contributions = 5;
        const contributionResponse =
            [
                [
                    {
                        author: { login: user1 },
                        total: auth1Repo1Contributions
                    },
                    {
                        author: { login: user2 },
                        total: auth2Repo1Contributions
                    }
                ],
                [
                    {
                        author: { login: user1 },
                        total: auth1Repo2Contributions
                    },
                    {
                        author: { login: user3 },
                        total: auth3Repo2Contributions
                    }
                ]
            ];

        const repo1Name = 'TestRepo1';
        const repo2Name = 'TestRepo2';
        const promiseAll = [{repo: repo1Name}, {repo: repo2Name}];

        const wrapper = mount(DeveloperContributions);
        const organizedData = wrapper.vm.organizeData(promiseAll, contributionResponse);

        expect(organizedData[0].author).toEqual(user1);
        expect(organizedData[0].contributions[0].repository).toEqual(repo1Name);
        expect(organizedData[0].contributions[1].repository).toEqual(repo2Name);
        expect(organizedData[1].contributions[0].contribution.total).toEqual(auth2Repo1Contributions);
    });
});
