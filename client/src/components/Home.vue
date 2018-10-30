<template>
    <div class="home">
        <h2>Home</h2>
        <div>{{ greeting }}</div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            greeting: ''
        }
    },
    async created () {
        let res = await this.$axios.get('http://localhost:8888/home')
        this.greeting = res.data.greeting
    }
}
</script>