import {Build, GroupAdd, InsertDriveFile} from "@material-ui/icons";
import PaymentIcon from '@material-ui/icons/Payment';


const menuItemTypes = {
    payments: {
        to: "/payments",
        text: "My Payments",
        Icon: PaymentIcon
    },
    professional: {
        to: "/professional",
        text: "Call Professional",
        Icon: Build
    },
    renters: {
        to: "/renters",
        text: "Renters",
        Icon: GroupAdd
    },
    documents: {
        to: "/documents",
        text: "Documents",
        Icon: InsertDriveFile
    },
};

export default menuItemTypes;