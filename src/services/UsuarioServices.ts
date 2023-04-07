import { HttpApiService } from "./HttpApiService"

export class UsuarioServices extends HttpApiService{
    async pesquisar(filtro: String){
        return this.get('/pesquisa?filtro='+ filtro)
    }
}