export default {
    props: ['txt'],
    template: `
            <section class="book-description">
                <h4>Description: </h4>
                <div v-if="!isAllDescShown">{{getDescription}}</div>
                <div v-else>{{txt}}</div>
                <span class="more-btn" v-if="txt.length>100" @click="toggleDesc">{{moreOrLess}}...</span>
            </section>
    `,
    data() {
        return {
            isAllDescShown: false,
        }
    },
    methods:{
        toggleDesc() {
            this.isAllDescShown = !this.isAllDescShown;
        }
    },
    computed: {
        getDescription() {
            const strToShow = this.txt.length <= 100 ? this.txt : `${this.txt.substr(0, 99)}...`;
            return strToShow;
        },
        moreOrLess() {
            if (this.isAllDescShown) return 'less';
            return 'more';
        }

    }
}