import mongoose from "mongoose";

const checkSchema = new mongoose.Schema({
    protocol: String,
    url: String,
    method: String,
    successCodes: { type: Array },
    timeoutSeconds: Number,
    state: String,
    userPhone: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

export default mongoose.model('Check', checkSchema);