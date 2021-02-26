import { bookService } from '../services/book.service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from '../pages/book-details.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js';

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-add :addOptions="addOptions" @added="addBook"/>
            <book-list :books="booksToShow"/>
        </section>
    `,
    data() {
        return {
            books: null,
            addOptions: null,
            filterBy: null
        }
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        addBook(bookTitle) {
            bookService.getBook(bookTitle)
                .then(books => console.log(books))
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchTitle = this.filterBy.byTitle.toLowerCase();
            return this.books.filter(book => {
                return book.title.toLowerCase().includes(searchTitle) &&
                        book.listPrice.amount >= this.filterBy.byFromPrice && 
                        book.listPrice.amount <= this.filterBy.byToPrice
            })
        }
    },
    created() {
        this.loadBooks();
        bookService.getOptions()
            .then(options => this.addOptions = options)
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
        bookAdd
    }
}