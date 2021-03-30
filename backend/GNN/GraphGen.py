import dgl
import kaggle
import pandas as pd
import numpy as np


DATASET = 'kanaryayi/recipe-ingredients-and-reviews/download'
FILENAME = 'temp'


def graph_gen():

    kaggle.api.authenticate()
    kaggle.api.dataset_download_files(
        DATASET, path=FILENAME, unzip=True)

    reviews = pd.read_csv("temp/clean_reviews.csv")
    print(reviews.head)


if __name__ == "__main__":
    graph_gen()
