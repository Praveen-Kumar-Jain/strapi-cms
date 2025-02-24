'use strict';

/**
 * presentation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::presentation.presentation', ({ strapi }) => ({
    // Method 1: Creating an entirely new custom service
    async exampleService(...args) {
        let response = { okay: true }

        if (response.okay === false) {
            return { response, error: true }
        }

        return response
    },

    // Method 2: Wrapping a core service (leaves core logic in place)
    async find(...args) {
        // Calling the default core controller
        const { results, pagination } = await super.find(...args);

        // some custom logic
        results.forEach(result => {
            result.counter = 1;
        });

        return { results, pagination };
    },

    // Method 3: Replacing a core service
    async findOne(entityId, params = {}) {
        return strapi.entityService.findOne('api::presentation.presentation', entityId, this.getFetchParams(params));
    }
}));
