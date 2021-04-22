from datetime import date
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

    today = date.today()

    res = [dict(row) for row in runQuery("SELECT * FROM UserNutrition")]

    calories, carbs, fat, protein = 0, 0, 0, 0

    for item in res:
        calories += item['Calories']
        carbs += item['Carbs']
        fat += item['Fat']
        protein += item['Protein']

    n = max(len(res), 1)

    calories //= n
    carbs //= n
    fat //= n
    protein //= n

    runQuery(
        f"INSERT INTO WeeklyNutrition values ('{today}', {calories}, {carbs}, {fat}, {protein})")

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
