import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AutoComplete from '../AutoComplete.vue'

describe('AutoComplete', () => {
  it('renders properly', () => {
    const wrapper = mount(AutoComplete)
    expect(wrapper.text()).toContain('Search for station:')
  })
}),
  it('should search for station', async () => {
    const wrapper = mount(AutoComplete)
    wrapper.get('[data-test="city"]').trigger('click')
  }),
  it('shows loading state while searching', async () => {
    const wrapper = mount(AutoComplete)
    await wrapper.setData({ loading: true })
    expect(wrapper.text()).toContain('Loading...')
  }),
  it('displays search results', async () => {
    const wrapper = mount(AutoComplete)
    await wrapper.setData({
      results: [
        { id: 1, name: 'City1' },
        { id: 2, name: 'City2' }
      ],
      showResults: true
    })
    expect(wrapper.text()).toContain('City1')
    expect(wrapper.text()).toContain('City2')
  }),
  it('emits result-selected event on selecting a result', async () => {
    const wrapper = mount(AutoComplete)
    await wrapper.setData({ results: [{ id: 1, name: 'City1' }], showResults: true })
    await wrapper.find('#results li').trigger('click')
    expect(wrapper.emitted('result-selected')).toBeTruthy()
    expect(wrapper.emitted('result-selected')[0][0]).toEqual({ id: 1, name: 'City1' })
  }),
  it('displays "City not found" message when no results', async () => {
    const wrapper = mount(AutoComplete)
    await wrapper.setData({ results: [], showResults: true })
    expect(wrapper.text()).toContain('City not found')
  }),
  it('displays error message when search fails', async () => {
    const wrapper = mount(AutoComplete)
    await wrapper.setData({ loading: false, cityNotFound: true })
    expect(wrapper.text()).toContain('City not found')
  })
