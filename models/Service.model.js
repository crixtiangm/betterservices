const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: String
    },
    address: {
      type: String
    },
    latitude: {
      type:String
    },
    longitude: {
      type:String
    },
    _user:[{
      type: Schema.Types.ObjectId,
      ref:"User"
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);

module.exports = Service;