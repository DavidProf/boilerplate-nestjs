import * as mongoose from 'mongoose'

export interface Example extends mongoose.Document {
    id: string
}

export const ExampleSchema = new mongoose.Schema<Example>(
    {
        id: { type: String, required: true, default: 0 },
    },
    {
        versionKey: false,
    },
)
