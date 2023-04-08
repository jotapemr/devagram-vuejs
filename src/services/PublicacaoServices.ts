import { HttpApiService } from "./HttpApiService"

export class PublicacaoServices extends HttpApiService{
    async publicar(body: any){
        await this.post('/publicacao', body);
    }
}