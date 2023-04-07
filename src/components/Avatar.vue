<script lang="ts">
    import { defineComponent } from 'vue';
    import avatarImg from '../assets/imagens/avatar.svg'

    export default defineComponent({
        props: {
            imagem: String
        },
        computed: {
            escolherAvatar() : string {
                return this.imagem ? this.imagem : avatarImg
            }
        }
    })
</script>
<template>
    <img :src="escolherAvatar" alt="foto do usuário" class="avatar"/>
</template>