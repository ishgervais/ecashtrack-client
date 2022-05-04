import axios from 'axios'
import { checkLocalStorage } from 'src/util/customFunction'
import { EbackendEndpoints, EhttpMethod } from '../../../types/enums'
import { base_url } from '../../../util/url'
export class Api {
    private token = checkLocalStorage('token')
    public async connect(
        endpoint: EbackendEndpoints | string,
        method: EhttpMethod,
        body?: any
    ): Promise<any> {
        const url = base_url + endpoint
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.token
        }
        try {
            const request = await axios({
                url,
                method,
                headers,
                data: JSON.stringify(body)
            })

            if (
                request.status.toString().startsWith('4') ||
                request.status.toString().startsWith('5')
            ) {
                // console.error(` error returned by the API: ${request.statusText}`)
                return { status: false, message: request.statusText }
                // throw new Error(request.statusText)
            }
            return request.data
        } catch (e: any) {
            let message = e.response?e.response.data.message:e.message
            // console.log(`There was an error connecting to the API: ${e.message}`)
            return { status: false, message }
        }
    }
}
export const UseApi = new Api()
