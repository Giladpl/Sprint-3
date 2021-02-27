export default {
    template: `
            <section class="keep-filter">
                <input type="text" @input="setFilter" placeholder="Search a note" v-model="filterBy.txt">
                <select @change="selectFilter">
                    <option value="all">All</option>
                    <option value="txt">text</option>
                    <option value="img">image</option>
                    <option value="vid">video</option>
                    <option value="todos">todos</option>
                </select>
            </section>`,
    data() {
        return {
            filterBy: {
				txt: '',
				filterType: 'all',
			},
        }
    },
    methods:{
        setFilter() {
			this.$emit('filtered', { ...this.filterBy });
		},
		selectFilter(selectedFilter) {
			this.filterBy.filterType = selectedFilter.target.value;
			this.$emit('filtered', { ...this.filterBy });
		},
    }
}