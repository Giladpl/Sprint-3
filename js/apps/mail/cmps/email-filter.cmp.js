export default {
	template: `
            <section class="email-filter">
            
            <select @change="selectFilter">
                <option value="all">All</option>
                <option value="read">Opened emails</option>
                <option value="unread">Unread emails</option>
            </select>
                <input type="text" @input="setFilter" placeholder="Search an email" v-model="filterBy.txt">
            </section>`,
	data() {
		return {
			filterBy: {
				txt: '',
				filterType: 'all',
			},
		};
	},
	methods: {
		setFilter() {
			// console.log({ ...this.filterBy });
			this.$emit('filtered', { ...this.filterBy });
		},
		selectFilter(selectedFilter) {
			this.filterBy.filterType = selectedFilter.target.value;
			this.$emit('filtered', { ...this.filterBy });
			// console.log(this.filterBy.filterType);
		},
	},
	computed: {},
};
