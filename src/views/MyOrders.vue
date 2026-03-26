<template>
    <div class="orders-container">
        <div class="orders-content">
            <div class="orders-header-row">
                <h1 class="page-title">Past Orders</h1>
                <button 
                    v-if="orders.length > 0" 
                    @click="handleClearHistory" 
                    class="btn-clear"
                >
                    Clear History
                </button>
            </div>
            
            <div v-if="orders.length > 0" class="orders-list">
                <MyOrder 
                    v-for="order in orders" 
                    :key="order.id" 
                    :orderData="order" 
                />
            </div>

            <div v-else class="empty-orders">
                <p>You haven't placed any orders yet.</p>
                <router-link to="/menu" class="menu-btn">Browse Menu</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import MyOrder from '../components/MyOrder.vue';

export default {
    components: { MyOrder },
    data() {
        return {
            orders: [] 
        };
    },
    mounted() {
        document.title = "My Orders";
        this.loadOrders();
    },
    methods: {
        loadOrders() {
            const savedOrders = localStorage.getItem('lecomidas_orders');
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            }
        },
        handleClearHistory() {
            // Confirmation dialog to prevent accidental deletion
            if (window.confirm("Are you sure you want to clear your order history? This cannot be undone.")) {
                this.clearHistory();
            }
        },
        clearHistory() {
            localStorage.removeItem('lecomidas_orders');
            this.orders = [];
        }
    }
};
</script>

<style scoped>
/* ... keep your existing styles ... */

.orders-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #f1ece5;
    padding-bottom: 10px;
}

.page-title {
    margin-bottom: 0; /* Override the previous margin-bottom */
    color: #4a342e;
}

.btn-clear {
    background-color: transparent;
    color: #d9534f; /* Warning Red */
    border: 1px solid #d9534f;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.85em;
    transition: all 0.2s;
}

.btn-clear:hover {
    background-color: #d9534f;
    color: white;
}

/* Existing styles below */
.orders-container {
    background-image: url("../assets/cafebg.png");
    background-size: cover;
    background-position: center top;
    background-attachment: fixed;
    min-height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
}

.orders-content {
    width: 90%;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 15px;
    margin-top: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.empty-orders {
    text-align: center;
    padding: 40px;
}

.menu-btn {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #d4a373;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.menu-btn {
    padding: 8px 15px;
    background-color: #312618;
    color: #f9ebce;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.menu-btn:hover {
    background-color: #5b4426;
}
</style>