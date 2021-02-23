from google.cloud import bigquery
from CreateDBSchema import create_tables


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

runQuery(create_tables['User_Basic'])