jest.mock('axios', () => require('./axios.mock'));

import Vue from 'vue'
import SiteButton from '@/components/SiteButton'
import { mount } from '@vue/test-utils'

describe('SiteButton.vue', () => {

    it('should render correct contents', () => {
        const Constructor = Vue.extend(SiteButton)
        const vm = new Constructor().$mount()
        expect(vm).toBeTruthy()
    });

    it('test visitSite', () => {
        const wrapper = mount(SiteButton)
        wrapper.vm.visitSite()

        expect(wrapper.vm.siteUrl).toBe(null)
    });
});
