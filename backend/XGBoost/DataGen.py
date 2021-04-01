import requests
from datetime import date, timedelta

URL = 'https://api.hfs.purdue.edu/menus/v2/locations/'
LOCATIONS = ['Earhart', 'Hillenbrand', 'Ford', 'Windsor', 'Wiley']
DATE = ''

# Change based on local file system
FILENAME = 'temp.csv'


START_DATE = date(2016, 8, 22)
END_DATE = date(2021, 3, 1)


def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)


def generate_dataset():

    file = open(FILENAME, 'a')
    file.write('Date;Location;MealType;Time;MenuItem')

    for single_date in daterange(START_DATE, END_DATE):

        cur_date = single_date.strftime("%Y-%m-%d")

        for loc in LOCATIONS:

            response = requests.get(URL + '/' + loc + '/' + cur_date).json()

            meals_list = []

            try:
                meals_list = [x for x in response['Meals']
                              if x['Status'] == 'Open']
            except:
                pass

            for meals in meals_list:

                time = meals['Hours']['StartTime'] + \
                    "-" + meals['Hours']['EndTime']

                for station in meals['Stations']:

                    for item in station['Items']:

                        file.write(
                            cur_date + ';' + loc + ';' + meals['Name'] + ';' + time + ';' + item['Name'] + '\n')

    file.close()


if __name__ == "__main__":
    generate_dataset()
