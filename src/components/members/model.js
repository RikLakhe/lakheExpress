import {model, Schema} from 'mongoose'
import {encryptpass} from '../../utils/cryptoUtils'

const memberSchema = new Schema({
    fullName: {
        type: String,
        minlength: [4, 'Full name must be at least 4 character long'],
        require: [true, 'Name is required'],
    },
    userName: {
            type: String,
            require: [true, 'Username is required'],
            minlength: [4, 'Username must be at least 4 character long'],
            maxlength: [6, 'Username must be less than 6 characters'],
            unique: [true, 'Username must be unique']
        },
    email:{
            type: String,
            require: [true, 'Email is required'],
        },
    hashed_password:{
            type: String,
            require: [true, 'Password is required'],
        },
    sex:{
            type: String,
            default: 'o',
            require: [true, 'Sex is required'],
        },
    permission:{
            type: String,
            default: 'client',
            require: [true, 'Permission is required'],
        },
    verifyCode: {
        type: Number,
    },
    isUserVerified:{
            type: Boolean,
            default: false
        },
    useTwoWayAuthentication: {
        type: Boolean,
        default: false
    },
    createDate:{
            type: Date,
        }
});

// Virtual fields
// !important
memberSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.hashed_password = encryptpass(password);
    })
    .get(function () {
        return this._password
    })

memberSchema.methods = {
    authenticate: function (plainText) {
        return encryptpass(plainText) === this.hashed_password;
    }
}

export default model("Members", memberSchema)
