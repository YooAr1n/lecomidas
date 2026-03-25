<template>
    <div class="menu-content">
        <!-- Loop through each section -->
        <section v-for="(section, sIndex) in menuSections" :key="sIndex" class="menu-section">
            <h2>{{ section.name }}</h2>

            <!-- Header row -->
            <div class="menu-header">
                <span class="header-item">Item</span>
                <span class="header-qty">Qty</span>
            </div>

            <ul>
                <li v-for="(item, iIndex) in section.items" :key="iIndex">
                    {{ item.name }}
                    <div class="price-quantity">
                        <span class="price">₱{{ item.price }}</span>
                        <input type="checkbox" class="item-checkbox" :value="item.price" v-model="item.checked"
                            @change="updateTotal(item)" />
                        <input type="number" class="item-quantity" v-model.number="item.quantity"
                            :disabled="!item.checked" min="0" step="1" @change="updateTotal(item)" />
                    </div>
                </li>
            </ul>
        </section>

        <!-- Total + Order -->
        <div class="order-section">
            <h2>₱{{ total.toFixed(2) }}</h2>
            <button class="order-now-button" @click="confirmOrder">
                Order Now
            </button>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
    name: "MainMenu",
    setup() {
        const menuSections = reactive([
            {
                name: "Desserts & Pastries",
                items: [
                    { name: "Crème Brûlée Cheesecake", price: 220, quantity: 0, checked: false },
                    { name: "Blueberry Cheesecake", price: 259, quantity: 0, checked: false },
                    { name: "Strawberry Cheesecake", price: 259, quantity: 0, checked: false },
                    { name: "Mango Cheesecake", price: 259, quantity: 0, checked: false },
                    { name: "Dark Chocolate Chip Cookie", price: 130, quantity: 0, checked: false },
                    { name: "Walnut Chocolate Chip Cookie", price: 140, quantity: 0, checked: false },
                    { name: "Oatmeal Cookie", price: 140, quantity: 0, checked: false },
                    { name: "Pistachio Knafeh", price: 150, quantity: 0, checked: false },
                    { name: "Croissant", price: 110, quantity: 0, checked: false },
                    { name: "Pain Au Chocolat", price: 120, quantity: 0, checked: false },
                    { name: "Le Crookie", price: 230, quantity: 0, checked: false },
                    { name: "Pistachio Chocolat Crookie", price: 250, quantity: 0, checked: false },
                ],
            },
            {
                name: "Coffee",
                items: [
                    { name: "Americano", price: 110, quantity: 0, checked: false },
                    { name: "Café Latte", price: 145, quantity: 0, checked: false },
                    { name: "Spanish Latte", price: 155, quantity: 0, checked: false },
                    { name: "Mocha", price: 165, quantity: 0, checked: false },
                    { name: "White Mocha", price: 165, quantity: 0, checked: false },
                    { name: "LE Cream Cheese Latte", price: 175, quantity: 0, checked: false },
                    { name: "Tiramisu Latte", price: 175, quantity: 0, checked: false },
                    { name: "Salted Caramel Latte", price: 175, quantity: 0, checked: false },
                ],
            },
            {
                name: "Non-Coffee",
                items: [
                    { name: "Matcha Latte", price: 155, quantity: 0, checked: false },
                    { name: "Milo Lava", price: 150, quantity: 0, checked: false },
                    { name: "Strawberry Latte", price: 175, quantity: 0, checked: false },
                    { name: "Strawberry Matcha Latte", price: 185, quantity: 0, checked: false },
                    { name: "LE Strawberry Latte", price: 195, quantity: 0, checked: false },
                ],
            },
            {
                name: "Refreshers",
                items: [
                    { name: "Strawberry Fizz", price: 140, quantity: 0, checked: false },
                    { name: "Lemon Fizz", price: 140, quantity: 0, checked: false },
                    { name: "Cranberry with Honey", price: 150, quantity: 0, checked: false },
                    { name: "Lemon with Honey", price: 150, quantity: 0, checked: false },
                ],
            },
        ]);

        const total = ref(0);

        const updateTotal = () => {
            let sum = 0;
            menuSections.forEach((section) => {
                section.items.forEach((item) => {
                    if (item.checked) {
                        // Force quantity to integer and non-negative
                        if (!Number.isInteger(item.quantity) || item.quantity < 0) {
                            item.quantity = Math.max(0, Math.floor(item.quantity));
                        }
                        sum += item.price * item.quantity;
                    }
                });
            });
            total.value = sum;
        };

        const confirmOrder = () => {
            if (total.value === 0) {
                alert("Please select items first.");
            } else {
                alert(`Order placed!\n₱${total.value.toFixed(2)}`);
            }
        };

        return { menuSections, total, updateTotal, confirmOrder };
    },
};
</script>

<style scoped>
.menu-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: #53433f;
}

/* Section styling */
.menu-section {
    background-color: #f1ece5;
    padding: 10px;
    border-radius: 8px;
}

.menu-section h2 {
    margin-top: 0;
    margin-bottom: 10px;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-weight: bold;
  border-bottom: 1px solid #bbb;
  margin-bottom: 4px;
  color: #333;
}

.header-item {
  flex: 1; /* takes same space as item name */
}

.header-qty {
  width: 140px; /* match the width of the price+checkbox+input block */
  text-align: center; /* optional: center over input */
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #ddd;
    color: #333;
}

/* Price + Quantity layout */
.price-quantity {
    display: flex;
    align-items: center;
    gap: 8px;
}

.price {
    min-width: 50px;
    font-weight: bold;
}

/* Order total */
.order-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #e0d8cc;
    border-radius: 8px;
}

.order-now-button {
    padding: 8px 15px;
    background-color: #312618;
    color: #f9ebce;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.order-now-button:hover {
    background-color: #5b4426;
}
</style>