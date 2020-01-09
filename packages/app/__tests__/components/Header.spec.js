import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Header from "../../components/Header";
import Toolbar from "@material-ui/core/Toolbar";

describe("Header component", () => {
  describe("UI tests", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Header />);
    });

    it.skip("renders a <Toolbar /> component", () => {
      const result = wrapper.find(Toolbar).length;
      expect(result).toBe(1);
    });
  });

  describe("Snapshot tests", () => {
    it.skip("renders correctly using renderer", () => {
      const tree = renderer.create(<Header />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
