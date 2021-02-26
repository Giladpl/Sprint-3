export default {
    template: `
            <section class="book-filter">
                <label>Search a book:</label>   
                <form @submit.prevent="setFilter">
                    <input type="text" placeholder="Search..." v-model="filterBy.byTitle">
                    <input class="price-input" type="number" placeholder="min price" v-model.number="filterBy.byFromPrice">
                    <input class="price-input" type="number" placeholder="max price" v-model.number="filterBy.byToPrice">
                    <button class="search-btn">Search</button>
                </form>
            </section>`,
    data() {
        return {
            filterBy: {
                byTitle: '',
                byFromPrice: -Infinity,
                byToPrice: Infinity
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered',{...this.filterBy});
        }
    }
}