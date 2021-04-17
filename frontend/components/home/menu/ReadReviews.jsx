import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'native-base';
import { StackActions } from '@react-navigation/native';

function ReadReviews({route, navigation}) {
    const { colors } = useTheme();
    const [reviews, setReviews] = useState([]);
    const [vote, setVote] = useState();
    const [reviewID, setReviewID] = useState('');

    useEffect(() => {
       getReviews();
    }, []);

    function handleNavigate() {
        navigation.navigate("WriteReview", { UserID: route.params.UserID, token: route.params.token, DiningID: route.params.DiningID });
    }

    function getReviews() {
        fetch(`https://app-5fyldqenma-uc.a.run.app/DFR/?diningFacilityID=` + route.params.DiningID, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful GET
                        // Set Fields to correct values
                        response.json().then(function(data) {
                            //reviews.push(data)
                            setReviews(data);
                        });
                    } else {
                        console.log('Looks like there was a problem getting the reviews. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function submitVote() {
        fetch(`https://app-5fyldqenma-uc.a.run.app/DFR/Vote`, {
            method: 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                    "dining_facility_review_id": reviewID,
                    "user_id": route.params.UserID,
                    "vote_val": vote
                }
            )
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        console.log("Thank you for your vote!")
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem submitting the vote. Status Code: ' +
                            response.status);
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function renderBorderLine() {
        return (
            <View
                style={{
                    borderBottomColor: '#c4baba',
                    borderBottomWidth: 1,
                }}
            />
        );
    }

    function handleUpvote(diningReviewID) {
        setVote(1);
        setReviewID(diningReviewID);
        submitVote();
    }
    function handleDownvote(diningReviewID) {
        setVote(-1);
        setReviewID(diningReviewID);
        submitVote();
    }

    function renderReview(review) {
        return (
            <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "column", marginLeft: "2%", marginTop: "1%"}}>
                    <TouchableOpacity onPress={handleUpvote(review["item"]["dining_facility_review_id"])}>
                        <MaterialCommunityIcons name="arrow-up" color="red" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDownvote(review["item"]["dining_facility_review_id"])}>
                        <MaterialCommunityIcons name="arrow-down" color="red" size={30}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={ [styles.reviewTitle, {color: colors.text}] }>{review["item"]["title"]}</Text>
                    <Text style={ [styles.reviewContent, {color: colors.text}] }>{review["item"]["review_text"]}</Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={ styles.topView } >
                <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
                    <MaterialCommunityIcons name="arrow-left" color="red" size={30}/>
                </TouchableOpacity>
                <Text style={ [styles.screenTitle, {color: colors.text}] }>Reviews</Text>
                <TouchableOpacity active = { .5 } onPress={handleNavigate}>
                    <MaterialCommunityIcons name="pencil" color="red" size={30}/>
                </TouchableOpacity>
            </View>
            <View style={{ marginLeft: "2%", marginRight: "2%", flexDirection: "row" }}>
                    <Text style={ [styles.avgTitle, {color: colors.text}] }>Average Rating: </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: "2%" }}>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                        <MaterialCommunityIcons name="star" color="red" size={30}/>
                    </View>
            </View>
            <View
                style={{
                    borderBottomColor: '#c4baba',
                    borderBottomWidth: 1,
                }}
            />
            <FlatList data={reviews} ItemSeparatorComponent={renderBorderLine} renderItem={(review) => renderReview(review)}
                      keyExtractor={item => { Math.random().toString(36).substring(5) } } />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageView: {
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    topView: {
        marginLeft: "3%",
        marginRight: "3%",
        marginTop: "10%",
        marginBottom: "5%",
        flexDirection: "row"
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
    },
    avgTitle: {
        fontSize: 22,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "9%",
        marginRight: "1%",
        justifyContent: "center"
    },
    reviewTitle: {
        fontSize: 22,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    reviewContent: {
        fontSize: 20,
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
});

export default ReadReviews;
