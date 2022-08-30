import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import AdminWrapper from './AdminWrapper';

export const AdminOverview = (props) => {
    const history = useHistory();

    return (
        <AdminWrapper>
            <div className='card text-center'>
                <div className='grid'>
                    <div className="col-12 md:col-4 mb-4 px-5" onClick={() => history.push('/allPlacesAdminOverview')} style={{ cursor: 'pointer' }}>
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-building text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 mb-3 font-medium">Places</div>
                        <span className="text-700 text-sm line-height-3">Overview of all places</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5" onClick={() => history.push('/allEventsAdminOverview')} style={{ cursor: 'pointer' }}>
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-calendar text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 mb-3 font-medium">Event</div>
                        <span className="text-700 text-sm line-height-3">Overview of all events</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5" onClick={(e) => {
                        history.push('/allUsersAdminOverview')
                    }} style={{ cursor: 'pointer' }}>
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-user text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 mb-3 font-medium">Users</div>
                        <span className="text-700 text-sm line-height-3">Overview of all users</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-qrcode text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 mb-3 font-medium">Reservations</div>
                        <span className="text-700 text-sm line-height-3">Overview of all reservations</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5" onClick={(e) => {
                        history.push('/auditLogOverview')
                    }} style={{ cursor: 'pointer' }}>
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-history text-4xl text-blue-500"></i>
                        </span>
                        <div className="text-900 mb-3 font-medium">Audit log</div>
                        <span className="text-700 text-sm line-height-3">Overview of all actions in application</span>
                    </div>

                </div>
            </div>
        </AdminWrapper>

    )
}
export default AdminOverview
