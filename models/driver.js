import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    startDates: {
        type: [{
            date: { type: Date },
            time: { type: String }
        }],
        default: function() {
            return Array.from({ length: 52 }, () => ({ date: null, time: null }));
        }
    },
    endDates: {
        type: [{
            date: { type: Date },
            time: { type: String }
        }],
        default: function() {
            return Array.from({ length: 52 }, () => ({ date: null, time: null }));
        }
    }
});

const Driver = mongoose.models.Driver || mongoose.model('Driver', driverSchema);

export default Driver;
