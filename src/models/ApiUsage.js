const mongoose = require('mongoose');

const apiUsageSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    endpoint: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    ip: {
      type: String,
      default: '',
    },
    duration: {
      type: Number, // in milliseconds
      default: 0,
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster querying
apiUsageSchema.index({ endpoint: 1, method: 1 });
apiUsageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ApiUsage', apiUsageSchema);
