import React from "react";
import { Badge, Paper, Tab, Tabs } from "@material-ui/core";
import "./index.css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PaymentsRequests from "../payments/PaymentsRequests";
import Payments from "../payments/Payments";

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

const UserTabs = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div className="user-dashboard">
			<div className="tab-bar">
				<Paper elevation={1}>
					<Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary">
						<Tab label={
							(<div>{"קבוצות התשלום שיצרתי"

							}
								<Badge
									color="error"
									badgeContent={3}

								>
								</Badge>
							</div>)}

						     {...a11yProps(0)}
						/>
						<Tab label={
							(<div>{"התשלומים שלי"}
								<Badge
									color="error"
									// badgeContent={myPaymentsTodoCount}
									badgeContent={3}

								>
								</Badge>
							</div>)}  {...a11yProps(1)} />
					</Tabs>

					<TabPanel index={0} value={value}>
						<PaymentsRequests/>
					</TabPanel>
					<TabPanel index={1} value={value}>
						<Payments/>
					</TabPanel>
				</Paper>
			</div>

		</div>
	);
};

export default UserTabs;
