export default {
	template: ` <section class="email-filter"><input type="text" @input="setFilter" placeholder="Search an email"
		v-model="filterBy.txt"><select @change="selectFilter">
		<option value="all">All</option>
		<option value="read">Opened emails</option>
		<option value="unread">Unread emails</option>
	</select></section>`,
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
			this.$emit('filtered', {
				...this.filterBy,
			});
		},

		selectFilter(selectedFilter) {
			this.filterBy.filterType = selectedFilter.target.value;

			this.$emit('filtered', {
				...this.filterBy,
			});
		},
	},
};
