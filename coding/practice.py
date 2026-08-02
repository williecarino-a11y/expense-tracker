def calculate_total(price, quantity):
    total = price * quantity
    return total

user_price = float(input("Enter the price: "))
user_quantity = float(input("Enter the quantity: "))

result = calculate_total(user_price, user_quantity)
print(f"The total cost is: {result}")
