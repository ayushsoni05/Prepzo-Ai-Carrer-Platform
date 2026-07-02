import mongoose from 'mongoose';

const newsletterDispatchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  email: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  opened: { type: Boolean, default: false },
  openedAt: Date,
  clicks: [{
    url: { type: String, required: true },
    clickedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const NewsletterDispatch = mongoose.model('NewsletterDispatch', newsletterDispatchSchema);
export default NewsletterDispatch;
