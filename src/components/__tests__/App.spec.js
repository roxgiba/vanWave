import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  const selectedStation = {
    id: 1,
    name: 'Station A'
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const bookings = [
    {
      id: 1,
      customerName: 'John Doe',
      startDate: '2024-02-12T10:00:00Z',
      endDate: '2024-02-15T14:30:00Z'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      startDate: '2024-02-13T14:30:00Z',
      endDate: '2024-02-16T18:45:00Z'
    }
  ]

  const selectedBooking = {
    id: 1,
    customerName: 'John Doe',
    startDate: '2024-02-12T10:00:00Z',
    endDate: '2024-02-15T14:30:00Z'
  }

  it('renders properly with header and AutoComplete component', () => {
    const wrapper = mount(App, { props: { selectedStation, weekDays, bookings, selectedBooking } })
    expect(wrapper.text()).toContain('VanWave')
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.findComponent({ name: 'AutoComplete' }).exists()).toBe(true)
  })

  it('displays WeekView component when loading is false', async () => {
    const wrapper = mount(App, {
      props: { selectedStation, weekDays, bookings, selectedBooking, loading: false }
    })
    expect(wrapper.findComponent({ name: 'WeekView' }).exists()).toBe(true)
  })

  it('displays BookingDetailModal component when selectedBooking is present', async () => {
    const wrapper = mount(App, { props: { selectedStation, weekDays, bookings, selectedBooking } })
    expect(wrapper.findComponent({ name: 'BookingDetailModal' }).exists()).toBe(true)
  })
})
