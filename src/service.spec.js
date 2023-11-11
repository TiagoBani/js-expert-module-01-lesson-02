const assert = require('node:assert')

const { createSandbox } = require('sinon')
const sinon = createSandbox()

const Service = require('./service')

const REQUEST_URL_3 = 'planets/3'
const REQUEST_URL_4 = 'planets/4'
const mocks = {
    HOTH: require('./mocks/hoth.json'),
    YAVIN_IV: require('./mocks/yavin_iv.json')
};

(async () => {
    const service = new Service()

    const stub = sinon.stub(service, service._makeRequest.name)
    stub.withArgs(REQUEST_URL_3).resolves(mocks.YAVIN_IV)
    stub.withArgs(REQUEST_URL_4).resolves(mocks.HOTH)

    {
        const expect = {
            name: "Yavin IV",
            population: "1000",
            apperIn: 1,
            gravity: "1 standard",
            surfaceWater: "8"
        }

        const result = await service.getPlanets(3)

        assert.deepStrictEqual(result, expect)
    }

    {
        const expect = {
            name: "Hoth",
            population: "unknown",
            apperIn: 1,
            gravity: "1.1 standard",
            surfaceWater: "100"
        }

        const result = await service.getPlanets(4)

        assert.deepStrictEqual(result, expect)
    }
})()