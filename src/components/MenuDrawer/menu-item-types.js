import {Build, GroupAdd, InsertDriveFile} from "@material-ui/icons";
import PaymentIcon from '@material-ui/icons/Payment';


const menuItemTypes = {
    payments: {
        to: "/payments",
        text: "Payments",
        Icon: PaymentIcon
    },
    professional: {
        to: "/professional",
        text: "Call Professional",
        Icon: Build
    },
    renters: {
        to: "/renters",
        text: "My Renters",
        Icon: GroupAdd
    },
    documents: {
        to: "/documents",
        text: "My Documents",
        Icon: InsertDriveFile
    },
};

export default menuItemTypes;