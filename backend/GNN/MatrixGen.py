from backend.DB.Util import runQuery
import numpy as np

def generate_matrix():

    user_map = dict()
    matrix = []

    users = [dict(row) for row in runQuery("SELECT * FROM UserBasic")]
    menu_items = [dict(row)
                  for row in runQuery("SELECT COUNT(*) FROM MenuItems")]
    menu_item_reviews = [dict(row) for row in runQuery(
        "SELECT * FROM MenuItemsReviews")]
    
    menu_items = menu_items[0]['f0_']

    i = 0
    for user in users:
        user_map[str(user['UserID'])] = i
        i += 1
        matrix.append(np.zeros((menu_items)))

    matrix = np.array(matrix)
    print(user_map)

    for review in menu_item_reviews:
        matrix[user_map[str(review['UserID'])], review['MenuItemID'] -1] = review['Rating']
    
    return matrix, user_map


if __name__ == "__main__":
    generate_matrix()
