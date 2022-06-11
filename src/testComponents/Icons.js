import { PrimeIcons } from 'primereact/api';
import { Menu } from 'primereact/menu';

const MenuDemo = () => {

    const items = [
        {
            label: 'File',
            items: [
                {label: 'New', icon: PrimeIcons.PLUS},
                {label: 'Open', icon: PrimeIcons.DOWNLOAD}
            ]
        },
        {
            label: 'Edit',
            items: [
                {label: 'Undo', icon: PrimeIcons.REFRESH},
                {label: 'Redo', icon: PrimeIcons.REPEAT}
            ]
        }
    ];

    return <Menu model={items} />
}

export default MenuDemo;