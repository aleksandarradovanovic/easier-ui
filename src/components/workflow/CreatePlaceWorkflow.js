import React, { useEffect } from 'react';
import NavigationComponent from '../primeCustomComponents/navigation/NavigationComponent';
import PlaceInformation from '../tasks/place/PlaceInformation';
import PlaceLocationPicker from '../tasks/place/PlaceLocationPicker';
import SeatTable from '../tasks/place/SeatTable';
import Summary from '../tasks/place/Summary';
import UploadPlaceImages from '../tasks/place/UploadPlaceImages';
import { useHandleCallPlaceService } from '../tasks/place/myPlace/handlePlaceServices';
import { useDispatch } from 'react-redux';
import { clearAppStore } from '../../actions';
export const CreatePlaceWorkflow = (props) => {
    const handleGetPlaceService = useHandleCallPlaceService()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearAppStore())
    }, [])
    let items = [
        {
            label: "Basic informations",
            icon: "pi pi-fw pi-prime",
            component: <PlaceInformation />
        },
        {
            label: "Location",
            icon: "pi pi-fw pi-prime",
            component: <PlaceLocationPicker />
        },
        {
            label: "Images",
            icon: "pi pi-fw pi-prime",
            component: <UploadPlaceImages />
        },
        {
            label: "Seat/table",
            icon: "pi pi-fw pi-prime",
            component: <SeatTable />
        },
        {
            label: "Summary",
            icon: "pi pi-fw pi-prime",
            component: <Summary />
        }
    ]
    const onSavePlace = () => {

        handleGetPlaceService.handleCreatePlacesService()
    }
    return (
        <div class="grid">
            <div class="col-8 col-offset-2">
                <NavigationComponent items={items} onSave={() => onSavePlace()} />
            </div>
        </div>
    )
}
export default CreatePlaceWorkflow
