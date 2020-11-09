import { normalize } from 'normalizr';

export default function constructResponsePayload(response: any, schema: any) {
  let payload = response;

  if (schema) {
    payload = {
      ...normalize(response, schema),
      entity: (schema[0] || schema).key,
      normalized: true,
    };
  }

  return payload;
}
