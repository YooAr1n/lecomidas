<template>
    <div class="order-card">
        <div class="order-header">
            <span class="order-id">Order #{{ orderData.id }}</span>
            <span class="order-date">{{ orderData.date }}</span>
        </div>
        
        <div class="order-body">
            <p class="items-list"><strong>Items:</strong> {{ orderData.items.join(', ') }}</p>
            <p class="order-total">Total: ₱{{ format(orderData.total, 2) }}</p>
            
            <div v-if="currentStatus === 'Preparing'" class="et-container">
                <span class="et-icon">⏳</span>
                <span class="et-text">Ready in: <strong>{{ remainingTimeText }}</strong></span>
            </div>
        </div>

        <div class="order-footer">
            <div class="status-container">
                <span :class="['status-badge', currentStatus.toLowerCase()]">
                    {{ currentStatus }}
                </span>
                <span v-if="currentStatus === 'Delivered'" class="delivered-at">
                    Delivered at {{ deliveredTimeText }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';

export default {
    props: {
        orderData: { type: Object, required: true }
    },
    setup(props) {
        const format = window.format;
        const now = ref(Date.now());
        let timer = null;

        const currentStatus = computed(() => {
            const finishTime = props.orderData.timestamp + (props.orderData.estimatedTime * 60000);
            return now.value >= finishTime ? 'Delivered' : 'Preparing';
        });

        // New Computed: Formats the exact time the order finished
        const deliveredTimeText = computed(() => {
            if (!props.orderData.timestamp) return "";
            const finishTime = new Date(props.orderData.timestamp + (props.orderData.estimatedTime * 60000));
            return finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });

        const remainingTimeText = computed(() => {
            if (!props.orderData.timestamp || !props.orderData.estimatedTime) {
                return "Calculating...";
            }
            const finishTime = props.orderData.timestamp + (props.orderData.estimatedTime * 60000);
            const diff = finishTime - now.value;
            if (diff <= 0) return "0s";
            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            return `${mins}m ${secs}s`;
        });

        onMounted(() => {
            timer = setInterval(() => {
                now.value = Date.now();
                if (currentStatus.value === 'Delivered' && props.orderData.status !== 'Delivered') {
                    updateOrderInStorage();
                }
            }, 1000);
        });

        onUnmounted(() => clearInterval(timer));

        const updateOrderInStorage = () => {
            const orders = JSON.parse(localStorage.getItem('lecomidas_orders')) || [];
            const index = orders.findIndex(o => o.id === props.orderData.id);
            if (index !== -1) {
                orders[index].status = 'Delivered';
                localStorage.setItem('lecomidas_orders', JSON.stringify(orders));
            }
        };

        return { format, currentStatus, remainingTimeText, deliveredTimeText };
    }
}
</script>

<style scoped>
.order-card {
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    background: white;
    transition: transform 0.2s;
}

.order-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0,0,0,0.05);
}

.order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 10px;
    margin-bottom: 10px;
}

.order-id { font-weight: bold; color: #53433f; }
.order-date { font-size: 0.9em; color: #888; }
.order-total { font-weight: bold; color: #2d6a4f; margin-top: 5px; }

.status-container {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center; /* Align badge and text vertically */
    gap: 12px;           /* Space between badge and timestamp */
}

.delivered-at {
    font-size: 0.8em;
    color: #666;
    margin-top: 12px; /* Matches the badge's top margin */
    font-style: italic;
}

.status-badge {
    display: inline-block; /* Ensure it respects margins */
    margin-top: 12px;      /* This pushes it away from the 'Ready in' box */
    font-size: 0.8em;
    padding: 4px 10px;
    border-radius: 20px;
    text-transform: uppercase;
}

.delivered { background: #d8f3dc; color: #1b4332; }
.preparing { background: #fff3b0; color: #856404; }

.et-container {
    margin-top: 10px;
    padding: 8px;
    background-color: #fcf8e3; /* Light yellowish highlight */
    border-left: 4px solid #856404;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.et-text {
    font-size: 0.85rem;
    color: #856404;
}

.et-icon {
    font-size: 1rem;
}
</style>