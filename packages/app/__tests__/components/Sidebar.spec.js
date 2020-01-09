import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import Sidebar from "../../components/Sidebar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

const NOOP = () => {};

describe.skip("Sidebar component", () => {
  describe("UI tests", () => {
    it("renders a Drawer component", () => {
      const wrapper = shallow(
        <Sidebar
          theme={{
            direction: "ltr"
          }}
          open={false}
          handleDrawerClose={NOOP}
        />
      );
      const result = wrapper.find(Drawer).length;

      expect(result).toEqual(1);
    });

    it("renders an IconButton child component", () => {
      const wrapper = mount(
        <Sidebar
          theme={{
            direction: "ltr"
          }}
          open={false}
          handleDrawerClose={NOOP}
        />
      );

      const result = wrapper.find(IconButton).length;

      expect(result).toEqual(1);
    });
  });

  describe("Snapshot tests", () => {
    it("renders correctly using renderer", () => {
      const tree = renderer
        .create(
          <Sidebar
            theme={{
              direction: "ltr"
            }}
            open={false}
            handleDrawerClose={NOOP}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
