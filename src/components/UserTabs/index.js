import React, { useState, useCallback, useEffect, useMemo } from "react";
import {Tabs, Tab, Paper, Badge} from "@material-ui/core";
import settingsByUserType from "./settings-by-user-type";
import "./index.css";




const UserTabs = () => {
    // const { loggedInUser, users, paymentGroups, setPaymentGroups, myPayments, setMyPayments, wrapWithLoading } = useGlobalState();
    // const settings = settingsByUserType[loggedInUser.type];
    const [mode, setMode] = useState("paymentGroups");

    const onTabChange = useCallback((_, newMode) => setMode(newMode), []);


    // const missionsPerStatus = useMemo(
    //     () => missionsPerFlowStatus(paymentGroups),
    //     [paymentGroups]
    // );
    //
    // const tasksPerStatus = useMemo(
    //     () => tasksPerFlowStatus(myPayments),
    //     [myPayments]
    // );

    // const paymentGroupsTodoCount = useMemo(
    //     () => sumCountForGivenStatuses(missionsPerStatus,
    //         statusesToConsiderInPaymentGroupsTabBadge[loggedInUser.type] || []),
    //     [paymentGroups, loggedInUser.type]
    // );

    // const myPaymentsTodoCount = useMemo(
    //     () => sumCountForGivenStatuses(tasksPerStatus,
    //         statusesToConsiderInmyPaymentsTabBadge[loggedInUser.type] || []),
    //     [myPayments, loggedInUser.type]
    // );


    return (
        <div className="user-dashboard">
            <div className="tab-bar">
                <Paper elevation={1}>
                    <Tabs value={mode} onChange={onTabChange} variant="fullWidth" indicatorColor="primary">
                        <Tab label={
                            (<div>{ "קבוצות התשלום שיצרתי"

                            }
                            <Badge
                                color="error"
                                // badgeContent={paymentGroupsTodoCount}
                                badgeContent={3}

                            >
                            </Badge>
                            </div>)} value="התשלומים שלי" />
                        <Tab label={
                            (<div>{"התשלומים שלי"}
                            <Badge
                                color="error"
                                // badgeContent={myPaymentsTodoCount}
                                badgeContent={3}

                            >
                            </Badge>
                            </div>)} value="myPayments" />
                    </Tabs>
                </Paper>
            </div>

        </div>
    );
};

export default UserTabs;
