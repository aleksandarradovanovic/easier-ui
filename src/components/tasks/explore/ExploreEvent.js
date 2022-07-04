import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useHandleCallEventService } from '../event/handleEventServices';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import moment from 'moment'
import { Fieldset } from 'primereact/fieldset';
import { fieldType, formFields } from '../../../constants/form';
import FormWrapper from '../../primeCustomComponents/form/FormWrapper';
import FormElement from '../../primeCustomComponents/form/FormElement';
import ExploreFilterForm from './ExploreFilterForm';
import { useHistory } from 'react-router';
import { Tooltip } from 'primereact/tooltip';
import { getCookie } from '../../../service/restHandler';

export const ExploreEvent = (props) => {
    // const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_EVENT_IMAGES))
    const handleCallEventService = useHandleCallEventService()
    const [products, setProducts] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const rows = useRef(10);
    const datasource = useRef(null);
    const isMounted = useRef(false);
    const history = useHistory()
    const dispatch = useDispatch();

    const getEventData = (pageProp, pageSizeProp, filterData) => {
        let page = pageProp || 1
        let pageSize = pageSizeProp || 10
        let requestObject = {
            ...filterData,
            page: page,
            pageSize: pageSize
        }
        handleCallEventService.handleSearchEventService(requestObject,
            (data) => {
                if (data && data.items) {
                    setTimeout(() => {
                        isMounted.current = true;
                        datasource.current = data;
                        setTotalRecords(data.totalCount);
                        setProducts(data.items);
                        setLoading(false);
                    }, 1000);
                }
            }
        )
    }
    useEffect(() => {
        getEventData()
    }, [])
    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }
    const filterEvents = (data) => {
        setLoading(true);
        getEventData(1, 10, data)
    }
    const renderHeader = () => {
        let onOptionChange = (e) => {
            setLayout(e.value);
        };
        let initialValues = {
            [formFields.EVENT_NAME]: "",
            [formFields.EVENT_TYPE]: "",
            [formFields.EVENT_TIME_FROM]: "",
            [formFields.EVENT_TIME_TO]: "",
        };
        return (
            <div style={{ textAlign: 'left' }}>
                <div className='grid'>
                    <div className='col-2'>
                        <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />

                    </div>
                    <div className='col-8'>
                        <Fieldset legend="Filter" toggleable collapsed>
                            <FormWrapper
                                submitFunction={(data) => filterEvents(data)}
                                initialValues={initialValues}>
                                <ExploreFilterForm />
                            </FormWrapper>
                        </Fieldset>
                    </div>
                </div>

            </div>
        );
    }
    const onPage = (event) => {
        console.log(event, 'event');
        getEventData(event.page + 1)
        setLoading(true);
    }
    const getEventDataForReservation = (id) => {
        handleCallEventService.handleGetEventService(id, () => {
            history.push('/reservation')

        })
    }
    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={data.image ? data.image : process.env.PUBLIC_URL + "/eventPlaceholder2.jpg"} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.type}</span>
                        <br />
                        <i className="pi pi-map-marker product-category-icon"></i><span className="product-category">{data.placeName}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="">
                            <i className="pi pi-calendar product-category-icon"></i>
                            {moment(data.startTime).format('DD/MM/YYYY, h:mm') + " - " + moment(data.endTime).format('DD/MM/YYYY, h:mm')} </span>
                        <Button icon="pi pi-calendar-plus" className='p-button-outlined' label="Reserve" disabled={!getCookie("jwt")} tooltip={!getCookie("jwt") ? "Login to reserve" : 'Reserve'} onClick={() => getEventDataForReservation(data.id)} ></Button>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.type}</span>
                        </div>
                        <div>
                            <i className="pi pi-map-marker product-category-icon"></i>
                            <span className={`product-badge status`}>{data.placeName}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img src={data.image ? data.image : process.env.PUBLIC_URL + "/eventPlaceholder2.jpg"} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="">
                            <i className="pi pi-calendar product-category-icon"></i>
                            {moment(data.startTime).format('DD/MM/YYYY, h:mm') + " - " + moment(data.endTime).format('DD/MM/YYYY, h:mm')} </span>
                        <Button icon="pi pi-calendar-plus" className='p-button-outlined' label="Reserve" disabled={!getCookie("jwt")} tooltip={!getCookie("jwt") ? "Login to reserve" : 'Reserve'} onClick={() => getEventDataForReservation(data.id)} ></Button>
                    </div>
                </div>
            </div>
        );
    }
    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                    itemTemplate={itemTemplate} lazy paginator paginatorPosition={'both'} rows={rows.current}
                    totalRecords={totalRecords} first={first} onPage={onPage} loading={loading} />
            </div>
        </div>
    )
}
export default ExploreEvent
