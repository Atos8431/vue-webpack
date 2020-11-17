<template>
    <div id="test">{{text}}</div>
</template>

<script>
export default {
    data(){
        return {
            text: "test",
        }
    },
}
</script>

<style scoped>
#test{
    color: red;
}
</style>