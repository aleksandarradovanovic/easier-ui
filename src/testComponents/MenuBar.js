import React from "react";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
// import logo from "../Images/MB_logo.svg";
import PropTypes from 'prop-types'
import { useHistory } from "react-router";
import { I18n } from "react-redux-i18n";

const MenubarDemo = () => {
  const history = useHistory();

  const items = [
    {
      label: "Components",
      icon: "pi pi-fw pi-prime",
      items: [
        {
          label: "Login",
          command: () => {
            history.push('/login')
          },
          icon: "pi pi-fw pi-table",
        },
        {
          label: "Accordion",
          command: () => {
            history.push('/accordionComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Table",
          command: () => {
            history.push('/tableComponent')

          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Messages",
          command: () => {
            history.push('/messagesComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Badge",
          command: () => {
            history.push('/badgeComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Button",
          command: () => {
            history.push('/buttonComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Card",
          command: () => {
            history.push('/cardComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "ListBox",
          command: () => {
            history.push('/listComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "TreeTable",
          command: () => {
            history.push('/treeComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Dialog",
          command: () => {
            history.push('/dialogComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "PanelMenu",
          command: () => {
            history.push('/panelMenuComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "DataTable",
          command: () => {
            history.push('/tableComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "TabView",
          command: () => {
            history.push('/tabViewComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "Tooltip",
          command: () => {
            history.push('/tooltipComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "FileUpload",
          command: () => {
            history.push('/uploadComponent')
          },
          icon: "pi pi-fw pi-minus",
        },

        {
          label: "CustomStepper",
          command: () => {
            history.push('/customStepComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
        {
          label: "PrimeSteps",
          command: () => {
            history.push('/stepsComponent')
          },
          icon: "pi pi-fw pi-minus",
        },
      ],
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
  const end = <InputText placeholder="Search" type="text" />;

  return (
    <div>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
    </div>
  );
}
MenubarDemo.propTypes = {
  changeComponent: PropTypes.func
}
export default MenubarDemo