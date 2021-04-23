import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Logo from "../../../resources/logo.png";
import { useTheme } from '@react-navigation/native';
import MaterialTabs from 'react-native-material-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import earhart from "./OutputEarhart.json";
import ford from "./OutputFord.json";
import hillenbrand from "./OutputHillenbrand.json";
import wiley from "./OutputWiley.json";
import windsor from "./OutputWindsor.json";

function WaitTimes({navigation}) {
   const { colors } = useTheme();
    //Tab selection
    const [selectedTab, setSelectedTab] = React.useState(0);
    const screenWidth = Dimensions.get("window").width;
    // Breakfast data Earhart
    const dataBreakfastEarhart = {
      labels: ["7:00 am", "8:00 am", "9:00 am", "10:00 am"],
      datasets: [
        {
          data: [earhart[0].LineLength, earhart[1].LineLength, earhart[2].LineLength, earhart[3].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Lunch data Earhart
    const dataLunchEarhart = {
      labels: ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"],
      datasets: [
        {
          data: [earhart[4].LineLength, earhart[5].LineLength, earhart[6].LineLength, earhart[7].LineLength, 0],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Dinner data Earhart
    const dataDinnerEarhart = {
      labels: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"],
      datasets: [
        {
          data: [earhart[8].LineLength, earhart[9].LineLength, earhart[10].LineLength, earhart[23].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Breakfast data Ford
    const dataBreakfastFord = {
      labels: ["7:00 am", "8:00 am", "9:00 am", "10:00 am"],
      datasets: [
        {
          data: [ford[0].LineLength, ford[1].LineLength, ford[2].LineLength, ford[3].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Lunch data Ford
    const dataLunchFord = {
      labels: ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"],
      datasets: [
        {
          data: [ford[4].LineLength, ford[5].LineLength, ford[6].LineLength, ford[7].LineLength, ford[8].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Dinner data Ford
    const dataDinnerFord = {
      labels: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"],
      datasets: [
        {
          data: [ford[9].LineLength, ford[10].LineLength, ford[11].LineLength, ford[12].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Breakfast data Hillenbrand
    const dataBreakfastHillenbrand = {
      labels: ["7:00 am", "8:00 am", "9:00 am", "10:00 am"],
      datasets: [
        {
          data: [0, 0, hillenbrand[0].LineLength, hillenbrand[1].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Lunch data Hillenbrand
    const dataLunchHillenbrand = {
      labels: ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"],
      datasets: [
        {
          data: [hillenbrand[2].LineLength, hillenbrand[3].LineLength, hillenbrand[4].LineLength, hillenbrand[5].LineLength, hillenbrand[6].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Dinner data Hillenbrand
    const dataDinnerHillenbrand = {
      labels: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"],
      datasets: [
        {
          data: [hillenbrand[7].LineLength, hillenbrand[8].LineLength, hillenbrand[9].LineLength, 0],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Breakfast data Wiley
    const dataBreakfastWiley = {
      labels: ["7:00 am", "8:00 am", "9:00 am", "10:00 am"],
      datasets: [
        {
          data: [wiley[0].LineLength, wiley[1].LineLength, wiley[2].LineLength, wiley[3].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Lunch data Wiley
    const dataLunchWiley = {
      labels: ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"],
      datasets: [
        {
          data: [wiley[4].LineLength, wiley[5].LineLength, wiley[6].LineLength, wiley[7].LineLength, wiley[8].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Dinner data Wiley
    const dataDinnerWiley = {
      labels: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"],
      datasets: [
        {
          data: [wiley[9].LineLength, wiley[10].LineLength, wiley[11].LineLength, wiley[12].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Breakfast data Windsor
    const dataBreakfastWindsor = {
      labels: ["7:00 am", "8:00 am", "9:00 am", "10:00 am"],
      datasets: [
        {
          data: [windsor[0].LineLength, windsor[1].LineLength, windsor[2].LineLength, windsor[3].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Lunch data Windsor
    const dataLunchWindsor = {
      labels: ["11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm"],
      datasets: [
        {
          data: [windsor[4].LineLength, windsor[5].LineLength, windsor[6].LineLength, windsor[7].LineLength, windsor[8].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    // Dinner data Windsor
    const dataDinnerWindsor = {
      labels: ["5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"],
      datasets: [
        {
          data: [windsor[9].LineLength, windsor[10].LineLength, windsor[11].LineLength, windsor[12].LineLength],
          color: (opacity = 1) => `rgba(204, 53, 17, ${opacity})`,
          strokeWidth: 2
        }
      ],
      legend: ["Estimated Wait Times (# of people)"],
    };
    //chart style
    const chartConfig = {
        backgroundColor: colors.background,
        backgroundGradientFrom: colors.background,
        backgroundGradientTo: colors.background,
        backgroundGradientToOpacity: 0.6,
        color: (opacity = 1) => `rgba(204, 147, 17, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };

    return (
        <ScrollView>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Wait Times</Text>
            </View>
            <View style={styles.tabBar}>
                <MaterialTabs
                    items={['Breakfast', 'Lunch', 'Dinner']}
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    barColor={colors.background}
                    indicatorColor={colors.text}
                    activeTextColor={"red"}
                    inactiveTextColor={colors.text}
                />
            </View>
            {selectedTab === 0 ? (
            <View>
                <View>
                    <Text style={ [styles.diningTitle, {color: colors.text}] }>Earhart</Text>
                </View>
                <View>
                    <LineChart
                      data={dataBreakfastEarhart}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={dataBreakfastWiley}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={dataBreakfastHillenbrand}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={dataBreakfastWindsor}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={dataBreakfastFord}
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
                      data={dataLunchEarhart}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={dataLunchWiley}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={dataLunchHillenbrand}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={dataLunchWindsor}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={dataLunchFord}
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
                      data={dataDinnerEarhart}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Wiley</Text></View>
                <View>
                    <LineChart
                      data={dataDinnerWiley}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Hillenbrand</Text></View>
                <View>
                    <LineChart
                      data={dataDinnerHillenbrand}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Windsor</Text></View>
                <View>
                    <LineChart
                      data={dataDinnerWindsor}
                      width={screenWidth}
                      height={220}
                      chartConfig={chartConfig}
                    />
                </View>
                <View><Text style={ [styles.diningTitle, {color: colors.text}] }>Ford</Text></View>
                <View>
                    <LineChart
                      data={dataDinnerFord}
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
    screenView: {
        marginTop: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        alignItems: "center",
    },
    button: {
        marginLeft: "-65%",
        marginRight: "73%",
    },
    logoImage: {
        height: 80,
        width: 80,
        marginRight: "15%",
        marginTop: "10%",
        marginBottom: "5%",
        alignItems: "center",
    },
    title: {
        padding: "10%",
        marginTop: "30%",
        marginLeft: "-79%"
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "5%",
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
        textAlign: 'center',
    },
});

export default WaitTimes
