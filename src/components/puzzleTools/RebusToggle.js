import React from "react";
import { Menu } from "semantic-ui-react";

const RebusToggle = ({ rebus, onRebusClick }) => (
  <Menu.Item name="rebus" active={rebus} onClick={onRebusClick}>
    Rebus
  </Menu.Item>
);

export default RebusToggle
