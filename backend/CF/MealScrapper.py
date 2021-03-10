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
        "SELECT max(MenuItemID) FROM MenuItems")]
    
    if MAX_ID:
        MAX_ID = 1
    else:
        MAX_ID[0]['f0_'] + 1

    for loc in LOCATIONS:

        response = requests.get(URL + loc + DATE).json()

        #DF_ID = [dict(row) for row in runQuery(
        #   f"""SELECT DiningFacilityID FROM UserBasic WHERE 
        #    DiningFacilityName = '{loc}'""")][0]

        for meals in response['Meals']:
            
            time = meals['Hours']['StartTime'] + "-" + meals['Hours']['EndTime']
            time = ' '.join(format(ord(x), 'b') for x in time)

            for station in meals['Stations']:
                
                for item in station['Items']:

                    find = [dict(row) for row in runQuery(
                        f"SELECT COUNT(*) FROM MenuItems WHERE HashID = '{item['ID']}'")]
                    
                    if find[0]['f0_'] != 1: 

                        query = 'INSERT INTO MenuItems values ('
                        query += f"{str(MAX_ID)}, '{item['ID']}', \"{item['Name']}\","
                        query += "b'Nutrition',"

                        if 'Allergens' not in item:
                            item['Allergens'] = [{'Value': False} for _ in range(11)]
                    
                        for allergen in item['Allergens']:
                            query += str(allergen['Value']).lower() + ','
                        
                        query = query[:-1] + ')'
                        print(query)
                        runQuery(query)

                        MAX_ID += 1

        print(response['Location'])
        print()


meal_scrapper(None)