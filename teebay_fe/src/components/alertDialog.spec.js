import React from 'react';
import ReactDOM from 'react-dom';
import AlertDialog from './AlertDialog';
import { render, cleanup } from "@testing-library/react"
import renderer from "react-test-renderer"

afterEach(cleanup)
it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AlertDialog open={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
})

it("should render AlertDialog correctly", () => {
    const { getByTestId } = render(<AlertDialog open={true} />)
    expect(getByTestId('alert-dialog')).toHaveTextContent
})

it("should match snapshot", () => {
    const tree = renderer.create(<AlertDialog open={true} />).toJSON()
    expect(tree).toMatchSnapshot()

})