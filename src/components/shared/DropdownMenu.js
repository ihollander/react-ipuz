import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = ({ options, text, onDropdownChange }) => {
  const renderItems = () => {
    return options.map(option => (
      <Dropdown.Item
        key={option[0]}
        onClick={() => {
          onDropdownChange(option[0]);
        }}
      >
        {option[1]}
      </Dropdown.Item>
    ));
  };

  return (
    <Dropdown item text={text}>
      <Dropdown.Menu>{renderItems()}</Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
