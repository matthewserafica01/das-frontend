import Page from "../app/page"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

/* describe('Page', () => {
    it('renders increment', () => {
        render(<Page />)
        const count = screen.getAllByTestId("count")
        expect(count).toHaveTextContent("Count: 0)")
    })
})

describe('Page', () => {
    it('increments the counter', () => {
        render(<Page />)
        const button = screen.getByText("Increment")
        fireEvent.click(button)
        const count = screen.getAllByTestId("count")
        expect(count).toHaveTextContent("Count: 1")
    })
}) */

test("it renders a count", () => {
    render(<Page />)
    const count = screen.getAllByTestId("count")
    expect(count).toHaveTextContent("Count: 0)")
})

test("it increments the count", () => {
    render(<Page />)
    const button = screen.getByText("Increment")
    fireEvent.click(button)
    const count = screen.getAllByTestId("count")
    expect(count).toHaveTextContent("Count: 1")
})