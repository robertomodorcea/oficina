import Driver from "@/models/driver";
import mongoose from "mongoose";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

export default async function handler(req, res) {
    const { name, startDate, startTime, endDate, endTime, week } = req.body;

    const uri = process.env.MONGODB_URI;

    try {
        mongoose.connect(uri, { useNewUrlParser: true });
        const { name, startDate, startTime, endDate, endTime, week } = req.body;
        const newDate = new Date("Mon, 24 Apr 2023 09:48:41 GMT");

        const driver = await Driver.updateOne(
            {
                name: name,
            },
            {
                $set: {
                    [`startDates.${+week - 1}.date`]: startDate,
                    [`startDates.${+week - 1}.time`]: startTime,
                    [`endDates.${+week - 1}.date`]: endDate,
                    [`endDates.${+week - 1}.time`]: endTime,
                },
            },
            (err, result) => {
                if (err) throw err;
                console.log("Document updated");
                mongoose.connection.close();
            }
        );
        // const driver = await Driver.findOne({ name: "Roberto Modorcea" });
        if (driver) res.status(200).json({ message: "Okay men" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
