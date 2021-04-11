from google.cloud import bigquery
from backend.DB.CreateDBSchema import (
    create_user_tables,
    create_dining_facilities_tables,
    create_menu_items_table,
    create_auxiliary_tables
)
from backend.DB.MealPlans import meal_plan_list
from backend.DB.DiningFacilities import dining_facility_list
import sys


gcp_project = "purdueeats-304919"
bq_dataset = "PurdueEatsDatabase"

client = bigquery.Client(project=gcp_project)
dataset_ref = client.dataset(bq_dataset)


def runQuery(sql: str):
    job_config = bigquery.QueryJobConfig()
    job_config.default_dataset = dataset_ref
    query = client.query(sql, job_config)
    results = query.result()
    print(results)
    return results


def userTableSetup():
    for table in create_user_tables:
        runQuery(create_user_tables[table])


def diningFacilityTableSetup():
    for table in create_dining_facilities_tables:
        runQuery(create_dining_facilities_tables[table])


def menuItemsTableSetup():
    for table in create_menu_items_table:
        runQuery(create_menu_items_table[table])


def auxiliaryTableSetup():
    for table in create_auxiliary_tables:
        runQuery(create_auxiliary_tables[table])


def createSchema():
    userTableSetup()
    diningFacilityTableSetup()
    menuItemsTableSetup()
    auxiliaryTableSetup()


def insertMealPlans():
    runQuery("DELETE from MealPlan WHERE True")
    for meal_plan in meal_plan_list:
        runQuery(meal_plan_list[meal_plan])


def insertDiningFacilities():
    runQuery("DELETE from DiningFacilities WHERE True")
    for dining_facility in dining_facility_list:
        runQuery(dining_facility_list[dining_facility])


def main():

    if len(sys.argv) != 2:
        print("Please provide appropriate arguments")
    elif sys.argv[1].lower() == "all":
        createSchema()
    elif sys.argv[1].lower() == "user":
        userTableSetup()
    elif sys.argv[1].lower() == "dining":
        diningFacilityTableSetup()
    elif sys.argv[1].lower() == "menu":
        menuItemsTableSetup()
    elif sys.argv[1].lower() == "aux":
        auxiliaryTableSetup()
    elif sys.argv[1].lower() == "insert-mealplans":
        insertMealPlans()
    elif sys.argv[1].lower() == "insert-diningfacilities":
        insertDiningFacilities()
    else:

        # For specific tablles
        for schema in [create_user_tables, create_dining_facilities_tables,
                       create_menu_items_table, create_auxiliary_tables]:
            for table in schema:
                if table == sys.argv[1]:
                    runQuery(schema[table])
                    break


if __name__ == "__main__":
    main()