
import mongoose, { Schema, Document } from 'mongoose';

export interface Customer extends Document {
    cnpj: Number;
    name: String;
    tpv: Number;
    sellerName: String;
    customerUF: String;
}

const CustomerSchema = new Schema<Customer>({
    cnpj: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    tpv: { type: Number, required: true },
    sellerName: { type: String, required: true },
    customerUF: { type: String, required: true }

});

const Customer = mongoose.model<Customer>('customers', CustomerSchema)
export default Customer;