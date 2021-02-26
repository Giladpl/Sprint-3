export default {
    props: ['addOptions'],
    template: `
            <section class="book-add">
                <form @submit.prevent="addBook">
                    <label>Add a book:</label>
                    <input list="books" placeholder="Enter title of book" v-model="bookTitle">
                    <datalist id="books">
                        <option v-for="addOption in addOptions">{{addOption}}</option>
                    </datalist>
                    <button class="add-book-btn"><img src="../../../../img/add.png" width="15"/></button>
                </form>
            </section>`,
    data() {
        return {
            bookTitle: null
        }
    },
    methods:{
        addBook(){
            this.$emit('added', this.bookTitle);
        }
    }
}