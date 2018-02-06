const { request, getID, getData } = require('./utility')

async function customersRoutes(fastify, options) {

  fastify.route({
    method: 'GET',
    url: '/customers',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "phonerNumber",
        "search_value": "*",
        "get_attributes": ["name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'GET',
    url: '/customers/:phoneNumber',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "phoneNumber",
        "search_value": request.params.phoneNumber,
        "get_attributes": ["name", "email", "phoneNumer", "transactionHistory"]
      })

      return payload
    }
  })

  fastify.route({
    method: 'POST',
    url: '/customers/new',
    handler: async (request, reply) => {
      const payload = await request({
        "operation": "insert",
        "schema": "pob",
        "table": "customers",
        "records": [
          {
            "name": request.body.name,
            "email": request.body.email,
            "phoneNumber": request.body.phoneNumber,
            "transactionHistory": []
          }
        ]
      })

      return payload
    }
  })

  fastify.route({
    method: 'POST',
    url: '/customers/update',
    handler: async (request, reply) => {
      const lookUpCustomer = await request({
        "operation": "search_by_value",
        "schema": "pob",
        "table": "customers",
        "hash_attribute": "phoneNumber",
        "search_attribute": "phoneNumber",
        "search_value": request.body.phoneNumber,
        "get_attributes": ["name", "email", "phoneNumer"]
      })

      const updateCustomer = await request({
        "operation": "update",
        "schema": "pob",
        "table": "customers",
        "records": [
          {
            "phoneNumber": request.body.phoneNumber,
            "name": request.body.name,
            "email": request.body.email,
          }
        ]
      })

      return updateCustomer
    }
  })

  fastify.route({
    method: 'POST',
    url: '/customers/delete',
    handler: async (request, reply) => {
      const deleteCustomer = await request({
        "operation": "delete",
        "schema": "pob",
        "table": "customers",
        "hash_records": [request.body.phoneNumber]
      })

      return deleteCustomer
    }
  })
}

module.exports = customersRoutes