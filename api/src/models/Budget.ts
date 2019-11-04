import mongoose from "mongoose";

let schemaOptions = {
  versionKey: false
};

let budgetSchema = new mongoose.Schema(
  {
    cre_date: { type: String, required: true },
    start_date: { type: String, required: true },
    name: { type: String, required: true },
    budget_ammount: { type: Number, required: true },
    current_ammount: { type: Number, required: true },
    repeat: { type: Boolean, required: true, default: true }
  },
  schemaOptions
);

export default mongoose.model("Budget", budgetSchema);