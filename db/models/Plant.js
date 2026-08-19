import mongoose from "mongoose";

const { Schema } = mongoose;

const plantSchema = new Schema({
     name: {
    type: String,
    required: true,
    trim: true
  },
  botanicalName: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  waterNeed: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  lightNeed: {
    type: String,
    enum: ['Full Sun', 'Partial Shade', 'Full Shade'],
    required: true
  },
  fertiliserSeason: {
    type: [String],
    enum: ['Spring', 'Summer', 'Autumn', 'Winter'],
    default: []
  },
  description: {
    type: String,
    trim: true
  }
},
{timestamps: true}
);

const Plant = mongoose.models.Plant || mongoose.model("Plant", plantSchema);

export default Plant;