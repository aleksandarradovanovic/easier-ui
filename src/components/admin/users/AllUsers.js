import React, { Fragment, useEffect, useRef, useState } from 'react';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import { useHistory } from "react-router";
import { formFields } from '../../../constants/form';
import { useHandleUserServices } from '../../user/handleUserServices';
import { Dialog } from 'primereact/dialog';
import EditUserModal from './EditUserModal';
import { Toast } from 'primereact/toast';
export const AllUsers = (props) => {

    const [allUsersList, setAllUsersList] = useState([]);
    const [displayUserDetailsModal, setDisplayUserDetailsModal] = useState(false);
    const [displayEditUserModal, setDisplayEditUserModal] = useState(false);
    const [currentUserData, setCurrentUserData] = useState();
    const history = useHistory();
    const handleUserServices = useHandleUserServices()
    let toast = useRef()
    const getUsers = () => {
        let requestObject = {
        }
        handleUserServices.searchUsersService(requestObject,
            (data) => {
                if (data && data.items) {
                    setAllUsersList(data.items)
                }
            }
        )
    }
    const getUser = (id, onSuccess) => {
        handleUserServices.getUserService(id, (data) => {
            if (onSuccess) {
                onSuccess(data)
            }
        })

    }
    const onView = (row, col) => {
        setDisplayEditUserModal(false)
        getUser(row.id, (data) => {
            setDisplayUserDetailsModal(true)
            setCurrentUserData(data)

        })
    }
    const onEdit = (row, col) => {
        getUser(row.id, (data) => {
            setDisplayEditUserModal(true)
            setCurrentUserData(data)

        })
    }
    const deleteUser = (id) => {
        handleUserServices.deleteUserService(id,
            () => {
                getUsers()
            }
        )
    }
    const onDelete = (row, col) => {
        deleteUser(row.id)
    }

    useEffect(() => {
        getUsers()
    }, [])
    let columns = [
        {
            header: "First name",
            field: "firstName",
        },
        {
            header: "Last name",
            field: "lastName",
        },
        {
            header: "Username",
            field: "userName"
        },
        {
            header: "Email",
            field: "email"
        },
        {
            header: "Position",
            field: "position"
        }
    ]
    const additionalOnEdit = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'UserUpdated' });
        getUsers()
        setDisplayEditUserModal(false)

    }
    return (
        <Fragment>
            <Toast ref={toast}></Toast>

            <EditUserModal displayModal={displayEditUserModal} userData={currentUserData} additionalOnEdit={additionalOnEdit} />
            <Dialog header="User details" visible={displayUserDetailsModal} style={{ width: '50vw' }} modal onHide={() => {
                setDisplayUserDetailsModal(false)
            }}>
                {currentUserData &&
                    <div className="surface-0">
                        <ul className="list-none p-0 m-0">
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">First name</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.firstName}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Last name</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.lastName}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Date of birth</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.dateOfBirth}</div>
                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">User name</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.userName}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Email</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.email}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Position</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.position}</div>

                            </li>
                            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                <div className="text-500 w-6 md:w-2 font-medium">Role</div>
                                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{currentUserData.actorName}</div>

                            </li>
                        </ul>
                    </div>
                }

            </Dialog>
            <div className='grid'>
                <div className='col-11'>
                    {/* <Fieldset legend="Filter" toggleable collapsed>
                        <FormWrapper
                            submitFunction={(data) => getPlaces(data)}
                            initialValues={initialValues}>
                            <PlaceFilter />
                        </FormWrapper>
                    </Fieldset> */}
                </div>
                <div class="col-11">
                    <div className='card'>
                        <SimpleTable columns={columns} tableData={allUsersList} onEdit={onEdit} onView={onView} onDelete={onDelete} paginator totalRecords={allUsersList.length} count={allUsersList.length} />
                    </div>
                </div>
            </div>

        </Fragment>

    )
}
export default AllUsers
