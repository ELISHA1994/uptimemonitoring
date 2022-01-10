import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    tosAgreement: Boolean,
    checks: [
        { type: mongoose.Schema.Types.ObjectId, ref:'Check'}
    ]
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
})

export default mongoose.model('User', userSchema);