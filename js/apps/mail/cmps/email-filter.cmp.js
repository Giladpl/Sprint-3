export default {
	template: `
            <section class="email-filter">
<<<<<<< HEAD
                <input type="text" @input="setFilter" placeholder="Search an email" v-model="filterBy.txt">
				<select @change="selectFilter">
					<option value="all">All</option>
					<option value="read">Opened emails</option>
					<option value="unread">Unread emails</option>
				</select>
=======
            
            <select class="filter-select" @change="selectFilter">
                <option value="all">All</option>
                <option value="read">Opened emails</option>
                <option value="unread">Unread emails</option>
            </select>
                <input  class="input-search"type="text" @input="setFilter" placeholder="Search an email" v-model="filterBy.txt">
>>>>>>> 562b8bc9f57c30316948aab1b1ea03ab617e595c
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
