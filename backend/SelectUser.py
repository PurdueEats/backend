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
    runQuery( f"select UserID, TransactionAmount, Balance, Timestamp from UserBasic as user Inner Join UserTransaction as txn on user.UserID = UserID WHERE UserID = {UserID}")
    
    
if __name__ == "__main__":
	selectUser(6967645914836607000)