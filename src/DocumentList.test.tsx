import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './test-utils'
import DocumentList from './DocumentList'

test('renders document list table', () => {
  render(<DocumentList />)
  const columnHeader = screen.getByText(/document id/i)
  expect(columnHeader).toBeInTheDocument()
})
