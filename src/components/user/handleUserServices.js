import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ServiceRequestData } from "../../constants/service";
import { useCreateServiceWrapper } from "../../service/serviceWrapper";
import UserService from "../../service/user/UserService";

export const useHandleUserServices = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const serviceCall = useCreateServiceWrapper();
    const handleSearchUsersService = (requestObject, additionalOnSuccess) => {
        let requestData = {
            ...requestObject
        }
        serviceCall(new ServiceRequestData(
            UserService.searchUsers,
            requestData,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }
    const handleCallDeleteUserService = (id, additionalOnSuccess, additionalOnError) => {
        let requestData = {
            userId: id
        }
        serviceCall(new ServiceRequestData(
            UserService.deleteUser,
            requestData,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }
    const handleCallGetUserService = (id, additionalOnSuccess) => {
        let requestData = {
            id: id
        }
        serviceCall(new ServiceRequestData(
            UserService.getUser,
            requestData,
            null,
            null,
            (data) => {
                if(additionalOnSuccess){
                    additionalOnSuccess(data)
                } else {
                    // history.push('/userOverview')
                }
            },
            null
        ))
    }
    const handleCallUpdateUserService = (requestObject, additionalOnSuccess, additionalOnError) => {
        console.log(requestObject);
        let requestData = {
            userId: requestObject.id,
            data: requestObject
        }
        serviceCall(new ServiceRequestData(
            UserService.updateUser,
            requestData,
            null,
            null,
            (data) => {
                if (additionalOnSuccess) {
                    additionalOnSuccess(data)
                }
            },
            null
        ))
    }

    return {
        searchUsersService: handleSearchUsersService,
        deleteUserService: handleCallDeleteUserService,
        getUserService: handleCallGetUserService,
        updateUserService: handleCallUpdateUserService,

    }
}
