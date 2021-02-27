#Schema Description of all User related tables
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
		UserID					INT64,
		MealPlanName 			STRING,
		MealSwipeCount			INT64,
		DiningDollarBalance	INT64
	)
	""",

	"User_Transaction":
	f"""
	CREATE OR REPLACE TABLE UserTransaction
	(
		UserID					INT64,
		TransactionAmount 		INT64,
		Balance					INT64,
		Timestamp				TIMESTAMP
	)
	""",

	"User_Profile":
	f"""
	CREATE OR REPLACE TABLE UserProfile
	(
		UserID				INT64,
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
		Toggle			BOOL
	)
	""",

}

#Schema Description of all Dining Facility related tables
create_dining_facilities_tables = {
	
	"Dining_Facilities":
	f"""
	CREATE OR REPLACE TABLE DiningFacilities
	(
		DiningFacilityID			INT64,
		DiningFacilityName 		STRING,
		Description					STRING,
		Address						STRING,
		Image						BYTES
	)
	""",


	"Dining_Facility_Reviews":
	f"""
	CREATE OR REPLACE TABLE DiningFacilities
	(
		DiningFacilityReviewID		INT64,
		UserID						INT64,
		DiningFacilityID			INT64,
		Review 						STRING,
		Rating						INT64,
		UpvoteCount					INT64,
		DownvoteCount				INT64
	)
	""",

	"Dining_Facility_Review_Vote":
	f"""
	CREATE OR REPLACE TABLE DiningFacilities
	(
		DiningFacilityReviewID		INT64,
		UserID						INT64,
		Vote						INT64
	)
	""",

	"Dining_Facility_Menu_Items":
	f"""
	CREATE OR REPLACE TABLE DiningFacilityMenuItems
	(
		DiningFacilityID		INT64,
		MenuItemID				INT64,
		Timing					BYTES,
		Station					STRING

	)
	"""
}

#Schema Description of all Menu Items related tables
create_menu_items_table = {
	
	"Menu_Items":
	f"""
	CREATE OR REPLACE TABLE MenuItems
	(
		MenuItemID		INT64,
		HashID			STRING,
		ItemName		STRING,
		Nutrition		BYTES,
		Allergen		BYTES
	)
	""",

	"Menu_Items_Reviews":
	f"""
	CREATE OR REPLACE TABLE MenuItemsReviews
	(
		MenuItemID		INT64,
		UserID			INT64,
		Rating			INT64,
		Timestamp   	TIMESTAMP
	)
	""",
}

#Schema Description of all Auxiliary tables
create_auxiliary_tables = {
	
	"MealPlan":
	f"""
	CREATE OR REPLACE TABLE MealPlan
	(
		MealPlanName		STRING,
		MealSwipes			INT64,
		DiningDollars		INT64
	)
	"""
	,

	"App_Feedback":
	f"""
	CREATE OR REPLACE TABLE AppFeedback
	(
		UserID				INT64,
		FeedbackText		STRING,
		Timestamp 			TIMESTAMP
	)
	"""
	,

	"FAQ":
	f"""
	CREATE OR REPLACE TABLE FAQ
	(
		Question	STRING,
		Answer		STRING
	)
	"""
	,

	"Purdue_Fun_Fact":
	f"""
	CREATE OR REPLACE TABLE PurdueFunFact
	(
		FunFact 	STRING,
		Date 		DATE
	)
	"""
}
