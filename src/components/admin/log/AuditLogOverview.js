import { Fieldset } from 'primereact/fieldset';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-redux-i18n';
import { formFields } from '../../../constants/form';
import { ServiceRequestData } from '../../../constants/service';
import AuditLogService from '../../../service/log/AuditLogService';
import { useCreateServiceWrapper } from '../../../service/serviceWrapper';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import SimpleTable from '../../primeCustomComponents/table/SimpleTable';
import AllPlaces from '../../tasks/place/AllPlaces';
import AdminWrapper from '../AdminWrapper';
import AuditLogFilter from './AuditLogFilter';

export const AuditLogOverview = (props) => {
    const [allLogList, setAllLogList] = useState([]);
    const [auditLogCount, setAuditLogCount] = useState(0);
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
    const getLog = (data, page, size) => {
        let params = {}
        if(data){
            params = data
        }
        if (page) {
            params.page = page
        }
        if (size) {
            params.PerPage = size
        }
        serviceCall(new ServiceRequestData(
            AuditLogService.getLog,
            params,
            null,
            null,
            (data) => {
                setAllLogList(data.items)
                setAuditLogCount(data.totalCount)
            },
            null
        ))
    }
    const paginationFunc = (page, size) => {
        getLog({}, page + 1, size)
    }
    useEffect(() => {
        getLog()
    }, [])
    let initialValues = {
        [formFields.COMMAND_NAME]: "",
        [formFields.COMMAND_AT]: "",
        [formFields.USER_IDENTITY]: "",
    };
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
                                <Fieldset legend="Filter" toggleable collapsed>
                                    <FormWrapper
                                        submitFunction={(data) => getLog(data)}
                                        initialValues={initialValues}>
                                        <AuditLogFilter />
                                    </FormWrapper>
                                </Fieldset>
                            </div>
                            <div class="col-11">
                                <div className='card'>
                                    <SimpleTable columns={columns} tableData={allLogList} paginator totalRecords={auditLogCount} count={auditLogCount} paginationFunc={paginationFunc} />
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
