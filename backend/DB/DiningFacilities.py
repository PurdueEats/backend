import base64


dining_facility_list = {

    'Earhart':
    f"""INSERT INTO DiningFacilities VALUES
    (1 , 'Earhart', 
    \"Earhart Dining Court is open to all Purdue student meal plan holders only.\",
    \"1275 1st Street, West Lafayette, IN 47906\",
     {base64.b64encode(open('backend/DB/resources/Earhart.jpeg', "rb").read())}
     ) """,

    'Hillenbrand':
    f"""INSERT INTO DiningFacilities VALUES
    (2 , 'Hillenbrand', 
    \"Hillenbrand Dining Court is open to all Purdue student meal plan holders only.\",
    \"1301 3rd Street, West Lafayette, IN 47906\",
     {base64.b64encode(open('backend/DB/resources/Hillenbrand.jpeg', "rb").read())} 
     ) """,

    'Ford':
    f"""INSERT INTO DiningFacilities VALUES
    (3 , 'Ford', 
    \"Ford Dining Court is open to all Purdue student meal plan holders only.\",
    \"1122 W Stadium Ave, West Lafayette, IN 47906\",
     {base64.b64encode(open('backend/DB/resources/Ford.jpg', "rb").read())}
     ) """,

    'Windsor':
    f"""INSERT INTO DiningFacilities VALUES
    (4 , 'Windsor', 
    \"Windsor Dining Court is open to all Purdue student meal plan holders only.\",
    \"1196 3rd Street, West Lafayette, IN 47906\",
     {base64.b64encode(open('backend/DB/resources/Windsor.jpg', "rb").read())}
     ) """,

    'Wiley':
    f"""INSERT INTO DiningFacilities VALUES
    (5 , 'Wiley', 
    \"Wiley Dining Court is open to all Purdue student meal plan holders only.\",
    \"498 N Martin Jischke Dr, West Lafayette, IN 47906\",
     {base64.b64encode(open('backend/DB/resources/Wiley.jpg', "rb").read())}
     ) """,

}
