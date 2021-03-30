import dgl
import torch
import time
import kaggle
import pandas as pd
import numpy as np


DATASET = 'kanaryayi/recipe-ingredients-and-reviews/download'
FILENAME = 'temp'


def graph_gen():

    start_time = time.time()
    print("Starting Graph Gen at {}......".format(time_elapsed(0)))

    kaggle.api.authenticate()
    kaggle.api.dataset_download_files(
        DATASET, path=FILENAME, unzip=True)

    print("Dataset fetched at {}......".format(time_elapsed(time.time() - start_time)))

    reviews = pd.read_csv("temp/clean_reviews.csv")

    src = np.zeros(reviews.shape[0], dtype=np.int64)
    dst = np.zeros(reviews.shape[0], dtype=np.int64)
    rating = np.zeros((2*reviews.shape[0], 5), dtype=np.int64)

    for index, row in reviews.iterrows():

        src[index] = int(row['RecipeID'])
        dst[index] = int(row['profileID'])
        rating[index][int(row['Rate'])-1] = 1

    for index in range(reviews.shape[0]):
        rating[reviews.shape[0] + index] = rating[index]
    
    print("Conversion complete at {}......".format(
          time_elapsed(time.time() - start_time)))

    ratings = dgl.heterograph(
        {('menuItem', 'rating', 'user'): (np.concatenate([src, dst]), np.concatenate([dst, src]))})
    ratings.edges['rating'].data['label'] = torch.from_numpy(rating)

    print("Graph conostruction complete at {}......".format(time_elapsed(time.time() - start_time)))


def time_elapsed(diff: float):

    hours, rem = divmod(diff, 3600)
    minutes, seconds = divmod(rem, 60)

    return "{:0>2}:{:0>2}:{:05.2f}".format(int(hours), int(minutes), seconds)


if __name__ == "__main__":
    graph_gen()
