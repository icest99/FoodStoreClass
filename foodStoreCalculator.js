class FoodStoreCalculator {
    constructor() {
        this.menu = {
            Red: 50, // Price Per Set
            Green: 40,
            Blue: 30,
            Yellow: 50,
            Pink: 80,
            Purple: 90,
            Orange: 120,
        };
    }

    calculateTotalPrice(order, hasMemberCard) {
        let totalPrice = 0;

        for (const item in order) {
            if (this.menu.hasOwnProperty(item)) {
                const quantity = order[item];

                //quantity must be greater than zero
                //quantity must be integer
                if(quantity > 0 && Number.isInteger(quantity)) {
                    totalPrice += this.menu[item] * quantity;
                } else {
                    throw new Error(`Invalid quantity for ${item}`);
                }
            } else {
                throw new Error(`Invalid item: ${item}`);
            }
        }

        if (hasMemberCard) {
            totalPrice -= totalPrice * 0.1;
            // 10% discount for members
        }

        if (order.Orange >= 2 || order.Pink >= 2 || order.Green >= 2) {
            totalPrice -= totalPrice * 0.05;
            // 5% discount for doubles
        }

        return totalPrice;
    }
}

module.exports = FoodStoreCalculator;