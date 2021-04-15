#INSTRUCTIONS: RUN FILE WITH 1 ARG AS USER ID. E.G. python UserSummary.py 7023699889393535879

from google.cloud import bigquery
import sys
from backend.DB.Util import runQuery
from backend.API.routes.menu import get_nutrition, nutrition_to_macros, get_menu_item
import pandas as pd
import datetime

def userReviewsSummary(UserID):
    reviews = runQuery( f"select user.UserID, MenuItemID, Rating, Timestamp from UserBasic as user Inner Join MenuItemsReviews as txn on user.UserID = txn.UserID WHERE user.UserID = {UserID}")
    return reviews.to_dataframe()

def userTransactionsSummary(UserID):
    transactions = runQuery( f"select user.UserID, TransactionAmount, Balance, Timestamp from UserBasic as user Inner Join UserTransaction as txn on user.UserID = txn.UserID WHERE user.UserID = {UserID}")
    return transactions.to_dataframe()

def getMenuItemName(MenuItemID):
    rtn = runQuery( f"select ItemName from MenuItems WHERE MenuItemID = {MenuItemID}").to_dataframe()
    rtn.columns = [''] * len(rtn.columns)
    return rtn

if __name__ == "__main__":
    input = sys.argv[1]

    #below calculates macros and stuff eaten.
    df = userReviewsSummary(input) #use 7023699889393535879 for example
    df['first_day_of_week'] = df["Timestamp"].apply(lambda df:
                                            datetime.datetime(year=df.year, month=df.month, day=df.day))
    df.set_index(df["first_day_of_week"], inplace=True) #makes lines 56-59 run

    calories = [] #these empty lists will be populated with in the for loop below, then added as columns to dataset.
    carbs = []
    fat = []
    protein = []
    menuItemStr = []

    for i, row in df.iterrows():
        menu_item_id = row[1] #this is the menu item id
        menuItemStr.append(getMenuItemName(menu_item_id).loc[0].to_string()[4:])
        response = get_nutrition(menu_item_id)
        _calories, _carbs, _fat, _protein = nutrition_to_macros(response)
        calories.append(_calories)
        carbs.append(_carbs)
        fat.append(_fat)
        protein.append(_protein)
    df['calories'] = calories
    df['carbs'] = carbs
    df['fat'] = fat
    df['protein'] = protein
    df['menuItemStr'] = menuItemStr

    weeksList = [i for i in range(27)]
    emptyDict = {}
    for i in weeksList:
        emptyDict[i] = 0

    weekly_avg_calories = df.calories.resample('W').sum() / df.first_day_of_week.resample('W').count()
    d = pd.Series(weekly_avg_calories.index, index=weekly_avg_calories.index)
    new_index = d.dt.isocalendar()
    weekly_avg_calories.index = new_index.week
    weekly_avg_calories = weekly_avg_calories.to_dict()
    emptyDict.update(weekly_avg_calories)
    weekly_avg_calories = emptyDict

    emptyDict = {}
    for i in weeksList:
        emptyDict[i] = 0
    weekly_avg_carbs = df.carbs.resample('W').sum() / df.first_day_of_week.resample('W').count()
    d = pd.Series(weekly_avg_carbs.index, index=weekly_avg_carbs.index)
    new_index = d.dt.isocalendar()
    weekly_avg_carbs.index = new_index.week
    weekly_avg_carbs = weekly_avg_carbs.to_dict()
    emptyDict.update(weekly_avg_carbs)
    weekly_avg_carbs = emptyDict

    emptyDict = {}
    for i in weeksList:
        emptyDict[i] = 0
    weekly_avg_fat = df.fat.resample('W').sum() / df.first_day_of_week.resample('W').count()
    d = pd.Series(weekly_avg_fat.index, index=weekly_avg_fat.index)
    new_index = d.dt.isocalendar()
    weekly_avg_fat.index = new_index.week
    weekly_avg_fat = weekly_avg_fat.to_dict()
    emptyDict.update(weekly_avg_fat)
    weekly_avg_fat = emptyDict

    emptyDict = {}
    for i in weeksList:
        emptyDict[i] = 0
    weekly_avg_protein = df.protein.resample('W').sum() / df.first_day_of_week.resample('W').count()
    d = pd.Series(weekly_avg_protein.index, index=weekly_avg_protein.index)
    new_index = d.dt.isocalendar()
    weekly_avg_protein.index = new_index.week
    weekly_avg_protein = weekly_avg_protein.to_dict()
    emptyDict.update(weekly_avg_protein)
    weekly_avg_protein = emptyDict
    #sum of total calories per week / number of active input days per week

    #counting unique occurences
    df['menuItemStr'] = df['menuItemStr'].str.split()
    menu_item_count = df['menuItemStr'].apply(pd.Series).stack().reset_index(drop=True).value_counts()
    #menu_item_count = df['MenuItemID'].value_counts() #obsolete line that returns menu item id with count
    menu_item_count = menu_item_count.to_dict()
    # this is to calculate user transactions
    df2 = userTransactionsSummary(input)
    df2['first_day_of_week'] = df2["Timestamp"].apply(lambda df2:
                                            datetime.datetime(year=df2.year, month=df2.month, day=df2.day))
    df2.set_index(df2["first_day_of_week"], inplace=True) #makes line 74 run
    weekly_summary_trans = df2.TransactionAmount.resample('W').sum()
    d = pd.Series(weekly_summary_trans.index, index=weekly_summary_trans.index)
    new_index = d.dt.isocalendar()
    weekly_summary_trans.index = new_index.week
    weekly_summary_trans = weekly_summary_trans.to_dict()
    emptyDict = {}
    for i in weeksList:
        emptyDict[i] = 0
    emptyDict.update(weekly_summary_trans)
    weekly_summary_trans = emptyDict

    print("\nMenu Item Count is used for word cloud. It contains the menu item # followed by the count.")

    print(f"\nmenu_item_count: \n{menu_item_count}") #frequency count of menu items; for word cloud
    print("\nWeekly macro averages are below. They're in Series format and can thus be plotted. The index is the first day of the week, the values are average macro consumed of that week")
    print(f"\nweekly_avg_calories: \n{weekly_avg_calories}") #this is a series
    print(f"\nweekly_avg_carbs: \n{weekly_avg_carbs}")  # this is a series
    print(f"\nweekly_avg_fat: \n{weekly_avg_fat}") #this is a series
    print(f"\nweekly_avg_protein: \n{weekly_avg_protein}") #this is a series
    print("\nWeekly sum transactions averages are below. They're in the same format as above.")
    print(f"\nweekly_summary_trans \n{weekly_summary_trans}") #this is a series.

