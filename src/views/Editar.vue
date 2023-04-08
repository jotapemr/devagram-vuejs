<script lang="ts">
    import { defineComponent, onMounted } from 'vue';
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue';
    import router from '@/router';
    import { UsuarioServices } from '@/services/UsuarioServices';
import HeaderAcoes from '@/components/HeaderAcoes.vue';
 
    const usuarioServices = new UsuarioServices()

    export default defineComponent({
        components: { Header, Footer, HeaderAcoes },
        data(){
            return{
 
            }
        },
        

})
</script>


<template>
    <Header :hide="true" />
    <HeaderAcoes :showLeft="false" :showRight="true" :isRightIcon="true" title="Editar Perfil"/>
    <Footer />
</template>