import { DonutLargeRounded, Build, GroupAdd, InsertDriveFile} from "@material-ui/icons";

const menuItemTypes = {
    payments: {
        to: "/documents",
        text: "תשלומים",
        Icon: DonutLargeRounded
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