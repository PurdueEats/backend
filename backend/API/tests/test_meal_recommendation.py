from fastapi.testclient import TestClient
from API.routes.api import router
from GNN.GraphGen import graph_gen
from GNN.MatrixGen import generate_matrix
from GNN.MatrixFactorization import matrix_factorization
import numpy


client = TestClient(router)


def test_graph_gen():

    graph_gen()

    import os

    import sys

    PATH = sys.path[0] + '/backend/'
    DGL = 'GNN/graph.dgl'
    TEMP = 'temp'
    FILES = ['recipes.csv', 'reviews.csv',
             'clean_recipes.csv', 'clean_reviews.csv']

    assert os.path.isfile(PATH + DGL) == True
    assert os.path.isdir(PATH + TEMP) == True

    for file in FILES:
        assert os.path.isfile(PATH + TEMP + '/' + file) == True

    os.remove(PATH + DGL)

    import shutil
    shutil.rmtree(PATH + TEMP)


def test_generate_matrix():

    M, user_map = generate_matrix()
    assert len(user_map) == M.shape[0]

    indexes = set(user_map.values())

    for i in range(len(user_map)):

        assert i in indexes
        indexes.remove(i)

    for i in range(M.shape[0]):
        for j in range(M.shape[1]):

            assert M[i][j] >= 0 and M[i][j] <= 5


def test_matrix_factorization():

    R = [
        [5, 3, 0, 1],
        [4, 0, 0, 1],
        [1, 1, 0, 5],
        [1, 0, 0, 4],
        [0, 1, 5, 4],
        [2, 1, 3, 0],
    ]

    R = numpy.array(R)
    N = len(R)
    M = len(R[0])
    K = 3

    P = numpy.random.rand(N, K)
    Q = numpy.random.rand(M, K)

    assert P.shape == (N, K)
    assert Q.shape == (M, K)

    nP, nQ = matrix_factorization(R, P, Q, K)

    nR = numpy.dot(nP, nQ.T)

    assert nP.shape == P.shape
    assert nQ.shape == Q.shape
    assert nR.shape == R.shape

    for i in range(R.shape[0]):
        for j in range(R.shape[1]):

            if R[i][j] != 0:

                assert abs(R[i][j] - nR[i][j]) < 0.3


def test_user_predict():

    login = client.post(
        '/Users/Login',
        json={
            "user_id": 0,
            "name": "string",
            "email": "vaas@gmail.com",
            "password": "abcdefghi"
        }
    )

    assert login.status_code == 200
    assert 'UserID' in login.json()
    assert 'token' in login.json()

    token = login.json()['token']

    predict = client.get(
        '/Users/Predict',
        headers={'Authorization': 'Bearer ' + token}
    )

    assert predict.status_code == 200

    for fields in predict.json():

        assert 'menu_item_id'   in fields
        assert 'hash_id'        in fields
        assert 'item_name'      in fields
        assert 'has_eggs'       in fields
        assert 'has_fish'       in fields
        assert 'has_gluten'     in fields
        assert 'has_milk'       in fields
        assert 'has_peanuts'    in fields
        assert 'has_shellfish'  in fields
        assert 'has_soy'        in fields
        assert 'has_treenuts'   in fields
        assert 'is_vegetarian'  in fields
        assert 'is_vegan'       in fields
        assert 'has_wheat'      in fields
