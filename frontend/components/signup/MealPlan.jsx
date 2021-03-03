import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { Button } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';


class MealPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1"
        };
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    async storeMealPlan() {
        console.log("send name to database");
    }

    render() {
        return (
            <SafeAreaView style={ styles.screen }>
                <Text style={ styles.questionTitle }>Select your meal plan.</Text>
                <DropDownPicker
                    items={[
                        {label: '10 Meal Plan + 100', value: '10 Meal Plan + 100'},
                        {label: '15 Meal Plan + 450', value: '15 Meal Plan + 450'},
                        {label: '21 Meal Plan + 250', value: '21 Meal Plan + 250'},
                        {label: '21 Meal Plan + 500', value: '21 Meal Plan + 500'},
                    ]}
                    defaultValue={this.state.country}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        country: item.value
                    })}
                />
                <Button style={ styles.continueButton }>
                    <Text style={ styles.continueText }>Continue</Text>
                </Button>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    screen:{
        paddingTop: "50%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingBottom: "12%"
    },
    questionTitle: {
        fontSize: 25,
        fontWeight: "bold",
    },
    textInput: {
        width: "100%",
        height: 40
    },
    continueButton: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: "red",
        borderRadius: 10,
        marginTop: "50%"
    },
    continueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
});

export default MealPlan;
