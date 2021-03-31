from fastapi.testclient import TestClient
from API.routes.api import router
from GNN.GraphGen import graph_gen
from GNN.MatrixGen import generate_matrix
from GNN.MatrixFactorization import matrix_factorization


client = TestClient(router)

    
def test_graph_gen():
    
    graph_gen()

    import os
    
    import sys

    PATH = sys.path[0] + '/backend/'
    DGL = 'GNN/graph.dgl'
    TEMP = 'temp'
    FILES = ['recipes.csv', 'reviews.csv', 'clean_recipes.csv', 'clean_reviews.csv']

    assert os.path.isfile(PATH + DGL)  == True
    assert os.path.isdir(PATH + TEMP)  == True

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
    pass


def test_user_predict():
    pass