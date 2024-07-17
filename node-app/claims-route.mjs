import { getAll, getOne } from './claims-data.mjs';

async function claimsRoute (fastify, options) {
  fastify.get('/api/db/claims', async (request, reply) => {
    return await getAll();
  });

  fastify.get('/api/db/claims/:id', async (request, reply) => {
    return await getOne(request.params.id);
  });
}

export default claimsRoute;