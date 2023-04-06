import { HttpApiService } from "./HttpApiService"

export class CadastroServices extends HttpApiService{
    async cadastrar(body: any){
        await this.post('/cadastro', body);
    }
}