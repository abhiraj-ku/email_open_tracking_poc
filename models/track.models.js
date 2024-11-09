import mongoose, { Schema } from "mongoose";

const trackSchema = new Schema({
  trackingId: {
    type: String,
    required: true,
  },
  opens: {
    type: Number,
    default: 0,
  },
  userIPs: {
    type: [String],
    default: [],
  },
});

const Track = new mongoose.model("Track", trackSchema);

export default Track;
