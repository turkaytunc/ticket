import { Model, model, Document, Schema } from 'mongoose';
import { Password } from '../utils';

interface UserAttributes {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(att: UserAttributes): UserDoc;
}

// extra prop goes here
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.hashPassword(this.get('password'));
    this.set('password', hashed);
  }
});

userSchema.statics.build = (attributes: UserAttributes) => new User(attributes);

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
