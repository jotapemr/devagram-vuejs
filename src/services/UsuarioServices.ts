import { HttpApiService } from "./HttpApiService"

export class UsuarioServices extends HttpApiService{
    async pesquisar(filtro: String){
        return this.get('/pesquisa?filtro='+ filtro)
    }

    async buscarDadosPorId(id?: String){
        if(id){
            return await this.get('/pesquisa?id=' + id)
        }
        return await this.get('/usuario')
    }

    async togglFollow(id: String){
        return await this.put('/seguir?id='+id)
    }

    async atualizar(body: any){
        await this.put('/usuario', body)
    }
}