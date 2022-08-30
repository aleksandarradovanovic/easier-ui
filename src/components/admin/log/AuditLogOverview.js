import React, { useEffect, useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { ServiceRequestData } from '../../../constants/service';
import AuditLogService from '../../../service/log/AuditLogService';
import { useCreateServiceWrapper } from '../../../service/serviceWrapper';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import AllPlaces from '../../tasks/place/AllPlaces';
import AdminWrapper from '../AdminWrapper';

export const AuditLogOverview = (props) => {
    const [allLogList, setAllLogList] = useState([]);
    const serviceCall = useCreateServiceWrapper();

    let columns = [
        {
            header: "Action Id",
            field: "commandId"
        },
        {
            header: "Action name",
            field: "commandName"
        },
        {
            header: "Username",
            field: "userIdentity"
        },
        {
            header: "Action time",
            field: "commandAt"
        },
    ]
    const getLog = () => {
        serviceCall(new ServiceRequestData(
            AuditLogService.getLog,
            {},
            null,
            null,
            (data) => {
                setAllLogList(data.items)
            },
            null
        ))
    }
    useEffect(() => {
        getLog()
    }, [])
    return (
        <AdminWrapper>
            <div className="card">
                <div className='grid'>
                    <div className='col-12'>
                        <h5>
                            <Translate value="label.auditLog" />
                        </h5>
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
                                    <SimpleTable columns={columns} tableData={allLogList} paginator totalRecords={allLogList.length} count={allLogList.length} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminWrapper>

    )
}
export default AuditLogOverview
