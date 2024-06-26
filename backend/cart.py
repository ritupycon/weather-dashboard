Model 
    Coupon
    CouponType
    Cart
    CartItem

Services
    CartService
        - Calculate_total_price


class CouponType:
    N_PERCENT_NEXT_ITEM='N_PERCENT_NEXT_ITEM'
    N_PERCENT_ALL_ITEM='N_PERCENT_ALL_ITEM'


class Coupon:
    
    def get_discount_percentage(self, value):
        return (value // 100)


class Coupon_N_percent_off_next_item(Coupon):
    pass

class Coupon_N_percent_off_all_item(Coupon):
    pass


class Product:
    def __init__(self, name):
        self.name=name

class NormalProduct(Product):
    def __init__(self, name, price: float):
        super().__init__(name)
        self.price=price

class Coupon(Product):
    def __init__(self, name, is_coupon: bool=False, coupon_type: CouponType, discount_percent: float):
        super().__init__(name)
        self.is_coupon=is_coupon
        self.type=coupon_type
        self.discount_percent=discount_percent

class CartItem:
    def __init__(self, name, price=None):
        self.name=name
        self.price=None

class Cart:
    def __init__(self, id, items: CartItem[List]):
        self.items = []
    
    def add_items_to_cart(self, items: CartItem[List]):
        for item in items:
            cart_item = CartItem(name=item.get('name'), price=item.get('price'))
            self.items.append(cart_item)
    
    def get_cart_items(self):
        return self.items
    

    def calculate_total_price(self):
        pass
    

    
        
    



