import React from "react";
import { Menubar } from "primereact/menubar";
import PropTypes from 'prop-types'
import { useHistory } from "react-router";
import { useMenubarSettings } from "./menubarSettings";

const MenuBar = () => {
  const history = useHistory();

  const menubarSettings = useMenubarSettings()


  const start = (
    <a href="/">
      <img src={process.env.PUBLIC_URL + "/logo.png"} width={50} />
    </a>
  );

  return (
        <Menubar model={menubarSettings.menuItems} start={start} end={menubarSettings.endMenuItems} />
  );
}
MenuBar.propTypes = {
  changeComponent: PropTypes.func
}
export default MenuBar