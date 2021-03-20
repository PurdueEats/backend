import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { StackActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../resources/logo.png";
import { Button } from "native-base";
import CalendarPicker from 'react-native-calendar-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialTabs from "react-native-material-tabs";

function ScheduleManager({route, navigation}) {
    // Calendar Component
    const [day, setDay] = useState(-1);
    const minDate = new Date(); // Today
    const maxDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate() + 6);

    // Modal and Tabs
    const [modalSchedule, setModalSchedule] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    // Schedule Data
    const [mondayBreakfast, setMondayBreakfast] = useState("7a");
    const [mondayLunch, setMondayLunch] = useState("11a");
    const [mondayDinner, setMondayDinner] = useState("5p");
    const [tuesdayBreakfast, setTuesdayBreakfast] = useState("7a");
    const [tuesdayLunch, setTuesdayLunch] = useState("11a");
    const [tuesdayDinner, setTuesdayDinner] = useState("5p");
    const [wednesdayBreakfast, setWednesdayBreakfast] = useState("7a");
    const [wednesdayLunch, setWednesdayLunch] = useState("11a");
    const [wednesdayDinner, setWednesdayDinner] = useState("5p");
    const [thursdayBreakfast, setThursdayBreakfast] = useState("7a");
    const [thursdayLunch, setThursdayLunch] = useState("11a");
    const [thursdayDinner, setThursdayDinner] = useState("5p");
    const [fridayBreakfast, setFridayBreakfast] = useState("7a");
    const [fridayLunch, setFridayLunch] = useState("11a");
    const [fridayDinner, setFridayDinner] = useState("5p");
    const [saturdayBreakfast, setSaturdayBreakfast] = useState("7a");
    const [saturdayLunch, setSaturdayLunch] = useState("11a");
    const [saturdayDinner, setSaturdayDinner] = useState("5p");
    const [sundayBreakfast, setSundayBreakfast] = useState("7a");
    const [sundayLunch, setSundayLunch] = useState("11a");
    const [sundayDinner, setSundayDinner] = useState("5p");

    // Get user's current schedule
    // useEffect(() => {
    //     // Fetch current schedule data
    //     fetch('https://purdueeats-304919.uc.r.appspot.com/Users/'+ route.params.UserID +'/Schedule', {
    //         method: 'POST',
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + route.params.token
    //         },
    //         body: JSON.stringify({
    //             "schedule": {
    //                 "monday": {
    //                     "breakfast": mondayBreakfast,
    //                     "lunch": mondayLunch,
    //                     "dinner": mondayDinner
    //                 },
    //                 "tuesday": {
    //                     "breakfast": tuesdayBreakfast,
    //                     "lunch": tuesdayLunch,
    //                     "dinner": tuesdayDinner
    //                 },
    //                 "wednesday": {
    //                     "breakfast": wednesdayBreakfast,
    //                     "lunch": wednesdayLunch,
    //                     "dinner": wednesdayDinner
    //                 },
    //                 "thursday": {
    //                     "breakfast": thursdayBreakfast,
    //                     "lunch": thursdayLunch,
    //                     "dinner": thursdayDinner
    //                 },
    //                 "friday": {
    //                     "breakfast": fridayBreakfast,
    //                     "lunch": fridayLunch,
    //                     "dinner": fridayDinner
    //                 },
    //                 "saturday": {
    //                     "breakfast": saturdayBreakfast,
    //                     "lunch": saturdayLunch,
    //                     "dinner": saturdayDinner
    //                 },
    //                 "sunday": {
    //                     "breakfast": sundayBreakfast,
    //                     "lunch": sundayLunch,
    //                     "dinner": sundayDinner
    //                 },
    //             },
    //         })
    //     })
    //         .then(
    //             function(response) {
    //                 if (response.status === 200 || response.status === 201) {
    //                     // Successful POST
    //                     console.log("successful update of schedule!")
    //                 } else {
    //                     // Examine the text in the response
    //                     console.log('Loots like there was a problem updating schedule. Status Code: ' +
    //                         response.status);
    //                 }
    //             }
    //         )
    //         .catch(function(err) {
    //             console.log('Fetch Error :-S', err);
    //         });
    // }, []);

    function setDate(date, type) {
        const returned = new Date(date);
        setDay(returned.getDay());
        setModalSchedule(true);
    }

    // function handleSubmit() {
    //     // Submit current schedule data
    //     fetch('https://purdueeats-304919.uc.r.appspot.com/Users/'+ route.params.UserID +'/Schedule', {
    //         method: 'POST',
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': 'Bearer ' + route.params.token
    //         },
    //         body: JSON.stringify({
    //             "schedule": {
    //                 "monday": {
    //                     "breakfast": mondayBreakfast,
    //                     "lunch": mondayLunch,
    //                     "dinner": mondayDinner
    //                 },
    //                 "tuesday": {
    //                     "breakfast": tuesdayBreakfast,
    //                     "lunch": tuesdayLunch,
    //                     "dinner": tuesdayDinner
    //                 },
    //                 "wednesday": {
    //                     "breakfast": wednesdayBreakfast,
    //                     "lunch": wednesdayLunch,
    //                     "dinner": wednesdayDinner
    //                 },
    //                 "thursday": {
    //                     "breakfast": thursdayBreakfast,
    //                     "lunch": thursdayLunch,
    //                     "dinner": thursdayDinner
    //                 },
    //                 "friday": {
    //                     "breakfast": fridayBreakfast,
    //                     "lunch": fridayLunch,
    //                     "dinner": fridayDinner
    //                 },
    //                 "saturday": {
    //                     "breakfast": saturdayBreakfast,
    //                     "lunch": saturdayLunch,
    //                     "dinner": saturdayDinner
    //                 },
    //                 "sunday": {
    //                     "breakfast": sundayBreakfast,
    //                     "lunch": sundayLunch,
    //                     "dinner": sundayDinner
    //                 },
    //             },
    //         })
    //     })
    //         .then(
    //             function(response) {
    //                 if (response.status === 200 || response.status === 201) {
    //                     // Successful POST
    //                     console.log("successful update of schedule!")
    //                 } else {
    //                     // Examine the text in the response
    //                     console.log('Loots like there was a problem updating schedule. Status Code: ' +
    //                         response.status);
    //                 }
    //             }
    //         )
    //         .catch(function(err) {
    //             console.log('Fetch Error :-S', err);
    //         });
    // }

    return (
        <View>
            <View style={ [styles.screenView, {flexDirection:"row"}] } >
                <TouchableOpacity style={ styles.button } onPress={ () => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Image style={ styles.logoImage } source={ Logo } />
            </View>
            <View>
                <Text style={ styles.screenTitle }>Edit Schedule</Text>
            </View>
            <Text style={ styles.directionsText }>Tap a day below to edit or view your schedule for that day.</Text>
            <View style={ styles.daysView }>
                <CalendarPicker
                    startFromMonday={false}
                    restrictMonthNavigation={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={(date, type) => setDate(date, type)}
                />
                <Modal animationType="slide" transparent={true} visible={modalSchedule}>
                    {(() => {
                        switch(day) {
                            case 0: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Sunday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                    {selectedTab === 0 ? (
                                        <DropDownPicker
                                            items={[
                                                {label: '7:00-8:00 am', value: "7a"},
                                                {label: '8:00-9:00 am', value: "8a"},
                                                {label: '9:00-10:00 am', value: "8a"},
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
                                                {label: '11:00-12:00 am', value: "11a"},
                                                {label: '12:00-1:00 pm', value: "12p"},
                                                {label: '1:00-2:00 pm', value: "1p"},
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
                                                {label: '5:00-6:00 pm', value: "5p"},
                                                {label: '6:00-7:00 pm', value: "6p"},
                                                {label: '7:00-8:00 pm', value: "7p"},
                                                {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 1: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Monday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 2: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Tuesday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 3: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Wednesday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 4: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Thursday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 5: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Friday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
                                    </View>
                                    <Button style={styles.modalButton}
                                            onPress={() => setModalSchedule(false)}>
                                        <Text style={styles.confirmButtonText}>Done</Text>
                                    </Button>
                                </View>;
                            }
                            case 6: {
                                return <View style={styles.modalView}>
                                    <Text style={ styles.daysText }>Saturday</Text>
                                    <Text style={ styles.modalDirectionsText }>Select an hour window below that fits your scheduling needs.</Text>
                                    <MaterialTabs
                                        items={['Breakfast', 'Lunch', "Dinner"]}
                                        selectedIndex={selectedTab}
                                        onChange={setSelectedTab}
                                        barColor="#ffffff"
                                        indicatorColor="#000000"
                                        activeTextColor="#000000"
                                        inactiveTextColor="#908c8c"
                                    />
                                    <View style={{ padding: 10, alignItems: "center" }}>
                                        {selectedTab === 0 ? (
                                            <DropDownPicker
                                                items={[
                                                    {label: '7:00-8:00 am', value: "7a"},
                                                    {label: '8:00-9:00 am', value: "8a"},
                                                    {label: '9:00-10:00 am', value: "8a"},
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
                                                    {label: '11:00-12:00 am', value: "11a"},
                                                    {label: '12:00-1:00 pm', value: "12p"},
                                                    {label: '1:00-2:00 pm', value: "1p"},
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
                                                    {label: '5:00-6:00 pm', value: "5p"},
                                                    {label: '6:00-7:00 pm', value: "6p"},
                                                    {label: '7:00-8:00 pm', value: "7p"},
                                                    {label: '8:00-9:00 pm', value: "8p"},
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
                                        <Text style={ styles.modalDirectionsText }>Tap done to save your changes.</Text>
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
            <Text style={ styles.directionsText }>Note: these changes will become your new schedule.</Text>
            <View style={ styles.finalButtons }>
                <Button style={ styles.confirmButtonComponent } onPress={() => navigation.dispatch(StackActions.pop(1))}>
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

export default ScheduleManager;