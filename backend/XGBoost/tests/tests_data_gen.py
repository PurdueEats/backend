import os
import sys
import pandas as pd


def test_file_exists():

    PATH = sys.path[0] + '/backend/'
    TEMP = 'temp.csv'
    WAIT_TIMES = 'WaitTimesRegression.csv'

    assert os.path.isfile(PATH + TEMP) == True
    assert os.path.isfile(PATH + WAIT_TIMES) == True


def test_file_features():

    PATH = sys.path[0] + '/backend/'
    TEMP = 'temp.csv'
    WAIT_TIMES = 'WaitTimesRegression.csv'

    temp = pd.read_csv(PATH + TEMP, parse_dates=[1], sep = ';')
    wait_times = pd.read_csv(PATH + WAIT_TIMES, parse_dates=[1])

    assert 'Date'       in temp.columns
    assert 'LocationId' in temp.columns
    assert 'MealType'   in temp.columns
    assert 'Time'       in temp.columns
    assert 'MenuItem'   in temp.columns

    assert 'Datetime'   in wait_times.columns
    assert 'LineLength' in wait_times.columns
    assert 'LocationId' in wait_times.columns
    assert 'Date'       in wait_times.columns


def one():
    pass



    