import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return {
    uid: _id,
    ...user,
  };
};

export default model("User", UserSchema);
