import pandas as pd
import dgl
from dgl.data import DGLDataset
import torch
from six.moves import urllib
import numpy


urllib.request.urlretrieve(
    'https://data.dgl.ai/tutorial/dataset/graph_edges.csv', './graph_edges.csv')
urllib.request.urlretrieve(
    'https://data.dgl.ai/tutorial/dataset/graph_properties.csv', './graph_properties.csv')

#edges = pd.read_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_recipes.csv')
# = pd.read_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_reviews.csv')

#edges.head()

#properties.head()

class SyntheticDataset(DGLDataset):
    def __init__(self):
        super().__init__(name='synthetic')

    def process(self):
        edges =  pd.read_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_reviews_tiny.csv')#TODO: FIX THIS DIRECTORY
        properties = pd.read_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_recipes_tiny.csv')#TODO: FIX THIS DIRECTORY
        

        # Get names of indexes for which column recipe id is greater than 7100
        #indexNames = properties[properties['RecipeID'] > 7010 ].index
        # Delete these row indexes from dataFrame
        #properties.drop(indexNames , inplace=True)
        #properties.to_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_recipes_tiny.csv')
        
        #indexNames = edges[edges['RecipeID'] > 7010 ].index
        # Delete these row indexes from dataFrame
        #edges.drop(indexNames , inplace=True)
        #edges.to_csv(r'C:\Users\Mark\Desktop\preprocessed data\clean_reviews_tiny.csv')
        
        #print(properties.shape)
        #print(edges.shape)
             
        
        self.graphs = []
        self.labels = []

        # Create a graph for each graph ID from the edges table.
        # First process the properties table into two dictionaries with graph IDs as keys.
        # The label and number of nodes are values.
        label_dict = {}
        num_nodes_dict = {}
        for _, row in properties.iterrows():
            label_dict[row['RecipeID']] = row['Recipe Name'] #custom
            num_nodes_dict[row['RecipeID']] = row['Review Count'] #custom

        # For the edges, first group the table by graph IDs.
        edges_group = edges.groupby('RecipeID') #custom

        # For each graph ID...
        for graph_id in edges_group.groups: #in this for loop: GRAPH_ID REFERS TO RECIPEID!!!
            # Find the edges as well as the number of nodes and its label.
            edges_of_id = edges_group.get_group(graph_id)
            src = edges_of_id['profileID'].to_numpy() #custom
            ratings = edges_of_id['Rate'].to_numpy() #custom
            num_nodes = num_nodes_dict[graph_id]
            label = label_dict[graph_id]

            ratings = ratings.astype(numpy.int64) #custom: change ratings type to int64 to match src
            #print("ratings: ", ratings.dtype)
            #print("src: ", src.dtype)

            print (len(src))
            # Create a graph and add it to the list of graphs and labels.
            g = dgl.graph((src, ratings), num_nodes=num_nodes) #custom
            self.graphs.append(g)
            self.labels.append(label)

        # Convert the label list to tensor for saving.
        self.labels = torch.LongTensor(self.labels)

    def __getitem__(self, i):
        return self.graphs[i], self.labels[i]

    def __len__(self):
        return len(self.graphs)

dataset = SyntheticDataset()
graph, label = dataset[0]
print(graph, label)
