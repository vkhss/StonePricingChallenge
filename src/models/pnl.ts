
import mongoose, { Schema, Document } from 'mongoose';

export interface Pnl extends Document {
    cnpj: String;
    productId: String;
    productName: String;
    campaign: String;
    uf: String;
    startDate: String;
    endDate: String;
    tpv: Number;
    revenues: Number;
    revenuesPerUse: Number;
    manufacturingCost: Number;
    shippingCost: Number;
    totalCost: Number;
    taxes: Number;
    margin: Number;
    marginPercentage: String;
}

const PnlSchema = new Schema<Pnl>({
    cnpj: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    campaign: { type: String, required: true },
    uf: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    tpv: { type: Number, required: true },
    revenues: { type: Number, required: true },
    revenuesPerUse: { type: Number, required: true },
    manufacturingCost: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    taxes: { type: Number, required: true },
    margin: { type: Number, required: true },
    marginPercentage: { type: String, required: true }
});

const Pnl = mongoose.model<Pnl>('pnls', PnlSchema)
export default Pnl;