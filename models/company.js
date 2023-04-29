import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;