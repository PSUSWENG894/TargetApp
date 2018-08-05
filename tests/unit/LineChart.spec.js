import Vue from 'vue'
import LineChart from '@/components/LineChart'

describe('LineChart.vue', () => {
    it('should create', () => {
        const Constructor = Vue.extend(LineChart)
        const vm = new Constructor().$mount()        

        expect(vm).toBeTruthy();
    });
});