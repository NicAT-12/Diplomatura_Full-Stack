import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 80, default: '' },
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      validate: {
        validator: (value) => value.length === 2,
        message: 'Un chat 1 a 1 debe tener exactamente 2 participantes'
      }
    },
    participantsKey: { type: String, required: true, unique: true },
    lastMessage: {
      type: new mongoose.Schema(
        {
          content: String,
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          createdAt: Date
        },
        { _id: false }
      ),
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.participantsKey;
        return ret;
      }
    }
  }
);

chatSchema.index({ participants: 1, updatedAt: -1 });

export default mongoose.model('Chat', chatSchema);
