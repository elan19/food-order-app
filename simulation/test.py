from locust import HttpUser, TaskSet, task, between
import json

class MyUser(HttpUser):
    wait_time = between(0.5, 0.5)
    base_url_frontend = "http://localhost:3000"
    base_url_backend = "http://localhost:1337"

    @task
    def simulate_navigation(self):
        self.client.get("/")
        self.client.get("/menu")
        self.client.get("/about")
        self.client.get("/contact")

    @task
    def place_order(self):
        menu_items = [
            {"name": "Cheese Burger", "price": 64},
            {"name": "Small Fries", "price": 15},
            {"name": "Coca-cola", "price": 15}
        ]
        jsonData = json.dumps(menu_items)
        order_data = {
            "customerName": "John Doe",
            "email": "example@example.com",
            "phoneNumber": "1234567890",
            "items": jsonData,
            "totalPrice": 94
        }
        self.client.post(url=f"{self.base_url_backend}/orders", json=order_data)

    @task
    def check_order(self):
        self.client.get(url=f"{self.base_url_frontend}/order/2")
