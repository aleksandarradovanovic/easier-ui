import React from 'react'
import { Route, Router, Switch } from 'react-router'
import App from './App.js'
import AdminOverview from './components/admin/AdminOverview.js'
import AllEventsAdminOverview from './components/admin/event/AllEventsAdminOverview.js'
import AuditLogOverview from './components/admin/log/AuditLogOverview.js'
import AllPlacesAdminOverview from './components/admin/place/AllPlacesAdminOverview.js'
import AllUsersAdminOverview from './components/admin/users/AllUsersAdminOverview.js'
import CreateUser from './components/admin/users/CreateUser.js'
import SuccessPlaceCreated from './components/common/SuccessPlaceCreated.js'
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
import MyPlaceStaffEdit from './components/tasks/place/myPlace/MyPlaceStaffEdit.js'
import MyPlaces from './components/tasks/place/MyPlaces.js'
import AllReservations from './components/tasks/reservation/AllReservations.js'
import CreateReservationTask from './components/tasks/reservation/CreateReservationTask.js'
import MyReservations from './components/tasks/reservation/MyReservations.js'
import ReservationPreview from './components/tasks/reservation/ReservationPreview.js'
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
        <Route path={'/myPlaceStaffEdit'} component={MyPlaceStaffEdit} />
        <Route path={'/myPlaceEvents'} component={MyPlaceEvents} />
        <Route path={'/createPlaceEvent'} component={CreateMyPlaceEvent} />
        <Route path={'/createEvent'} component={CreateEventTask} />
        <Route path={'/eventOverview'} component={EventOverview} />
        <Route path={'/myEventBasicInformationEdit'} component={EventInformationEdit} />
        <Route path={'/eventImagesEdit'} component={EventImagesEdit} />
        <Route path={'/myEventReservations'} component={AllReservations} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={RegisterUser} />
        <Route path={'/successRegister'} component={SuccessRegisterPanel} />
        <Route path={'/successCreatedPlace'} component={SuccessPlaceCreated} />
        <Route path={'/explore'} component={ExploreEvent} />
        <Route path={'/reservation'} component={CreateReservationTask} />
        <Route path={'/myReservations'} component={MyReservations} />
        <Route path={'/reservationPreview'} component={ReservationPreview} />

        <Route path={'/adminOverview'} component={AdminOverview} />
        <Route path={'/allPlacesAdminOverview'} component={AllPlacesAdminOverview} />
        <Route path={'/allEventsAdminOverview'} component={AllEventsAdminOverview} />
        <Route path={'/allUsersAdminOverview'} component={AllUsersAdminOverview} />
        <Route path={'/adminCreateUser'} component={CreateUser} />
        <Route path={'/auditLogOverview'} component={AuditLogOverview} />
      </App>
    </Switch>
  </Router>

// export
export { router }
