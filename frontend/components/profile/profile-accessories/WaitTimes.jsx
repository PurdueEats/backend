import React, { useEffect } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Button } from 'native-base';
import Logo from "../../../resources/logo.png";
import { useTheme } from '@react-navigation/native';
import MaterialTabs from 'react-native-material-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
function WaitTimes({route, navigation}) {
    const { colors } = useTheme();
    //Tab selection
    const [selectedTab, setSelectedTab] = React.useState(0);
    //
    const screenWidth = Dimensions.get("window").width;
    // data
    const data = {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 30],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Estimated WaitTimes"], // optional
    };
    //chart style
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

//     useEffect(() => {
//         getWaitTimes();
//     },[]);
//
// // GET request to get the selected favorite item(s)
//     function getWaitTimes() {
//        fetch(`https://app-5fyldqenma-uc.a.run.app/Users/` + route.params.UserID + '/UserFavMeals', {
//             method: 'GET',
//             headers : {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + route.params.token
//             },
//         })
//         .then(
//             function(response) {
//                 if (response.status === 200 || response.status === 201) {
//                     // Successful GET
//                     // Set fields to correct values
//                     response.json().then(function(data) {
//                         setCurrentSelection(data.map(menuItem => ({ label: menuItem.name, value: menuItem.meal_id })));
//                     });
//                 } else {
//                     console.log('Auth like there was a problem with favorite meals fetching. Status Code: ' +
//                         response.status);
//                 }
//             }
//         )
//         .catch(function(err) {
//             console.log('Fetch Error :-S', err);
//         });
//     }

    return (
        <ScrollView>
            <View style={ [styles.iconPosition, {flexDirection:"row"}] }>
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image source = { Logo } style = { styles.iconSize } />
                <View style={ styles.title }>
                    <Text style={ [styles.screenTitle, {color: colors.text}] }>WaitTimes</Text>
                </View>
            </View>
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Breakfast', 'Lunch', 'Dinner']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor="#ffffff"
                    indicatorColor="#000000"
                    activeTextColor="#000000"
                    inactiveTextColor="#908c8c"
                />
            </View>
            {selectedTab === 0 ? (
            <View>
                <View>
                    <Text style={ [styles.diningTitle, {color: colors.text}] }>Earhart</Text>
                </View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
            </View>
            ) : selectedTab === 1 ? (
            <View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Earhart</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
            </View>
            ): (
            <View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Earhart</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={data}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
            </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    iconPosition: {
        marginLeft: "40%",
        marginTop: "10%",
    },
    iconSize: {
        width: 100,
        height: 100,
    },
    title: {
        padding: "10%",
        marginTop: "30%",
        marginLeft: "-76%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "black",
        marginLeft: "20%",
    },
    button: {
        marginLeft: "-65%",
        marginTop: "10%",
        marginRight: "50%",
    },
    tabBar: {
        marginLeft: "5%",
        marginRight: "5%",
        padding: "2%",
        marginBottom: "2%",
    },
    diningTitle: {
        fontSize: 15,
        fontWeight: "bold",
    }
});

export default WaitTimes