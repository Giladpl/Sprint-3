export default {
    template: `
            <section class="email-filter">
                <input type="text" @input="setFilter" placeholder="Search a mail" v-model="filterBy.bySender">
            </section>`,
    data() {
        return {
            filterBy: {
                bySender: '',
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered',{...this.filterBy});
        }
    }
}