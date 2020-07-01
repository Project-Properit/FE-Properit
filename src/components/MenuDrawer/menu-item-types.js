import {Build, GroupAdd, InsertDriveFile} from "@material-ui/icons";
import PaymentIcon from '@material-ui/icons/Payment';

const menuItemTypes = {
    payments: {
        to: "/documents",
        text: "תשלומים",
        Icon: PaymentIcon
    },
    professional: {
        to: "/documents",
        text: "הזמנת בעל מקצוע",
        Icon: Build
    },
    renters: {
        to: "/documents",
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