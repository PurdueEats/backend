from fastapi.testclient import TestClient
from API.routes.api import router
from GNN.GraphGen import graph_gen
from GNN.MatrixGen import generate_matrix
from GNN.MatrixFactorization import matrix_factorization


client = TestClient(router)

"""
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
"""

def test_generate_matrix():
    
    M, user_map = generate_matrix()
    print(user_map)
    print(M[0])
    assert True




def test_matrix_factorization():
    pass


def test_user_predict():
    pass