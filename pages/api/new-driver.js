import { MongoClient } from "mongodb";
import Company from "@/models/company";
import Driver from "@/models/driver";
import mongoose from "mongoose";

export default async function handler(req, res) {
    if (req.method === "POST") {

        const {name, companyName} = req.body;
        const uri = process.env.MONGODB_URI;

        try {
            mongoose.connect(uri, { useNewUrlParser: true });
            const newDriver = new Driver({
                name: name,
                companyName: companyName
            });
            await newDriver.save();
            res.status(200).json({ message: "Good" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
