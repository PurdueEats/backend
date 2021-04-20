import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {Button, Toast} from 'native-base';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';


function ReadReviews({route, navigation}) {
    const { colors } = useTheme();
    const [reviews, setReviews] = useState([]);
    const [vote, setVote] = useState();
    const [reviewID, setReviewID] = useState('');
    const [reportModalVisible, setReportModalVisible] = useState(false);

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
                    "user_id": String(route.params.UserID),
                    "vote_val": vote
                }
            )
        })
            .then(
                function(response) {
                    if (response.status === 200 || response.status === 201) {
                        // Successful POST
                        //console.log("Thank you for your vote!");
                        voteConfirmation();
                    } else {
                        // Examine the text in the response
                        console.log('Looks like there was a problem submitting the vote. Status Code: ' +
                            response.status);
                        displayError();
                    }
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    function voteConfirmation() {
        Toast.show({
            style: { backgroundColor: "green", justifyContent: "center" },
            position: "top",
            text: "Thank you for your vote!",
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
            text: "The vote was not submitted. Please try again.",
            textStyle: {
                textAlign: 'center',
            },
            duration: 1500
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
        //console.log("here");
        setVote(1);
        //console.log(vote);
        setReviewID(diningReviewID);
        //console.log(reviewID);
        submitVote();
    }
    function handleDownvote(diningReviewID) {
        // console.log("down");
        setVote(-1);
        setReviewID(diningReviewID);
        submitVote();
    }

    function renderReview(review) {
        let sumVote = review["item"]["upvote_count"] - review["item"]["downvote_count"];
        return (
            <View style={{flexDirection: "row"}}>
                <View style={{flexDirection: "column", marginLeft: "2%", marginTop: "1%"}}>
                    <TouchableOpacity onPress={() => handleUpvote(review["item"]["dining_facility_review_id"])}>
                        <MaterialCommunityIcons name="arrow-up" color="red" size={30}/>
                    </TouchableOpacity>
                    <Text style={[styles.voteCountText, {color: colors.text}]}>{sumVote}</Text>
                    <TouchableOpacity onPress={() => handleDownvote(review["item"]["dining_facility_review_id"])}>
                        <MaterialCommunityIcons name="arrow-down" color="red" size={30}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{flexDirection: "row"}}>
                        <Text style={ [styles.reviewTitle, {color: colors.text}] }>{review["item"]["title"]}</Text>
                        <TouchableOpacity onPress={() => setReportModalVisible(true) }>
                            <MaterialCommunityIcons style={styles.report} name="alert-circle-outline" color="red" size={25}/>
                        </TouchableOpacity>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={reportModalVisible}
                            onRequestClose={() => {
                                setReportModalVisible(!reportModalVisible);
                            }}
                        >
                            <View>
                                <View style={styles.modalView}>
                                    <TouchableOpacity active = { .5 } onPress={() => setReportModalVisible(!reportModalVisible) }>
                                        <View style={styles.closeButton}>
                                            <MaterialCommunityIcons name="close" color="red" size={20}/>
                                        </View>
                                    </TouchableOpacity >
                                    <Text style={ [styles.reportText, {color: colors.text}] }>Would you like to report this review?</Text>
                                    <Button style={ styles.filterButton } >
                                        <Text style={ styles.filterText }>Spam</Text>
                                    </Button>
                                    <Button style={ styles.filterButton } >
                                        <Text style={ styles.filterText }>Inappropriate</Text>
                                    </Button>

                                </View>
                            </View>
                        </Modal>
                    </View>
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
        marginLeft: "1%",
        marginRight: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    reviewContent: {
        fontSize: 20,
        alignItems: "center",
        marginLeft: "1%",
        marginRight: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    voteCountText: {
        fontSize: 20,
        alignItems: "center",
        marginLeft: "15%",
        marginRight: "-6%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    report: {
        fontSize: 20,
        alignItems: "center",
        marginLeft: "10%",
        marginRight: "-6%",
        marginTop: "25%",
        justifyContent: "center"
    },
    modalView: {
        height: "55%",
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: "5%",
        paddingLeft: "2%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        marginBottom: "10%"
    },
    reportText: {
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: "1%",
        marginRight: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        justifyContent: "center"
    },
    filterButton: {
        marginLeft: "10%",
        marginBottom: "1%",
        width: '80%',
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: 'center',
    },
    filterText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});

export default ReadReviews;
