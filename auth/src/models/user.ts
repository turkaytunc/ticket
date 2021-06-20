import { Model, model, Document, Schema } from 'mongoose';

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

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attributes: UserAttributes) => new User(attributes);

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
