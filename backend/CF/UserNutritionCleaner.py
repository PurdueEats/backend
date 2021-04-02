from google.cloud import bigquery


gcp_project = "purdueeats-304919"
bq_dataset = "PurdueEatsDatabase"

client = bigquery.Client(project=gcp_project)
dataset_ref = client.dataset(bq_dataset)


def runQuery(sql: str):
    job_config = bigquery.QueryJobConfig()
    job_config.default_dataset = dataset_ref
    query = client.query(sql, job_config)
    results = query.result()
    return results


def nutrition_cleaner(request):

    runQuery("DELETE FROM UserNutrition WHERE True")

    res = [dict(row) for row in runQuery("SELECT UserID FROM UserBasic")]

    for user_id in res:

        runQuery(f"""
        INSERT INTO UserNutrition values
        ({user_id['UserID']}, 0, 0, 0, 0)
        """)
    
    return


if __name__ == "__main__":
    nutrition_cleaner(None)