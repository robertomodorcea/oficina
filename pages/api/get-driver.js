import Driver from "@/models/driver";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const { company } = req.body;

    const uri = process.env.MONGODB_URI;

    try {
        mongoose.connect(uri, { useNewUrlParser: true });
        const driver = await Driver.find();
        res.status(200).json(driver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
