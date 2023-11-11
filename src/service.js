const BASE_URL = 'https://swapi.dev/api/'
class Service {

    /**
     * @param {string} url
     * @returns {Promise<Object>} 
    */
    async _makeRequest(url) {
        console.log()
        const response = await fetch(`${BASE_URL}${url}`)
        return response.json()
    }

    /**
     * @param {number} id
     * @returns {Promise< { "name": string, "apperIn": number, "population": string, "gravity": string, "surfaceWater": string }>} 
    */
    async getPlanets(id) {
        const { name, films, population, gravity, surface_water: surfaceWater } = await this._makeRequest(`planets/${id}`)
        return { name, apperIn: films.length, population, gravity, surfaceWater }
    }
}

module.exports = Service
