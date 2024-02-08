import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookingDetailModal from '../BookingDetailModal.vue'

describe('BookingDetailModal', () => {
  const selectedBooking = {
    id: 1,
    customerName: 'John Doe',
    startDate: '2024-02-12T10:00:00Z',
    endDate: '2024-02-15T14:30:00Z'
  }

  const selectedStation = {
    id: 1,
    name: 'Station A'
  }

  it('renders properly with booking details', () => {
    const wrapper = mount(BookingDetailModal, { props: { selectedBooking, selectedStation } })
    expect(wrapper.text()).toContain("Customer's Booking Details")
    expect(wrapper.text()).toContain('Full Name')
    expect(wrapper.text()).toContain('Start Date')
    expect(wrapper.text()).toContain('End Date')
    expect(wrapper.text()).toContain('Duration')
    expect(wrapper.text()).toContain('Return Station')
  })

  it('emits close-booking-details event on clicking close button', async () => {
    const wrapper = mount(BookingDetailModal, { props: { selectedBooking, selectedStation } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close-booking-details')).toBeTruthy()
  })
})
