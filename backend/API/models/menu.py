from pydantic import BaseModel

class MenuItem(BaseModel):
    menu_item_id:   int
    hash_id:        str
    item_name:      str
    has_eggs:       bool
    has_fish:       bool
    has_gluten:     bool
    has_milk:       bool
    has_peanuts:    bool
    has_shellfish:  bool
    has_soy:        bool
    has_treenuts:   bool
    is_vegetarian:  bool
    is_vegan:       bool
    has_wheat:      bool
