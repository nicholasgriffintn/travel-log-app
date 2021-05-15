const _kebabCase = require('lodash/kebabCase');
const assert = require('http-assert');
const AWS = require('aws-sdk');
const dynazord = require('dynazord');
const isUUID = require('validator/lib/isUUID');
const { v4: uuid } = require('uuid');

const dynamodb = new AWS.DynamoDB({ region: 'eu-west-1' });

const logs = dynazord.createModel({
  dynamodb,
  tableName: 'travel-logs',
  keySchema: {
    hash: 'id',
  },
  secondaryIndexes: {
    logsByTime: {
      hash: 'userID',
      range: 'publishedAt',
    },
  },
  properties: {
    id: {
      type: String,
      required: true,
      default: () => uuid(),
      validate: {
        notNull: true,
        notEmpty: true,
        isUUID: (value) => isUUID(value, 4),
      },
    },
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    description: {
      type: String,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
      properties: {
        type: Object,
        required: false,
        properties: {
          author: {
            type: String,
            required: false,
          },
          comment: {
            type: String,
            required: false,
          },
          createdAt: {
            type: String,
            default: new Date().toISOString(),
          },
          updatedAt: {
            type: String,
            default: new Date().toISOString(),
          },
        },
      },
    },
    slug: {
      type: String,
      required: false,
      default: () => 'EXAMPLE-SLUG',
    },
    images: {
      type: Array,
      required: false,
      properties: {
        type: Object,
        required: false,
        properties: {
          name: {
            type: String,
            required: false,
          },
          url: {
            type: String,
            required: false,
          },
        },
      },
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    latitude: {
      type: Number,
      required: true,
      default: 0,
    },
    longitude: {
      type: Number,
      required: true,
      default: 0,
    },
    publishedAt: {
      type: String,
      default: new Date().toDateString(),
    },
    status: {
      type: String,
      enum: ['PUBLISHED', 'DRAFT', 'SCHEDULED', 'DELETED', 'PRIVATE'],
      default: 'PUBLISHED',
      required: true,
    },
  },
  hooks: {
    beforeValidate(post, opts) {
      if (post.title && (!post.slug || post.slug === 'EXAMPLE-SLUG')) {
        post.slug = _kebabCase(post.title);
      }
    },
    afterValidate: {
      async isSlugUnique(post, opts) {
        const { id, slug } = post;
        if (slug) {
          // Lookup if this slug has been used before
          const existing = await this.scan({ slug });
          // And if it exists on another post, throw an error
          assert(
            !existing || existing.id !== id,
            400,
            new Error('Expected slug to be unique'),
            { slug }
          );
        }
      },
    },
  },
  options: {
    createdAtTimestamp: true,
    updatedAtTimestamp: true,
  },
});

logs.hooks.on('beforeBulkCreate', (entries) => {
  entries.forEach((post, i) => {
    if (post.title && (!post.slug || post.slug === 'EXAMPLE-SLUG')) {
      entries[i].slug = _kebabCase(post.title);
    }
  });
});

module.exports = logs;
