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
        "SELECT max(MenuItemID) FROM MenuItems")][0]['f0_'] + 1

    for i, loc in enumerate(LOCATIONS):

        response = requests.get(URL + loc + DATE).json()

        #DF_ID = [dict(row) for row in runQuery(
        #   f"""SELECT DiningFacilityID FROM UserBasic WHERE 
        #    DiningFacilityName = '{loc}'""")][0]

        for meals in response['Meals']:
            #print(meals)
            time = meals['Hours']['StartTime'] + "-" + meals['Hours']['EndTime']
            time = ' '.join(format(ord(x), 'b') for x in time)

            for station in meals['Stations']:
                
                for item in station['Items']:
                    query = 'INSERT INTO MenuItems values ('
                    query += f"{str(MAX_ID)}, '{item['ID']}', '{item['Name']}',"
                    query += "b'Nutrition',"

                    for alllergen in item['Allergen']



            pass
        print(response['Location'])
        print()


meal_scrapper(None)