jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import BuildInformation from '@/components/BuildInformation'
import { mount } from '@vue/test-utils'

describe('BuildInformation.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(BuildInformation);
        const vm = new Constructor().$mount();
        expect(vm).toBeTruthy()
    });

    it('test setData', () => {
        const response = {
            builds: [
                {state: 'passed',},
                {state: 'passed',},
                {state: 'failed',},
            ]
        };
        const wrapper = mount(BuildInformation);
        wrapper.vm.setData(response);

        expect(wrapper.vm.passCount).toBe(2);
        expect(wrapper.vm.failCount).toBe(1);
    });

    it('test updateBuildTimeChartData', () => {
        const response = {
            builds: [
                {state: 'passed', duration: 10, finished_at: new Date("2018-01-25").toISOString()},
                {state: 'passed', duration: 20, finished_at: new Date("2015-02-25").toISOString()},
                {state: 'failed', duration:5, finished_at: new Date("2015-03-25").toISOString()},
            ]
        };
        const wrapper = mount(BuildInformation);
        wrapper.vm.updateBuildTimeChartData(response.builds);

        expect(wrapper.vm.buildTimeChartDataSuccess.datasets[0].data).toEqual(expect.arrayContaining([10,20]));
        expect(wrapper.vm.buildTimeChartDataSuccess.labels).toEqual(expect.arrayContaining([new Date("2018-01-25").toDateString(),new Date("2015-02-25").toDateString()]));
        expect(wrapper.vm.buildTimeChartDataUnsuccess.datasets[0].data).toEqual(expect.arrayContaining([5]));
        expect(wrapper.vm.buildTimeChartDataUnsuccess.labels).toEqual(expect.arrayContaining([new Date("2015-03-25").toDateString()]));
    });
});
