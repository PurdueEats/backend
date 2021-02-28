from google.cloud import bigquery
from DB.CreateDBSchema import (
	create_user_tables,
	create_dining_facilities_tables,
	create_menu_items_table,
	create_auxiliary_tables
	)
import sys


gcp_project = "purdueeats-304919"
bq_dataset = "PurdueEatsDatabase"

client = bigquery.Client(project=gcp_project)
dataset_ref = client.dataset(bq_dataset)

def runQuery(sql: str):
	job_config = bigquery.QueryJobConfig()
	job_config.default_dataset=dataset_ref
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
	else:

		#For specific tablles
		for schema in [create_user_tables, create_dining_facilities_tables, 
						create_menu_items_table, create_auxiliary_tables]:
			for table in schema:
				if table == sys.argv[1]:
					runQuery(schema[table])
					break


if __name__ == "__main__":
	main()