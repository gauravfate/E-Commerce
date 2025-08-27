import Subscriber from "../models/subsciber.js";

export const subscriber = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // check if the email is already subscribed
        let existing = await Subscriber.findOne({ email });
        
        if (existing)
            return res.status(400).json({ message: "Email is already subscribed" });

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: "Successfully subscribed to the newsletter" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
