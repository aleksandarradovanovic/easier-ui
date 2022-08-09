import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { adminActor, placeActor, publicActor } from "../../constants/serverConstants";
import {  globalStore } from "../../constants/storeConstants";
import { getCookie } from "../../service/restHandler";
import { getFromAppStore, getFromGlobalStore } from "../../util/exportUtil";

export const useMenubarSettings = () => {
    const userActor = useSelector((state) => getFromGlobalStore(state, globalStore.USER_ACTOR))
    const userRoles = useSelector((state) => getFromGlobalStore(state, globalStore.USER_ROLES))

    const history = useHistory();
    let jwt = getCookie("jwt");
    let menuItems = []
    let endMenuItems
    if (!jwt) {
        menuItems = [
            {
                label: "Explore",
                icon: "pi pi-fw pi-search",
                command: () => {
                    history.push('/explore')
                }
            }
        ]
        endMenuItems = <div className="grid">
            <div className="col-6">
                <Button icon="pi pi-sign-in" label="Login" className="p-button-outlined" onClick={() => {
                    history.push('/login')
                }}></Button>

            </div>
            <div className="col-6">
                <Button icon="pi pi-user-plus" label="Register" className="p-button-outlined" onClick={() => {
                    history.push('/register')
                }}></Button>

            </div>
        </div>
    } else {
        if (userActor) {
            switch (userActor) {
                case placeActor:
                    menuItems = [
                        {
                            label: "Place",
                            icon: "pi pi-fw pi-map-marker",
                            items: [
                                {
                                    label: "Create new place",
                                    icon: "pi pi-fw pi-plus",
                                    command: () => {
                                        history.push('/createPlace')
                                    },
                                },
                                {
                                    label: "My places",
                                    icon: "pi pi-fw pi-eye",
                                    command: () => {
                                        history.push('/myPlaces')
                                    },
                                }
                            ],

                        },
                    ]
                    break;
                case publicActor:
                    menuItems = [
                        {
                            label: "Explore",
                            icon: "pi pi-fw pi-search",
                            command: () => {
                                history.push('/explore')
                            }
                        },
                        {
                            label: "My reservations",
                            icon: "pi pi-fw pi-ticket",
                            command: () => {
                                history.push('/myReservations')
                            }
                        }
                    ]
                    break;
                case adminActor:
                    menuItems = [
                        {
                            label: "Admin panel",
                            icon: "pi pi-fw pi-cog",
                            command: () => {
                                history.push('/adminOverview')
                            }
                        }
                    ]
                    break;
                default: []
            }
        }

        endMenuItems = <div className="col-6">
            <Button icon="pi pi-sign-out" label="Logout" className="p-button-outlined" onClick={() => {
                document.cookie = "jwt="
                window.location = "/"
            }}></Button>

        </div>
    }


    return {
        menuItems: menuItems,
        endMenuItems: endMenuItems
    }
}
