
import { executeQuery } from './db.js';
import { getSeasonsQuery, getSeasonByIdQuery, addSeasonQuery, deleteSeasonQuery, updateSeasonQuery } from './querySeason.js'

export class SeasonService {

    async getSeasons(queryparams) {
        const querySeason = getSeasonsQuery(queryparams);
        const tempResult = await executeQuery(querySeason);
        const result=[]
        for (let i = 0; i < tempResult.length; i++) {
            result[i] = tempResult[i].season;
        }
        //  console.log(result);
        return result;
    }

    async getSeasonById(id) {
        const querySeason = getSeasonByIdQuery();
        const result = await executeQuery(querySeason, [id]);
        // console.log(result)
        return result;
    }

    async addSeason(newSeason) {
        console.log(newSeason)
        const querySeason = addSeasonQuery();
        const result = await executeQuery(querySeason, Object.values(newSeason));
        return result;
    }

    async deleteSeason(id) {
        const querySeason = deleteSeasonQuery();
        await executeQuery(querySeason, [id]);
    }

    async updateSeason(updatedSeason, id) {
        let data = Object.values(updatedSeason);
        data.push(id)
        const querySeason = updateSeasonQuery(Object.keys(updatedSeason));
        await executeQuery(querySeason, data);
    }
}