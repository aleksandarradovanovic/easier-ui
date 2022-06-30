import React from "react";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
// import logo from "../Images/MB_logo.svg";
import PropTypes from 'prop-types'
import { useHistory } from "react-router";
import { I18n } from "react-redux-i18n";
import { Button } from "primereact/button";
import { getCookie } from "../service/restHandler";

const MenubarDemo = () => {
  const history = useHistory();

  const items = [
    {
      label: "Explore",
      icon: "pi pi-fw pi-search",
      command: () => {
        history.push('/explore')
      },
    },
    {
      label: "Place",
      icon: "pi pi-fw pi-map-marker",
      items: [
        {
          label: "Create new place",
          icon: "pi pi-fw pi-plus",
          command: () => {
            history.push('/createPlace')
          },
        },
        {
          label: "My places",
          icon: "pi pi-fw pi-eye",
          command: () => {
            history.push('/myPlaces')
          },
        }
      ],

    },
    {
      label: I18n.t('label.events'),
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: I18n.t('label.createEvent'),
          icon: 'pi pi-plus',
          command: (e) => {
            history.push('/createEvent')
          }
        },
      ]
    }

  ];


  const start = (
    <a href="/">
      <img src={process.env.PUBLIC_URL + "/logo.png"} width={50} />
    </a>
  );
  const end = <div>
    {!getCookie("jwt") ?
      <div className="grid">
        <div className="col-6">
          <Button icon="pi pi-sign-in" label="Login" className="p-button-outlined" onClick={() => {
            history.push('/login')
          }}></Button>

        </div>
        <div className="col-6">
          <Button icon="pi pi-user-plus" label="Register" className="p-button-outlined"></Button>

        </div>
      </div>
      : <div className="col-6">
        <Button icon="pi pi-sign-out" label="Logout" className="p-button-outlined" onClick={() => {
            document.cookie = "jwt="
            window.location = "/"
          }}></Button>

      </div>
    }


  </div>;

  return (
    <div>
        <Menubar model={items} start={start} end={end} />
    </div>
  );
}
MenubarDemo.propTypes = {
  changeComponent: PropTypes.func
}
export default MenubarDemo