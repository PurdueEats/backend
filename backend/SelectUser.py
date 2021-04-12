from google.cloud import bigquery
from DB.MealPlans import meal_plan_list
from DB.DiningFacilities import dining_facility_list
import sys
from DB.Util import runQuery

gcp_project = "purdueeats-304919"
bq_dataset = "PurdueEatsDatabase"

client = bigquery.Client(project=gcp_project)
dataset_ref = client.dataset(bq_dataset)

def selectUser(UserID):
    #runQuery("DELETE from MealPlan WHERE True")
    #result = runQuery( f"select user.UserID, TransactionAmount, Balance, Timestamp from UserBasic as user Inner Join UserTransaction as txn on user.UserID = txn.UserID WHERE user.UserID = {UserID}")
    result = runQuery( f"select user.UserID, MealSwipeCount, DiningDollarAmount, MealPlanName from UserBasic as user Inner Join MealPlan as txn on user.UserID = txn.UserID WHERE user.UserID = {UserID}")
    return result.to_dataframe()
    
    
if __name__ == "__main__":
    ret = selectUser(6967645914836607000)
    print(ret)