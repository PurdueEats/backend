dining_facility_list = {

    'Earhart':
    f"""INSERT INTO MealPlan VALUES
    (1 , Earhart, 
    \"Earhart Dining Court is open to all Purdue student meal plan holders only.\",
    \"1275 1st Street, West Lafayette, IN 47906\",
     b"{open(filename, "rb").read()}", 
     ) """,

    'Hillenbrand':
    f"""INSERT INTO MealPlan VALUES
    (2 , Hillenbrand, 
    \"Hillenbrand Dining Court is open to all Purdue student meal plan holders only.\",
    \"1301 3rd Street, West Lafayette, IN 47906\",
     b"{open(filename, "rb").read()}", 
     ) """,

    'Ford':
    f"""INSERT INTO MealPlan VALUES
    (3 , Ford, 
    \"Ford Dining Court is open to all Purdue student meal plan holders only.\",
    \"1122 W Stadium Ave, West Lafayette, IN 47906\",
     b"{open(filename, "rb").read()}", 
     ) """,

    'Windsor':
    f"""INSERT INTO MealPlan VALUES
    (4 , Windsor, 
    \"Windsor Dining Court is open to all Purdue student meal plan holders only.\",
    \"1196 3rd Street, West Lafayette, IN 47906\",
     b"{open(filename, "rb").read()}", 
     ) """,

    'Wiley':
    f"""INSERT INTO MealPlan VALUES
    (5 , Wiley, 
    \"Wiley Dining Court is open to all Purdue student meal plan holders only.\",
    \"498 N Martin Jischke Dr, West Lafayette, IN 47906\",
     b"{open(filename, "rb").read()}", 
     ) """,

}