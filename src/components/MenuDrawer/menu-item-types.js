import {Build, GroupAdd, InsertDriveFile} from "@material-ui/icons";
import PaymentIcon from '@material-ui/icons/Payment';


const menuItemTypes = {
    payments: {
        to: "/payments",
        text: "תשלומים",
        Icon: PaymentIcon
    },
    professional: {
        to: "/professional",
        text: "הזמנת בעל מקצוע",
        Icon: Build
    },
    renters: {
        to: "/renters",
        text: "מידע שוכרים",
        Icon: GroupAdd
    },
    documents: {
        to: "/documents",
        text: "מסמכים",
        Icon: InsertDriveFile
    },
};

export default menuItemTypes;