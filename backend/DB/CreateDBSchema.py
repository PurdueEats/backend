# Schema Description of all User related tables
create_user_tables = {

        "User_Basic":
        f"""
	CREATE OR REPLACE TABLE UserBasic
	(
		UserID			INT64,
		Name 			STRING,
		Email			STRING,
		Password		STRING
	)
	""",

        "User_Extra":
        f"""
	CREATE OR REPLACE TABLE UserExtra
	(
		UserID				INT64,
		MealPlanName 			STRING,
		MealSwipeCount			INT64,
		DiningDollarBalance		FLOAT64
	)
	""",

        "User_Transaction":
        f"""
	CREATE OR REPLACE TABLE UserTransaction
	(
		UserID					INT64,
		TransactionAmount 			FLOAT64,
		Balance					FLOAT64,
		Timestamp				TIMESTAMP
	)
	""",

        "User_Profile":
        f"""
	CREATE OR REPLACE TABLE UserProfile
	(
		UserID			INT64,
		ProfilePicture		BYTES
	)
	""",

	"User_Schedule":
	f"""
	CREATE OR REPLACE TABLE UserSchedule
	(
		UserID			INT64,
		Schedule 		BYTES
	)
	""",

        "User_Favorite_Menu_Items":
        f"""
	CREATE OR REPLACE TABLE UserFavoriteMenuItems
	(
		UserID			INT64,
		MenuItemID		INT64,
		Name			STRING,
		Toggle			BOOL
	)
	""",

	"User_Nutrition":
	f"""
	CREATE OR REPLACE TABLE UserNutrition
	(
		UserID		INT64,
		Calories	INT64,
		Carbs		INT64,
		Fat		INT64,
		Protein		INT64
	)
	""",

	"Weekly_Nutrition":
	f"""
	CREATE OR REPLACE TABLE UserNutrition
	(
		Date		DATE,
		Calories	INT64,
		Carbs		INT64,
		Fat		INT64,
		Protein		INT64
	)
	"""
}

# Schema Description of all Dining Facility related tables
create_dining_facilities_tables = {

        "Dining_Facilities":
        f"""
	CREATE OR REPLACE TABLE DiningFacilities
	(
		DiningFacilityID			INT64,
		DiningFacilityName 			STRING,
		Description				STRING,
		Address					STRING,
		Image					BYTES
	)
	""",


        "Dining_Facility_Reviews":
        f"""
	CREATE OR REPLACE TABLE DiningFacilityReview
	(
		DiningFacilityReviewID		INT64,
		UserID				INT64,
		DiningFacilityID		INT64,
		Review 				STRING,
		Rating				INT64,
		UpvoteCount			INT64,
		DownvoteCount			INT64
	)
	""",

        "Dining_Facility_Review_Vote":
        f"""
	CREATE OR REPLACE TABLE DiningFacilitiyReviewVote
	(
		DiningFacilityReviewID		INT64,
		UserID				INT64,
		Vote				INT64
	)
	""",

        "Dining_Facility_Menu_Items":
        f"""
	CREATE OR REPLACE TABLE DiningFacilityMenuItems
	(
		DiningFacilityID		INT64,
		MenuItemID			INT64,
		Timing				BYTES,
		Station				STRING

	)
	"""
}

# Schema Description of all Menu Items related tables
create_menu_items_table = {

        "Menu_Items":
        f"""
	CREATE OR REPLACE TABLE MenuItems
	(
		MenuItemID		INT64,
		HashID			STRING,
		ItemName		STRING,
		Eggs			BOOL,
		Fish			BOOL,
		Gluten			BOOL,
		Milk			BOOL,
		Peanuts			BOOL,
		Shellfish		BOOL,
		Soy			BOOL,
                TreeNuts		BOOL,
		Vegetarian		BOOL,
		Vegan			BOOL,
                Wheat			BOOL
	)
	""",

        "Menu_Items_Reviews":
        f"""
	CREATE OR REPLACE TABLE MenuItemsReviews
	(
		MenuItemID		INT64,
		UserID			INT64,
		Rating			INT64,
		Timestamp   		TIMESTAMP
	)
	""",
}

# Schema Description of all Auxiliary tables
create_auxiliary_tables = {

        "MealPlan":
        f"""
	CREATE OR REPLACE TABLE MealPlan
	(
		MealPlanName		STRING,
		MealSwipes		INT64,
		DiningDollars		FLOAT64
	)
	""",

        "App_Feedback":
        f"""
	CREATE OR REPLACE TABLE AppFeedback
	(
		UserID			INT64,
		FeedbackText		STRING,
		Timestamp 		TIMESTAMP
	)
	""",

        "FAQ":
        f"""
	CREATE OR REPLACE TABLE FAQ
	(
		Question	STRING,
		Answer		STRING
	)
	""",

        "Purdue_Fun_Fact":
        f"""
	CREATE OR REPLACE TABLE PurdueFunFact
	(
		FunFact 	STRING,
		Date 		DATE
	)
	"""
}
