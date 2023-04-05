<script lang="ts">
    import InputPublico from '@/components/inputPublico.vue';
    import {defineComponent} from 'vue'
    import iconeLogin from '../assets/imagens/login.svg'
    import iconeSenha from '../assets/imagens/senha.svg'
    import { LoginServices } from '@/services/LoginServices';

    const loginServices = new LoginServices()

    export default defineComponent({

        setup(){
            return {
                iconeLogin,
                iconeSenha
            }
        },

        data() {
            return {
                login: "",
                senha: "",
                loading: false,
                erro: ""
            };
        },
        methods: {
            
            async efetuarLogin() {

                try{
                    if (!this.login && !this.login.trim() && !this.senha && !this.senha.trim()) {
                        this.erro = "Favor preencher formulário";
                        return;

                    }
                        this.loading = true;
                        await loginServices.login({login: this.login, senha: this.senha})
                } catch (e: any) {
                    console.log(e)
                    if(e?.response?.data?.erro){
                        this.erro = e?.response?.data?.erro
                    }else{
                        this.erro = 'Não foi possível efetuar o login, tente novamente'
                    }
                }
                this.loading = false;
            },
            setLogin(v:any){
                this.login = v
            },

            setSenha(v: any){
                this.senha = v
            }
        },
        computed: {
            buttonText(){
                return this.loading ? 'Carregando...' : 'Login'
            }
        },
        components: { InputPublico }
    });
</script>
<template>
    <div class="container-publico">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo"/>
        <form>
            <p v-if="erro" class="error">{{erro}}</p>

            <InputPublico :icone="iconeLogin" alt="Insira o Login" tipo="text" placeholder="Email" :modelValue="login" @setInput="setLogin"/>

            <InputPublico :icone="iconeSenha" alt="Insira a senha" tipo="password" placeholder="Senha" :modelValue="senha" @setInput="setSenha"/>

            <button @click.enter.prevent="efetuarLogin" :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss"/>