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

    src = np.zeros(reviews.shape[0], dtype=np.int64)
    dst = np.zeros(reviews.shape[0], dtype=np.int64)
    rating = np.zeros((reviews.shape[0], 5), dtype=np.int64)

    for index, row in reviews.iterrows():

        src[index] = int(row['RecipeID'])
        dst[index] = int(row['profileID'])
        rating[index][int(row['Rate'])-1] = 1


if __name__ == "__main__":
    graph_gen()
