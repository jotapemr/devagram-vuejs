<script lang="ts">
    import InputPublico from '@/components/inputPublico.vue';
    import {defineComponent} from 'vue'
    import iconeLogin from '../assets/imagens/login.svg'
    import iconeSenha from '../assets/imagens/senha.svg'
    import iconeUsuario from '../assets/imagens/usuario.svg'
    import iconeAvatar from '../assets/imagens/avatar.svg'
    import ImputImagem from '../components/InputImagem.vue';
    import {CadastroServices} from '../services/CadastroServices'
    import router from '../router';

    const cadastroServices = new CadastroServices()

    export default defineComponent({

        setup(){
            return {
                iconeLogin,
                iconeSenha,
                iconeUsuario,
                iconeAvatar,
                cadastroServices
            }
        },

        data() {
            return {
                nome: "",
                email: "",
                senha: "",
                confirmacao: "",
                loading: false,
                erro: "",
                imagem: {} as any
            };
        },
        methods: {
            
            async cadastrar() {

                try{
                    /*
                    this.erro = ""
                    if(!this.nome || !this.nome.trim() ||
                    !this.email || !this.email.trim() || 
                    !this.senha || !this.senha.trim() ||
                    !this.confirmacao || this.confirmacao.trim()){
                        return this.erro = "Favor preencher todos os formulários"
                    }
                    */

                    if(this.senha !== this.confirmacao){
                        return this.erro = "Senha e confirmação não coincidem"
                    }

                    this.loading = true

                    const formDataRequisicao = new FormData()

                    formDataRequisicao.append('nome', this.nome)
                    formDataRequisicao.append('email', this.email)
                    formDataRequisicao.append('senha', this.senha)

                    if(this.imagem.aquivo){
                        formDataRequisicao.append('file', this.imagem.aquivo)
                    }

                    await cadastroServices.cadastrar(formDataRequisicao)
                    router.push({name: 'login', query: {cadastroComSucesso: 'true'}})


                } catch (e: any) {
                    console.log(e)
                    if(e?.response?.data?.erro){
                        this.erro = e?.response?.data?.erro
                    }else{
                        this.erro = 'Não foi possível cadastrar o usuário, tente novamente'
                    }
                }
                this.loading = false;
            },

            setNome(v:any){
                this.nome = v
            },
            setEmail(v:any){
                this.email = v
            },
            setSenha(v: any){
                this.senha = v
            },
            setConfirmacao(v: any){
                this.confirmacao = v
            },
            setImagem(v: any){
                this.imagem = v
            }
        },
        computed: {
            buttonText(){
                return this.loading ? 'Carregando...' : 'Cadastrar'
            }
        },
        components: { InputPublico, ImputImagem }
    });
</script>
<template>
    <div :class="['container-publico', 'cadastro', ]">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo"/>
        <form>
            <ImputImagem :imagem="imagem" alt="Imagem do usuário" @setImagem="setImagem"/>
            <p v-if="erro" class="error">{{erro}}</p>

            <InputPublico :icone="iconeUsuario" alt="Insira o nome do usuário" tipo="text" placeholder="Nome Completo" :modelValue="nome" @setInput="setNome"/>

            <InputPublico :icone="iconeLogin" alt="Insira o E-mail" tipo="text" placeholder="Email" :modelValue="email" @setInput="setEmail"/>

            <InputPublico :icone="iconeSenha" alt="Insira a senha" tipo="password" placeholder="Senha" :modelValue="senha" @setInput="setSenha"/>

            <InputPublico :icone="iconeSenha" alt="Confirme a senha" tipo="password" placeholder="Senha" :modelValue="confirmacao" @setInput="setConfirmacao"/>

            <button @click.enter.prevent="cadastrar" :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink :to="{name: 'login'}">Faça seu login agora!</RouterLink>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss"/>
