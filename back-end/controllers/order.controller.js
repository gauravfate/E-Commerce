import Order from "../models/order.js";

export const getMyOrder = async (req, res) => {
    try {
        // Find orders for the authenticated user
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        }); // sort by most recent orders
        console.log(req.user._id);
        
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const orderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "Order Not Found" });
        }

        // Return the full order details
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
