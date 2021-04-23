import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { StackActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';
import Logo from "../../../resources/logo.png";
import {Button, Toast} from "native-base";
import CalendarPicker from 'react-native-calendar-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialTabs from "react-native-material-tabs";

function Schedule({route, navigation}) {
    const { colors } = useTheme()
    // Calendar Component
    const [day, setDay] = useState(-1);
    const minDate = new Date(); // Today
    const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 6);

    // Modal and Tabs
    const [modalSchedule, setModalSchedule] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    // Schedule Data
    const [mondayBreakfast, setMondayBreakfast] = useState("07");
    const [mondayLunch, setMondayLunch] = useState("11");
    const [mondayDinner, setMondayDinner] = useState("17");
    const [tuesdayBreakfast, setTuesdayBreakfast] = useState("07");
    const [tuesdayLunch, setTuesdayLunch] = useState("11");
    const [tuesdayDinner, setTuesdayDinner] = useState("17");
    const [wednesdayBreakfast, setWednesdayBreakfast] = useState("07");
    const [wednesdayLunch, setWednesdayLunch] = useState("11");
    const [wednesdayDinner, setWednesdayDinner] = useState("17");
    const [thursdayBreakfast, setThursdayBreakfast] = useState("07");
    const [thursdayLunch, setThursdayLunch] = useState("11");
    const [thursdayDinner, setThursdayDinner] = useState("17");
    const [fridayBreakfast, setFridayBreakfast] = useState("07");
    const [fridayLunch, setFridayLunch] = useState("11");
    const [fridayDinner, setFridayDinner] = useState("17");
    const [saturdayBreakfast, setSaturdayBreakfast] = useState("07");
    const [saturdayLunch, setSaturdayLunch] = useState("11");
    const [saturdayDinner, setSaturdayDinner] = useState("17");
    const [sundayBreakfast, setSundayBreakfast] = useState("07");
    const [sundayLunch, setSundayLunch] = useState("11");
    const [sundayDinner, setSundayDinner] = useState("17");
    const [settings, setSettings] = useState("00");

    // Get user's current schedule
    useEffect(() => {
        // Fetch current schedule data
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Schedule', {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        response.json().then(function(data) {
                            setSundayBreakfast(data["schedule"].substring(0, 2))
                            setSundayLunch(data["schedule"].substring(2, 4))
                            setSundayDinner(data["schedule"].substring(4, 6))
                            setMondayBreakfast(data["schedule"].substring(6, 8))
                            setMondayLunch(data["schedule"].substring(8, 10))
                            setMondayDinner(data["schedule"].substring(10, 12))
                            setTuesdayBreakfast(data["schedule"].substring(12, 14))
                            setTuesdayLunch(data["schedule"].substring(14, 16))
                            setTuesdayDinner(data["schedule"].substring(16, 18))
                            setWednesdayBreakfast(data["schedule"].substring(18, 20))
                            setWednesdayLunch(data["schedule"].substring(20, 22))
                            setWednesdayDinner(data["schedule"].substring(22, 24))
                            setThursdayBreakfast(data["schedule"].substring(24, 26))
                            setThursdayLunch(data["schedule"].substring(26, 28))
                            setThursdayDinner(data["schedule"].substring(28, 30))
                            setFridayBreakfast(data["schedule"].substring(30, 32))
                            setFridayLunch(data["schedule"].substring(32, 34))
                            setFridayDinner(data["schedule"].substring(34, 36))
                            setSaturdayBreakfast(data["schedule"].substring(36, 38))
                            setSaturdayLunch(data["schedule"].substring(38, 40))
                            setSaturdayDinner(data["schedule"].substring(40, 42))
                            setSettings(data["schedule"].substring(42, 44))
                        });
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem retrieving schedule. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }, []);

    function setDate(date, type) {
        const returned = new Date(date);
        setDay(returned.getDay());
        setModalSchedule(true);
    }

    function displayConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Schedule successfully updated.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function displayError() {
        Toast.show({
            style: { backgroundColor: "red", justifyContent: "center" },
            position: "top",
            text: "Update schedule failed. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
        });
    }

    function handleSubmit() {
        let schedule = (sundayBreakfast + sundayLunch + sundayDinner + mondayBreakfast + mondayLunch + mondayDinner +
            tuesdayBreakfast + tuesdayLunch + tuesdayDinner + wednesdayBreakfast + wednesdayLunch + wednesdayDinner +
            thursdayBreakfast + thursdayLunch + thursdayDinner + fridayBreakfast + fridayLunch + fridayDinner +
            saturdayBreakfast + saturdayLunch + saturdayDinner + settings)
        // Submit current schedule data
        fetch('https://app-5fyldqenma-uc.a.run.app/Users/'+ route.params.UserID +'/Schedule', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + route.params.token
            },
            body: JSON.stringify({
                "user_id": route.params.UserID,
                "schedule": schedule
            })
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        displayConfirmation();
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem updating schedule. Status Code: ' +
                            response.status);
                        displayError();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    return (
        <View>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Edit Schedule</Text>
            </View>
            <Text style={ [styles.directionsText, {color: colors.text}] }>Tap a day below to edit or view your schedule for that day.</Text>
            <View style={ [styles.daysText, {color: colors.text}] }>
                <CalendarPicker
                    startFromMonday={false}
                    restrictMonthNavigation={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    selectedDayColor="red"
                    selectedDayTextColor="#FFFFFF"

                    customDatesStyles={() => {
                        return {
                            textStyle: { color: "#808080", opacity: 1 },
                        };
                    }}
                    customDayHeaderStyles={() => {
                        return {
                            textStyle: { color: "#808080", opacity: 1 },
                        };
                    }}
                    onDateChange={(date, type) => setDate(date, type)}
                />
                <Modal animationType="slide" transparent={true} visible={modalSchedule}>
                    {(() => {
                        switch(day) {
                            case 0: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Sunday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={sundayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSundayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={sundayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSundayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={sundayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSundayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 1: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Monday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={mondayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setMondayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={mondayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setMondayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={mondayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setMondayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 2: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Tuesday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={tuesdayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setTuesdayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={tuesdayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setTuesdayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={tuesdayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setTuesdayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 3: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Wednesday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={wednesdayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setWednesdayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={wednesdayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setWednesdayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={wednesdayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setWednesdayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 4: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Thursday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={thursdayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setThursdayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={thursdayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setThursdayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={thursdayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setThursdayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 5: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Friday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={fridayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setFridayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={fridayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setFridayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={fridayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setFridayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 6: {
                                return <View style={ [styles.modalView, {backgroundColor: colors.card}] }>
                                    <Text style={ [styles.daysText, {color: colors.text}] }>Saturday</Text>
                                    <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor={colors.card}
                                        indicatorColor={colors.text}
                                        activeTextColor={"red"}
                                        inactiveTextColor={colors.text}
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "07"},
                                                    {label: '8:00-9:00 am', value: "08"},
                                                    {label: '9:00-10:00 am', value: "09"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa', zIndex: 1}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={saturdayBreakfast}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSaturdayBreakfast(item.value)}
                                            />
                                        ) : selectedTab === 1 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '11:00-12:00 am', value: "11"},
                                                    {label: '12:00-1:00 pm', value: "12"},
                                                    {label: '1:00-2:00 pm', value: "13"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={saturdayLunch}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSaturdayLunch(item.value)}
                                            />
                                        ) : (
                                            <DropDownPicker
                                                items={[
                                                    {label: '5:00-6:00 pm', value: "17"},
                                                    {label: '6:00-7:00 pm', value: "18"},
                                                    {label: '7:00-8:00 pm', value: "19"},
                                                    {label: '8:00-9:00 pm', value: "20"},
                                                ]}
                                                containerStyle={{height: 40, width: 200}}
                                                style={{backgroundColor: '#fafafa'}}
                                                itemStyle={{
                                                    justifyContent: 'flex-start'
                                                }}
                                                defaultValue={saturdayDinner}
                                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                                onChangeItem={item => setSaturdayDinner(item.value)}
                                            />
                                        )}
                                    </View>
                                    <View style={ styles.modalButtonView }>
                                        <Text style={ [styles.modalDirectionsText, {color: colors.text}] }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                        }
                    })()}
                </Modal>
            </View>
            <Text style={ [styles.directionsText, {color: colors.text}] }>Note: these changes will become your new schedule.</Text>
            <View style={ styles.finalButtons }>
                <Button style={ styles.confirmButtonComponent } onPress={() => handleSubmit()}>
                    <Text style={ styles.confirmButtonText }>Update Schedule</Text>
                </Button>
            </View>
        </View>
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
    screenTitle: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "5%",
    },
    directionsText: {
        fontSize: 15,
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "4%",
        textAlign: "center",
    },
    daysView: {
        marginTop: "4%",
        marginBottom: "15%"
    },
    daysText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    currentScheduleText: {
        fontSize: 15,
        textAlign: "center",
    },
    currentScheduleTextFinal: {
        fontSize: 15,
        textAlign: "center",
        marginBottom: "8%"
    },
    finalButtons: {
        marginLeft: "10%",
        marginRight: "10%"
    },
    confirmButtonComponent: {
        width: "100%",
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: "red",
        marginTop: "8%",
        marginBottom: "8%"
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    // Modal styling
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: "60%"
    },
    modalDirectionsText: {
        fontSize: 15,
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "4%",
        paddingTop: "4%",
        textAlign: "center",
    },
    modalDropdown: {
        justifyContent: 'center',
        backgroundColor: '#fafafa'
    },
    modalButtonView: {
        marginTop: "35%"
    },
    modalButton: {
        width: "100%",
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: "red",
        marginTop: "2%",
        marginBottom: "2%"
    },
});

export default Schedule;
