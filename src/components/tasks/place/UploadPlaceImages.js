import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { useDispatch, useSelector } from 'react-redux';
import { getFromAppStore } from '../../../util/exportUtil';
import { addToAppStore, removeFromAppStore } from '../../../actions';
import { Translate } from 'react-redux-i18n';
import { Image } from 'primereact/image';
import { applicationStore } from '../../../constants/storeConstants';

export const UploadPlaceImages = () => {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const selectedImages = useSelector((state) => getFromAppStore(state, applicationStore.SELECTED_IMAGES))

    const [totalSize, setTotalSize] = useState(0);

    const [uploadedImages, setUploadedImages] = useState(selectedImages || []);
    const dispatch = useDispatch()

    const customBase64Uploader = async (singleFile) => {
        // convert file to base64 encoded 
        const file = singleFile;
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            let imageObject = {
                name: file.name,
                image: base64data,
                size: parseFloat(parseFloat(file.size / 1000).toFixed(2))
            }
            let selectedImagesArray = uploadedImages
            if (uploadedImages && uploadedImages.length > 0) {
                if (uploadedImages.findIndex(x => x.name === file.name) == -1) {
                    selectedImagesArray.push(imageObject)
                }
            } else {
                selectedImagesArray.push(imageObject)
            }
            setUploadedImages(selectedImagesArray)


        }
    }
    const onTemplateSelect = (e) => {
        if (e.files && e.files.length > 0) {
            for (let i = 0; i < e.files.length; i++) {
                setTotalSize(totalSize + e.files[i].size)

                customBase64Uploader(e.files[i])
            }
        }

    }
    const onTemplateRemove = (element) => {
        setTotalSize(totalSize - element.size);
        if (element.name) {
            let selectedImagesArray = []
            if (selectedImages && selectedImages.length > 0) {
                selectedImagesArray = selectedImages.filter(x => x.name != element.name)
                setUploadedImages(selectedImagesArray)
                dispatch(addToAppStore(applicationStore.SELECTED_IMAGES, selectedImagesArray))

            }
        }
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }


    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = parseFloat(totalSize).toFixed(2) / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {

        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }
    const onTemplateUpload = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });
        dispatch(addToAppStore(applicationStore.SELECTED_IMAGES, uploadedImages))

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
    const uploadedItems = () => {
        let items = []
        if (selectedImages && selectedImages.length > 0) {
            items = selectedImages.map(element => {
                return (
                    <div className="flex align-items-center flex-wrap" key={element.name} style={{ marginTop: '2%', borderBottom: "1px solid #ccc", padding: "2%" }}>
                        <div className="flex align-items-center" style={{ width: '40%' }}>
                            <Image src={element.image} alt={element.name} height={70} width={"auto"} preview />

                            <span className="flex flex-column text-left ml-3">
                                {element.name}
                                <small>{new Date().toLocaleDateString()}</small>
                            </span>
                        </div>
                        <Tag value={element.size + "KB"} severity="warning" className="px-3 py-2" />
                        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(element)} />
                    </div>
                )
            });
        }
        return items
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }




    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <div className='grid'>
                <div className='col-6'>
                    <div className="card">
                        <h5 className="headerItem">
                            <Translate value="label.uploadImages" />
                        </h5>
                        <FileUpload ref={fileUploadRef} name="demo[]" multiple accept="image/*" maxFileSize={5000000}
                            onError={onTemplateClear} onClear={onTemplateClear} onSelect={onTemplateSelect}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate} onUpload={onTemplateUpload} uploadOptions={uploadOptions}
                            chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
                    </div>
                </div>
                <div className='col-6'>
                    <div className="card">
                        <h5 className="headerItem">
                            <Translate value="label.uploadedImages" />
                        </h5>
                        {uploadedItems()}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default UploadPlaceImages