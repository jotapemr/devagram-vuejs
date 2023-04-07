<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';
    import imgCurtir from '../assets/imagens/curtir.svg'
    import imgCurtiu from '../assets/imagens/curtiu.svg'
    import imgComentario from '../assets/imagens/comentario-inativo.svg'
    import imgComentarioAtivo from '../assets/imagens/comentario-ativo.svg'
    import { FeedServices } from '@/services/FeedServices';

    const feedServices = new FeedServices()

    export default defineComponent({
    setup(){
        return{
            loggedUserId : localStorage.getItem(`_id`),
            loggedAvatar : localStorage.getItem(`avatar`) ?? '',
            loggedName : localStorage.getItem(`nome`) ?? '',
        }
    },
    props: {
        post: null
    },

    data(){
        return {
            showComentario : false,
            comentarioMsg : ''
        }
    },

    methods: {

        navegarParaPerfil() {
        },

        async togglCurtir(){
            try{
                await feedServices.togglCurtir(this.post?._id)
                const index = this.post?.likes?.findIndex((e : String) => e === this.loggedUserId)
                if(index != -1){
                    this.post?.likes?.splice(index, 1)
                } else {
                    this.post?.likes?.push(this.loggedUserId)
                }
            }catch(e){
                console.log(e)
            }
        },

        togglComentario(){
            this.showComentario = !this.showComentario
        },
        
        async enviarComentario(){
            try{
                if(!this.comentarioMsg || !this.comentarioMsg.trim()){
                    return;
                }

                await feedServices.enviarComentario(this.post?._id, this.comentarioMsg)

                this.post?.comentarios?.push({
                    usuarioId : this.loggedUserId,
                    nome: this.loggedName,
                    comentario : this.comentarioMsg
                });

                this.comentarioMsg = ''
                this.showComentario = false

            }catch(e){
                console.log(e)
            }
        }
    },
    components: { Avatar },
    computed: {
        obterIconeCurtir(){
            if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) !=-1){
                return imgCurtiu
            }
            return imgCurtir
        },

        obterIconeComentario(){
            return this.showComentario ? imgComentarioAtivo : imgComentario
        }
    }
})
</script>
<template>
    <div class="container-postagem">
        <div @click="navegarParaPerfil">
            <section class="cabecalho">
                <Avatar :imagem="post?.usuario?.avatar"/>
                <strong>{{ post?.usuario?.nome }}</strong>
            </section>
        </div>

        <div class="foto">
            <img :src="post?.foto" alt="Imagem da Publicação"/>
        </div>

        <div class="rodape">
            <div class="acoes">
                <img :scr="obterIconeCurtir" alt="Icone curtir" class="feedIcone" @click="togglCurtir"/>
                <img :src="obterIconeComentario" alt="Icone comentar" class="feedIcone" @click="togglComentario"/>
                <span class="curtidas">
                    Curtido por <strong>{{ post?.likes.length }}</strong> pessoa{{ post?.likes?.length > 1 ? 's' : '' }}
                </span>
            </div>

            <div class="descricao">
                <strong>{{ post?.usuario?.nome }}</strong>
                <p>
                    {{ post?.descricao }}
                </p>
            </div>

            <div class="comentarios">
                <div v-for="(comentario, index) in post?.comentarios"> 
                    <strong>{{ comentario.nome }}</strong>
                    <p>{{ comentario.comentario }}</p>
                </div>
            </div>
        </div>

        <div class="container-comentario" v-if="showComentario">
            <Avatar alt="imagem do usuário" :imagem="loggedAvatar"/>
            <input type="text" v-model="comentarioMsg" placeholder="Adicione um comentário..." @keyup.enter="enviarComentario"/>
            <button type="button" @click="enviarComentario" >Publicar</button>
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/styles/postagem.scss"/>