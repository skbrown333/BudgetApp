import mongoose from "mongoose";

let schemaOptions = {
  versionKey: false
};

let accountSchema = new mongoose.Schema(
  {
    cre_date: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true }
  },
  schemaOptions
);

export default mongoose.model("Account", accountSchema);