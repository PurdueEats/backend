from fastapi.testclient import TestClient
from API.routes.api import router
from GNN.GraphGen import graph_gen
from GNN.MatrixGen import generate_matrix
from GNN.MatrixFactorization import matrix_factorization


client = TestClient(router)


def test_graph_gen():
    pass


def test_generate_matrix():
    pass


def test_matrix_factorization():
    pass


def test_user_predict():
    pass