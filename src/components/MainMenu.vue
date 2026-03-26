<template>
    <div class="menu-content">
        <section v-for="(section, sIndex) in menuSections" :key="sIndex" class="menu-section">
            <h2>{{ section.name }}</h2>

            <div class="menu-header">
                <span class="header-item">Item</span>
                <span class="header-qty">Qty</span>
            </div>

            <ul>
                <li v-for="(item, iIndex) in section.items" :key="iIndex">
                    {{ item.name }}
                    <div class="price-quantity">
                        <span class="price">₱{{ format(item.price, 2) }}</span>

                        <label class="custom-checkbox">
                            <input type="checkbox" :value="item.price" v-model="item.checked"
                                @change="updateTotal(item)" />
                            <span class="checkmark"></span>
                        </label>

                        <input type="number" class="item-quantity" v-model.number="item.quantity"
                            :disabled="!item.checked" min="0" step="1" @change="updateTotal(item)" />
                    </div>
                </li>
            </ul>
        </section>

        <div class="order-section">
            <h2>₱{{ format(total, 2) }}</h2>
            <button class="order-now-button" @click="confirmOrder">
                Order Now
            </button>
        </div>

        <BaseModal v-if="showModal" @close="showModal = false">
            <h2>Confirm Your Order</h2>
            <hr>
            <ul class="order-summary">
                <li v-for="item in selectedItems" :key="item.name">
                    <span>{{ item.name }} x {{ formatWhole(item.quantity, 2) }}</span>
                    <span>₱{{ format(item.price * item.quantity, 2) }}</span>
                </li>
            </ul>
            <div class="modal-total">
                <strong>Total Amount: ₱{{ format(total, 2) }}</strong>
            </div>
            <div class="modal-actions">
                <button class="btn-cancel" @click="showModal = false">Cancel</button>
                <button class="btn-confirm" @click="finalSubmit">Place Order</button>
            </div>
        </BaseModal>

        <BaseModal v-if="showEmptyModal" extraClass="warning-card" @close="showEmptyModal = false">
            <div class="warning-icon">⚠️</div>
            <h2>Oops!</h2>
            <p>Please select at least one item and set its quantity before placing an order.</p>
            <div class="modal-actions center">
                <button class="btn-confirm" @click="showEmptyModal = false">Got it!</button>
            </div>
        </BaseModal>

        <BaseModal v-if="showSuccessModal" @close="goToPrepare">
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 10px;">☕</div>
                <h2>Order Sent to Lecomidas!</h2>
                <p>Your treats are being prepared.</p>
                <div class="modal-actions center">
                    <button class="btn-confirm" @click="goToPrepare">OK</button>
                </div>
            </div>
        </BaseModal>
    </div>
</template>

<script>
import BaseModal from '../components/BaseModal.vue'; // Import it
import { useRouter } from 'vue-router';
import { reactive, ref, computed } from "vue"; // Add computed

export default {
    name: "MainMenu",
    components: { BaseModal },
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

        // Add this line here!
        const format = window.format;
        const formatWhole = window.formatWhole;
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

        const showModal = ref(false);
        const showEmptyModal = ref(false);
        const showSuccessModal = ref(false); // Add this new ref

        // This calculates which items are selected for the modal list
        const selectedItems = computed(() => {
            const list = [];
            menuSections.forEach(section => {
                section.items.forEach(item => {
                    if (item.checked && item.quantity > 0) {
                        list.push(item);
                    }
                });
            });
            return list;
        });

        const confirmOrder = () => {
            // Now check if there are actually items selected
            if (selectedItems.value.length === 0) {
                showEmptyModal.value = true; // Open the warning modal instead of alert
            } else {
                showModal.value = true;
            }
        };

        const router = useRouter();

        // Inside your setup() in MainMenu.vue
        const finalSubmit = () => {
            // 1. Create the new order object
            const prepTimeMinutes = 0.0166//Math.floor(Math.random() * 11) + 5; // Generates 5-15 mins

            const newOrder = {
                id: Math.floor(Math.random() * 10000),
                date: new Date().toLocaleString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: true
                }),
                timestamp: Date.now(),
                total: total.value,
                items: selectedItems.value.map(item => `${item.name} (x${formatWhole(item.quantity, 2)})`),
                status: 'Preparing',
                // --- ADD THIS LINE ---
                estimatedTime: prepTimeMinutes 
            };

            // 2. Get existing orders from localStorage or start a new list
            const existingOrders = JSON.parse(localStorage.getItem('lecomidas_orders')) || [];

            // 3. Add the new order to the start of the list
            existingOrders.unshift(newOrder);

            // 4. Save back to localStorage
            localStorage.setItem('lecomidas_orders', JSON.stringify(existingOrders));

            // 5. Close modal and show success
            showModal.value = false;
            showSuccessModal.value = true;
        };

        const goToPrepare = () => {
            showSuccessModal.value = false;
            router.push('/order');
        };

        return {
            menuSections, format, formatWhole, total, updateTotal,
            confirmOrder, showModal, showEmptyModal, showSuccessModal, 
            selectedItems, finalSubmit, goToPrepare
        };
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
    flex: 1;
    /* takes same space as item name */
}

.header-qty {
    width: 140px;
    /* match the width of the price+checkbox+input block */
    text-align: center;
    /* optional: center over input */
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

/* Dark background that covers the whole screen */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    /* Make sure this is higher than your navbar */
}

/* The actual white box */
.modal-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.order-summary {
    margin: 20px 0;
    max-height: 300px;
    overflow-y: auto;
}

.modal-total {
    text-align: right;
    font-size: 1.2rem;
    margin-bottom: 20px;
    border-top: 2px solid #f1ece5;
    padding-top: 10px;
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.btn-cancel {
    background: #eee;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-confirm {
    background: #312618;
    color: #f9ebce;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.btn-confirm:hover {
    background-color: #5b4426;
}

/* Styling for the warning specific modal */
.warning-card {
    text-align: center;
    border-top: 5px solid #d9534f;
    /* Subtle red top border for warning */
}

.warning-icon {
    font-size: 3rem;
    margin-bottom: 10px;
}

.modal-card p {
    margin: 15px 0 25px;
    font-size: 1.1rem;
    color: #666;
}

.center {
    justify-content: center;
}

/* --- Custom Checkbox Styling --- */
.custom-checkbox {
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    cursor: pointer;
}

/* Hide default checkbox */
.custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* The box the user sees */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: #fff;
    border: 2px solid #312618;
    /* Lecomidas Dark Brown */
    border-radius: 4px;
    transition: all 0.2s ease;
}

/* On hover */
.custom-checkbox:hover input~.checkmark {
    background-color: #f9ebce;
}

/* When checked */
.custom-checkbox input:checked~.checkmark {
    background-color: #312618;
}

/* The white checkmark inside the box */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-checkbox input:checked~.checkmark:after {
    display: block;
}

.custom-checkbox .checkmark:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

/* --- Styled Number Input --- */
.item-quantity {
    width: 120px;
    padding: 5px;
    border: 2px solid #312618;
    border-radius: 5px;
    background-color: #fff;
    color: #312618;
    font-weight: bold;
    text-align: center;
    outline: none;
    transition: opacity 0.3s ease;
}

/* Disabled state (when checkbox is unchecked) */
.item-quantity:disabled {
    background-color: #d8cfc4;
    border-color: #bbb;
    color: #888;
    cursor: not-allowed;
    opacity: 0.6;
}

/* Focus effect */
.item-quantity:focus {
    background-color: #f9ebce;
    box-shadow: 0 0 5px rgba(49, 38, 24, 0.3);
}
</style>