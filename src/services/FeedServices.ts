import { useAccessTokenStore } from '../stores/accessToken';
import { HttpApiService } from "./HttpApiService"

export class FeedServices extends HttpApiService{
    async getFeedPrincipal(){
        return await this.get('/feed');
    }

    async getFeedPorId(id: String){
        return await this.get('/feed?id='+id);
    }

    async togglCurtir(id: String){
        return this.put(`/like?id=${id}`)
    }
}