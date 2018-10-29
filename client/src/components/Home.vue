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
        let res = await axios.get('http://13.209.8.64:3333/home')
        this.greeting = res.data.greeting
    }
}
</script>