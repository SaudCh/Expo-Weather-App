import React from 'react';

import SCurrent from './screens/city/current'
import SDetail from './screens/city/detail'

const TabNavigator = createBottomTabNavigator();
const Profile = (props) => (
    <TabNavigator.Navigator>
        <TabNavigator.Screen name='SCurrent' component={SCurrent} initialParams={props.route.params} />
        <TabNavigator.Screen name='SDetail' component={SDetail} initialParams={props.route.params} />
    </TabNavigator.Navigator>
);
