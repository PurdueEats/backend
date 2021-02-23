create_tables = {
	
	"User_Basic":
	f"""
	CREATE OR REPLACE TABLE UserBasic
	(
		UserID			INT64,
		Name 			STRING,
		Email			STRING,
		Password		STRING,
		PRIMARY KEY 	(UserID)
	)
	""",

	"User_Extra":
	f"""
	CREATE OR REPLACE TABLE UserExtra
	(
		UserID					INT64,
		MealPlanName 			STRING,
		MealSwipeCount			INT64,
		DinningDollarCount		INT64,
		PRIMARY KEY 			(UserID),
		FOREIGN KEY (UserID) REFERENCES UserBasic(UserID) ON DELETE CASCADE,
		FOREIGN KEY (MealPlanName) REFERENCES MealPlan(MealPlanName)
	)
	""",

	"User_Transaction":
	f"""
	CREATE OR REPLACE TABLE UserTransaction
	(
		UserID					INT64,
		TransactionAmount 		INT64,
		Balance					INT64,
		Timestamp				TIMESTAMP,
		PRIMARY KEY 			(UserID),
		FOREIGN KEY (UserID) REFERENCES UserBasic(UserID) ON DELETE CASCADE
	)
	""",

	"User_Profile":
	f"""
	CREATE OR REPLACE TABLE UserProfile
	(
		UserID			INT64,
		ProfilePicture	BYTES,
		PRIMARY KEY 	(UserID),
		FOREIGN KEY (UserID) REFERENCES UserBasic(UserID) ON DELETE CASCADE
	)
	""",

	"User_Schedulle":
	f"""
	CREATE OR REPLACE TABLE UserProfile
	(
		UserID			INT64,
		Schedule 		BYTES,
		PRIMARY KEY 	(UserID),
		FOREIGN KEY (UserID) REFERENCES UserBasic(UserID) ON DELETE CASCADE
	)
	"""
}