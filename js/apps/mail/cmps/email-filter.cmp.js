export default {
	template: `
            <section class="email-filter">
            
            <select @change="selectFilter">
                <option value="">Please select one:</option>
                <option value="true">Opened emails</option>
                <option value="false">Unread emails</option>
            </select>
                <input type="text" @input="setFilter" placeholder="Search an email" v-model="filterBy.txt">
            </section>`,
	data() {
		return {
			filterBy: {
				txt: '',
				isRead: null,
			},
		};
	},
	methods: {
		setFilter() {
        console.log({ ...this.filterBy });
        
			this.$emit('filtered', { ...this.filterBy });
		},
		selectFilter(selectedFilter) {
			this.filterBy.isRead = selectedFilter.target.value;
		},
	},
	computed: {},
};
