import { MongoClient } from "mongodb";
import Company from "@/models/company";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name } = req.body;

        const uri = process.env.MONGODB_URI;

        try {
            mongoose.connect(uri, { useNewUrlParser: true });
            const cmp = new Company({ name });
            await cmp.save();
            res.status(200).json({ message: "Good" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
