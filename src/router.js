import React from 'react'
import { Route, Router, Switch } from 'react-router'
import App from './App.js'
import SuccessRegisterPanel from './components/common/SuccessRegisterPanel.js'
import Login from './components/login/Login.js'
import CreateEventTask from './components/tasks/event/CreateEventTask.js'
import EventImagesEdit from './components/tasks/event/EventImagesEdit.js'
import EventInformationEdit from './components/tasks/event/EventInformationEdit.js'
import EventOverview from './components/tasks/event/EventOverview.js'
import ExploreEvent from './components/tasks/explore/ExploreEvent.js'
import HomePage from './components/tasks/home/HomePage.js'
import CreateMyPlaceEvent from './components/tasks/place/myPlace/CreateMyPlaceEvent.js'
import MyPlaceBasicInformationEdit from './components/tasks/place/myPlace/MyPlaceBasicInformationEdit.js'
import MyPlaceEvents from './components/tasks/place/myPlace/MyPlaceEvents.js'
import MyPlaceImages from './components/tasks/place/myPlace/MyPlaceImages.js'
import MyPlaceImagesEdit from './components/tasks/place/myPlace/MyPlaceImagesEdit.js'
import MyPlaceLocationEdit from './components/tasks/place/myPlace/MyPlaceLocationEdit.js'
import MyPlaceOverview from './components/tasks/place/myPlace/MyPlaceOverview.js'
import MyPlaceSeatTables from './components/tasks/place/myPlace/MyPlaceSeatTables.js'
import MyPlaceSeatTablesEdit from './components/tasks/place/myPlace/MyPlaceSeatTablesEdit.js'
import MyPlaceStaff from './components/tasks/place/myPlace/MyPlaceStaff.js'
import MyPlaces from './components/tasks/place/MyPlaces.js'
import CreateReservationTask from './components/tasks/reservation/CreateReservationTask.js'
import RegisterUser from './components/user/RegisterUser.js'
import CreatePlaceWorkflow from './components/workflow/CreatePlaceWorkflow.js'
import { history } from './store.js'
import AccordionDemo from './testComponents/Accordion.js'
import BadgeDemo from './testComponents/Badge.js'
import ButtonDemo from './testComponents/Button.js'
import CardDemo from './testComponents/Card.js'
import DataTableDemo from './testComponents/DataTable.js'
import DialogDemo from './testComponents/Dialog.js'
import { FileUploadDemo } from './testComponents/FileUpload.js'
import ListBoxDemo from './testComponents/Listbox.js'
import TreeTableDemo from './testComponents/ListTree.js'
import MessagesDemo from './testComponents/Messages.js'
import PanelMenuDemo from './testComponents/PanelMenu.js'
import StepsDemo from './testComponents/Steps.js'
import Table1 from './testComponents/Table1.js'
import { TabViewDemo } from './testComponents/TabView.js'
import TooltipDemo from './testComponents/Tooltip.js'
const router =
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Switch>
      <App>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/accordionComponent'} component={AccordionDemo} />
        <Route path={'/tableComponent'} component={Table1} />
        <Route path={'/messagesComponent'} component={MessagesDemo} />
        <Route path={'/badgeComponent'} component={BadgeDemo} />
        <Route path={'/buttonComponent'} component={ButtonDemo} />
        <Route path={'/cardComponent'} component={CardDemo} />
        <Route path={'/listComponent'} component={ListBoxDemo} />
        <Route path={'/treeComponent'} component={TreeTableDemo} />
        <Route path={'/dialogComponent'} component={DialogDemo} />
        <Route path={'/panelMenuComponent'} component={PanelMenuDemo} />
        <Route path={'/tableComponent'} component={DataTableDemo} />
        <Route path={'/tabViewComponent'} component={TabViewDemo} />
        <Route path={'/tooltipComponent'} component={TooltipDemo} />
        <Route path={'/uploadComponent'} component={FileUploadDemo} />
        <Route path={'/stepsComponent'} component={StepsDemo} />
        <Route path={'/createPlace'} component={CreatePlaceWorkflow} />
        <Route path={'/myPlaces'} component={MyPlaces} />
        <Route path={'/myPlace'} component={MyPlaceOverview} />
        <Route path={'/myPlaceImages'} component={MyPlaceImages} />
        <Route path={'/myPlaceImagesEdit'} component={MyPlaceImagesEdit} />
        <Route path={'/myPlaceSeatTables'} component={MyPlaceSeatTables} />
        <Route path={'/myPlaceSeatTablesEdit'} component={MyPlaceSeatTablesEdit} />
        <Route path={'/myPlaceBasicInformationEdit'} component={MyPlaceBasicInformationEdit} />
        <Route path={'/myPlaceLocationEdit'} component={MyPlaceLocationEdit} />
        <Route path={'/myPlaceStaff'} component={MyPlaceStaff} />
        <Route path={'/myPlaceEvents'} component={MyPlaceEvents} />
        <Route path={'/createPlaceEvent'} component={CreateMyPlaceEvent} />
        <Route path={'/createEvent'} component={CreateEventTask} />
        <Route path={'/eventOverview'} component={EventOverview} />
        <Route path={'/myEventBasicInformationEdit'} component={EventInformationEdit} />
        <Route path={'/eventImagesEdit'} component={EventImagesEdit} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={RegisterUser} />
        <Route path={'/successRegister'} component={SuccessRegisterPanel} />
        <Route path={'/explore'} component={ExploreEvent} />
        <Route path={'/reservation'} component={CreateReservationTask} />
      </App>
    </Switch>
  </Router>

// export
export { router }
