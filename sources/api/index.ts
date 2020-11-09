import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const app = feathers();
const restClient = rest(BASE_URL);

app.configure(restClient.axios(axios));

export default app;
