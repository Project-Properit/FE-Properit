import React, {Component} from 'react';
import {Badge, Paper, Tab, Tabs} from "@material-ui/core";
import "./index.css";
import Box from "@material-ui/core/Box";
import PaymentsRequests from "../payments/PaymentsRequests";
import Payments from "../payments/Payments";
import {loadGroupsPayments} from "../../actions/groupsPaymentsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loadPayments} from "../../actions/MyPaymentsActions";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

class UserTabs extends Component {
    constructor() {
        super();
        this.state = {value: 0};
    }
    componentDidMount() {
        const {propId} = this.props.match.params
        this.props.loadPayments(propId, this.props.userId)
        this.props.loadGroupsPayments(propId, this.props.userId);
    }
    handleChange = (event, newValue) => {
        this.setState({value:newValue});
    };
    getUnpayPayments = () => {
        let count = 0;
        console.log(this.props.myPayments)
        this.props.myPayments.map(payment => {
            if(payment.is_periodic){
                if(!payment.is_approved) count=count+1
            }
            else {
                if (payment.my_payment.is_open) count = count + 1
            }
        })
        return count
    }

    render() {
        return (
            <div className="user-dashboard">
                <div className="tab-bar">
                    <Paper class="MuiPaper-root MuiPaper-rounded" elevation={1} style={{backgroundColor: "initial"}}>
                        <Tabs value={this.state.value} onS onChange={this.handleChange} variant="fullWidth"
                              indicatorColor="primary">
                            <Tab label={(<div>{"My Group Payments "}
                                <Badge color="error" badgeContent={this.props.myGroupsPayments.length}>
                                </Badge>
                            </div>)}
                                 {...a11yProps(0)}
                            />
                            <Tab label={(<div>{"My Payments"}
                                <Badge color="error" badgeContent={this.getUnpayPayments()}>
                                </Badge>
                            </div>)}
                                 {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel index={0} value={this.state.value}>
                            <PaymentsRequests myGroupsPayments={this.props.myGroupsPayments}/>
                        </TabPanel>
                        <TabPanel index={1} value={this.state.value}>
                            <Payments myPayments={this.props.myPayments}/>
                        </TabPanel>
                    </Paper>
                </div>
            </div>
        );
    };
}

const mapStateToProps = ({myGroupsPayments, myPaymentsReducer, clientReducer}) => ({
    myGroupsPayments: myGroupsPayments.myGroupsPayments,
    isLoadingGroups: myGroupsPayments.isLoading,
    myPayments: myPaymentsReducer.myPayments,
    isLoading: myPaymentsReducer.isLoading,
    userId: clientReducer.userId,
    error: myGroupsPayments.error,
});

const mapDispatchToProps = dispatch => ({
    loadPayments: (assetId, userId) => dispatch(loadPayments(assetId, userId)),
    loadGroupsPayments: (assetId, userId) => dispatch(loadGroupsPayments(assetId, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(UserTabs));

