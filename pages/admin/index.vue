<template >
    <div>
        <Admin/>
    </div>
</template>
<script>
import Admin from '@/components/admin/admin'
export default {
    components:{
        Admin
    },
     middleware: "isAdmin",
}
</script>
<style lang="">
    
</style>