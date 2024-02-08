import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeekView from '../WeekView.vue'

describe('WeekView', () => {
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
      endDate: '2021-07-17T08:51:27.402Z'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      startDate: '2024-02-13T14:30:00Z',
      endDate: '2021-08-10T10:35:41.773Z'
    }
  ]

  it('renders properly with selected station name', () => {
    const wrapper = mount(WeekView, { props: { selectedStation, weekDays, bookings } })
    expect(wrapper.text()).toContain('Week View for:')
    expect(wrapper.text()).toContain(selectedStation.name)
  })

  it('displays week calendar and day tiles', () => {
    const wrapper = mount(WeekView, { props: { selectedStation, weekDays, bookings } })
    expect(wrapper.findComponent({ name: 'VCalendar' }).exists())
    expect(wrapper.findAll('.day-tile')).toHaveLength(7)
  })

  it('displays bookings for each day', () => {
    const wrapper = mount(WeekView, { props: { selectedStation, weekDays, bookings } })
    expect(wrapper.findAll('.day-tile ul li')).toHaveLength(bookings.length)
  })

  it('emits open-booking-details event on clicking a booking', async () => {
    const wrapper = mount(WeekView, { props: { selectedStation, weekDays, bookings } })
    await wrapper.setData({ selectedBooking: null }) // Ensure selectedBooking is initially null
    await wrapper.find('.day-tile ul li').trigger('click')
    expect(wrapper.emitted('open-booking-details')).toBeTruthy()
    expect(wrapper.emitted('open-booking-details')[0][0]).toEqual(bookings[0])
    expect(wrapper.vm.selectedBooking).toEqual(bookings[0])
  })
})
