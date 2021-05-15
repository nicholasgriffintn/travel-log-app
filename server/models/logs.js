const _kebabCase = require('lodash/kebabCase');
const assert = require('http-assert');
const dynazord = require('dynazord');
const isUUID = require('validator/lib/isUUID');
const { v4: uuid } = require('uuid');

const logs = dynazord.createModel({
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
    },
    comments: {
      type: Array,
      required: false,
      properties: {
        type: Object,
        required: true,
        properties: {
          author: {
            type: String,
            validate: {
              notEmpty: true,
            },
          },
          comment: {
            type: String,
            validate: {
              notEmpty: true,
            },
          },
          createdAt: {
            type: Date,
            format: Number,
            validate: {
              isBefore: '2099-12-31T23:59:59.00Z',
              isAfter: '2000-01-01T00:00:00.00Z',
            },
          },
          updatedAt: {
            type: Date,
            format: Number,
            validate: {
              isBefore: '2099-12-31T23:59:59.00Z',
              isAfter: '2000-01-01T00:00:00.00Z',
            },
          },
        },
        validate: {
          notEmpty: true,
        },
      },
    },
    slug: {
      type: String,
      required: true,
      default: () => 'EXAMPLE-SLUG',
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    images: {
      type: Array,
      required: true,
      properties: {
        type: Object,
        required: true,
        properties: {
          name: {
            type: String,
            validate: {
              notEmpty: true,
            },
          },
          url: {
            type: String,
            validate: {
              notEmpty: true,
            },
          },
        },
        validate: {
          notEmpty: true,
        },
      },
      validate: {
        notEmpty: true,
      },
    },
    rating: {
      type: Number,
      default: 0,
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      format: Number,
      validate: {
        isBefore: '2099-12-31T23:59:59.00Z',
        isAfter: '2000-01-01T00:00:00.00Z',
      },
    },
    status: {
      type: String,
      enum: ['PUBLISHED', 'DRAFT', 'SCHEDULED', 'DELETED'],
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
