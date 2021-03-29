from DB.Util import runQuery
import numpy as np

def generate_matrix():

    user_map = dict()
    matrix = []

    users = [dict(row) for row in runQuery("SELECT * FROM UserBasic")]
    menu_items = [dict(row) for row in runQuery("SELECT COUNT(*) FROM MenuItems")]
    menu_item_reviews = [dict(row) for row in runQuery("SELECT * FROM MenuItemReviews")]
    menu_items = menu_items[0]['f0_']


    i = 0
    for user in users:
        user_map[str(user['UserID'])] = i
        i += 1
        matrix.append(np.zeros(menu_items))
    
    matrix = np.array(matrix)

    for x in matrix:
        print(x)
    

    
