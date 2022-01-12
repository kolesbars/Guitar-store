export type SortParamsType = {
  '_sort'?: string,
  '_order'?: string,
};

export type FilterParamsType = {
  'type'?: string[],
  'stringCount'?: string[],
  'price_gte'?: string,
  'price_lte'?: string,
};

export type SearchFormParamsType = {
  'name_like'?: string,
};
