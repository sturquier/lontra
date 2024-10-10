import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createBaseQuery = fetchBaseQuery({
  baseUrl: '/api'
});