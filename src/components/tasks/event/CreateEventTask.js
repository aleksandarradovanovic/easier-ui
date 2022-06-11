import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToAppStore, clearAppStore } from '../../../actions';
import { applicationStore } from '../../../constants/storeConstants';
import CreateEventWorkflow from '../../workflow/CreateEventWorkflow';
import { useHandleCallPlaceService } from '../place/myPlace/handlePlaceServices';

export const CreateEventTask = () => {
    const handleCallPlaceService = useHandleCallPlaceService()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearAppStore())
        handleCallPlaceService.handleGetMyPlacesService(
            (data) => {
                if (data && data.items) {
                    let myPlacesOptions = []
                    if (data.items.length > 0) {
                        myPlacesOptions = data.items.map(function (x) {
                            return {
                                label: x.name, value: x.id
                            }
                        })
                        dispatch(addToAppStore(applicationStore.EVENT_PLACE_NAME_OPTIONS, myPlacesOptions));
                    }

                }

            }
        )
    }, [])
    return (
        <div class="grid">
            <div class="col-8 col-offset-2">
                <CreateEventWorkflow />
            </div>
        </div>
    )
}
export default CreateEventTask
