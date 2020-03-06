import { Document, Schema, Model, model } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export interface IUserDocument extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    tokens: Array<string>

    generateAuthToken(): string
}

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials(email: string, password: string):any
    findByJWT(authToken: string): Promise<IUserDocument>
}

export const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validator: (value: string) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next:any) {
    const user: any = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function (next: any) {
    const user = this
    const token = jwt.sign({
        _id: user._id,
        //@ts-ignore
    }, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


userSchema.statics.findByCredentials = async function (email: string, password: string){
    const user: any = await User.findOne({ email })

    if (!user) {
        throw new Error('Invalid login credentials')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user
}

userSchema.statics.findByJWT = async function (authToken:string): Promise<IUserDocument> {
    let id:any = jwt.decode(authToken)

    const user: any = await User.findById(id._id, (err) => {
        if(err) console.log(err) 
    })

    return user
}

export const User: IUserModel = model<IUserDocument, IUserModel>('User', userSchema)
