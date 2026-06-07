// Định nghĩa các kiểu trường dịch thuật đa ngôn ngữ ở cấp độ trường (Field-level localization)
// theo đúng tài liệu đặc tả 22-sanity-schema.md và 43-sanity-localization-strategy.md

export const localeString = {
  title: 'Localized String',
  name: 'localeString',
  type: 'object',
  fields: [
    {
      title: 'Tiếng Việt (Mặc định)',
      name: 'vi',
      type: 'string',
    },
    {
      title: 'Tiếng Anh (English)',
      name: 'en',
      type: 'string',
    },
  ],
};

export const localeText = {
  title: 'Localized Text',
  name: 'localeText',
  type: 'object',
  fields: [
    {
      title: 'Tiếng Việt (Mặc định)',
      name: 'vi',
      type: 'text',
      rows: 5,
    },
    {
      title: 'Tiếng Anh (English)',
      name: 'en',
      type: 'text',
      rows: 5,
    },
  ],
};

export const localePortableText = {
  title: 'Localized Portable Text',
  name: 'localePortableText',
  type: 'object',
  fields: [
    {
      title: 'Tiếng Việt (Mặc định)',
      name: 'vi',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      title: 'Tiếng Anh (English)',
      name: 'en',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
