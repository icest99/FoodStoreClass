const FoodStoreCalculator = require('./foodStoreCalculator');

describe('FoodStoreCalculator', () => {
    let foodStore;

    beforeEach(() => {
        foodStore = new FoodStoreCalculator();
    });

    it('calculates total price without discounts', () => {
        const order = {
            Red: 2,
            Green: 1,
            Blue: 3,
        };
        const hasMemberCard = false;
        const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
        expect(totalPrice).toBe(230);
        // 2 * 50 + 1 * 40 + 3 * 30 = 230
    });

    it('apply 10% discount for members', () => {
        const order = {
            Yellow: 1,
            Purple: 2,
        };
        const hasMemberCard = true;
        const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
        expect(totalPrice).toBe(207);
        // (1 * 50 + 2 * 90) * 0.9 = 207
    });

    it('apply 5% discount for doubles of Orange, Pink, or Green sets', () => {
        const order = {
            Orange: 3,
            Pink: 2,
            Green: 2,
        };
        const hasMemberCard = false;
        const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
        expect(totalPrice).toBe(570);
        // (3 * 120 + 2 * 80 + 2 * 40) * 0.95 = 570
    });

    it('apply 10% discount for members and 5% discount for doubles of Orange, Pink, or Green sets', () => {
        const order = {
            Orange: 3,
            Pink: 2,
            Green: 2,
        };
        const hasMemberCard = true;
        const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
        expect(totalPrice).toBe(513);
        // ((3 * 120 + 2 * 80 + 2 * 40) * 0.90) * 0.95 = 513
    })

    describe('Unintended Quantity Cases', () => {
        it('returns 0 when order is empty', () => {
                const order = {};
                const hasMemberCard = false;
                const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
                expect(totalPrice).toBe(0);
        });

        it('apply 10% discount for members with empty order', () => {
            const order = {};
            const hasMemberCard = true;
            const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
            expect(totalPrice).toBe(0);
        });

        it('does not apply any discount for empty order', () => {
            const order = {};
            const hasMemberCard = false;
            const totalPrice = foodStore.calculateTotalPrice(order, hasMemberCard);
            expect(totalPrice).toBe(0);
        });

        it('handles fractional quantities in the order', () => {
            const order = {
                Red: 2,
                Green: 1.2,
                Pink: 3.7,
            };
            const hasMemberCard = false;
            expect(() => {
                foodStore.calculateTotalPrice(order, hasMemberCard);
            }).toThrow(new Error('Invalid quantity for Green'));
        });

        it('handles negative quantities in the order', () => {
            const order = {
                Red: -2,
                Green: -1,
                Pink: -3,
            };
            const hasMemberCard = false;
            expect(() => {
                foodStore.calculateTotalPrice(order, hasMemberCard);
            }).toThrow(new Error('Invalid quantity for Red'));
        });

        it('handles string quantities in the order', () => {
            const order = {
                Red: "2",
                Green: 1,
                Pink: 3,
            };
            const hasMemberCard = false;
            expect(() => {
                foodStore.calculateTotalPrice(order, hasMemberCard);
            }).toThrow(new Error('Invalid quantity for Red'));
        });

        it('handles string quantities in the order', () => {
            const order = {
                Red: "2",
                Green: 1,
                Pink: 3,
            };
            const hasMemberCard = false;
            expect(() => {
                foodStore.calculateTotalPrice(order, hasMemberCard);
            }).toThrow(new Error('Invalid quantity for Red'));
        });

        it('handles invalid items in the order', () => {
            const order = {
                Red: 2,
                Brown: 3,
            };
            const hasMemberCard = false;
            expect(() => {
                foodStore.calculateTotalPrice(order, hasMemberCard);
            }).toThrow(new Error('Invalid item: Brown'));
        })
    })
});