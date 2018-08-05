import Vue from 'vue'
import Repository from '@/components/Repository'

describe('Repository.vue', () => {
    it('should create', () => {
        const Constructor = Vue.extend(Repository)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });
});