import requests
from datetime import datetime
from google.cloud import bigquery

client = bigquery.Client()
table_id = "[PROJECT-ID].[DATASET].[TABLE]"


URL = 'https://api.hfs.purdue.edu/menus/v2/locations/'
LOCATIONS = ['Earhart', 'Hillenbrand', 'Ford', 'Windsor', 'Wiley']
DATE = ''


def meal_scrapper(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    DATE = datetime.today().strftime('%Y-%m-%d')

    for loc in LOCATIONS:
        pass
    
    response = requests.get('')
    request_json = request.get_json()
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return f'Hello World!'