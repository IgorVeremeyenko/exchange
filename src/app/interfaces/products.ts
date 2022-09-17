import { Currency } from "./currency"

export interface Products {
    table: string,
    no: string,
    effectiveDate: Date,
    rates: Currency[]
}
