import requests
from datetime import datetime
from google.cloud import bigquery
from DB.Util import runQuery


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

    DATE = '/' + datetime.today().strftime('%Y-%m-%d')

    MAX_ID = [dict(row) for row in runQuery(
            f"SELECT max(MenuItemID) FROM MenuItems")][0]
    print(MAX_ID)

    for i, loc in enumerate(LOCATIONS):

        response = requests.get(URL + loc + DATE).json()

        #DF_ID = [dict(row) for row in runQuery(
        #   f"""SELECT DiningFacilityID FROM UserBasic WHERE 
        #    DiningFacilityName = '{loc}'""")][0]

        for meals in response['Meals']:
            print(meals)
        print(response['Location'])
        print()


meal_scrapper(None)