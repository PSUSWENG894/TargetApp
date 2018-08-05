import Vue from 'vue'
import PassFailChart from '@/components/PassFailChart'

describe('PassFailChart.vue', () => {
    it('should create', () => {
        const Constructor = Vue.extend(PassFailChart)
        const vm = new Constructor().$mount()        

        expect(vm).toBeTruthy();
    });
});