import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'
beforeEach(() => {
  jest.clearAllMocks()
})

jest.mock('@/services/axios')

describe('MessageDisplay', () => {
  test('Calls getMessage and displays message', async () => {
    //mock the API call
    const mockMessage = 'Hello from the db!'
    getMessage.mockResolvedValueOnce({ text: mockMessage })
    const wrapper = mount(MessageDisplay)
    //wait for promise to resolve
    await flushPromises()
    //check that API call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)
    //check that the component displays message
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  })

  test('Displays an error when getMessage call fails', async () => {
    //mock the API call
    const mockError = 'Oops ! Something went wrong.'
    getMessage.mockRejectedValueOnce(mockError)
    const wrapper = mount(MessageDisplay)
    //wait for promise to reject
    await flushPromises()
    //check that API call happened once
    expect(getMessage).toHaveBeenCalledTimes(1)
    //check that the component displays message
    const error = wrapper.find('[data-testid="message-error"]').element
      .textContent
    expect(error).toEqual(mockError)
  })
})
