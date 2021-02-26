import { bookService } from '../services/book.service.js';
import { eventBus } from '../../../services/event-bus.service.js';
import bookDescription from '../cmps/book-description.cmp.js';
import bookReview from '../cmps/book-review.cmp.js';
import reviewList from '../cmps/review-list.cmp.js';

export default {
    template:`
        <section v-if="book" class="book-details">
            <h2>{{book.title}}</h2>
            <img :src="imgUrl" width="130"/>
            <p class="book-detail">{{book.subtitle}}</p>
            <div class="book-detail">
                <h4>By: </h4>
                <ul v-for="author in bookAuthors" class="clean-list">
                    <li>{{author}}</li>
                </ul>
            </div>
            <div class="book-detail"><h4>Published date:  </h4>{{book.publishedDate}} {{yearsDiff}}</div>
            <div class="book-detail"><h4>Language: </h4>{{formattedLang}}</div>
            <book-description :txt="book.description"  />
            <div class="book-detail"><h4>Page count: </h4>{{book.pageCount}} - {{readingLength}}</div>
            <div class="book-detail" :class="priceColor"><h4>Price: </h4>{{currencySymbol}}</div>
            <div class="book-detail" v-if="isOnSale">
                <p class="sale">SALE!</p>
            </div>
            <book-review @saveReview="saveReview" />
            <review-list :reviews="book.reviews" @removeReview="removeReview"/>
            <router-link class="prev-page-btn" :to="prevBookLink">Previous Book</router-link>
            <router-link class="next-page-btn" :to="nextBookLink">Next Book</router-link>
            <div class="close-div">
                <router-link to="/book" class="close-btn">Close</router-link>
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            imgUrl: null,
            bookAuthors: null,
            isOnSale: null,
            nextBookId: null,
            prevBookId: null
        }
    },
    methods: {
        loadBook() {
            const id = this.$route.params.bookId
            bookService.getById(id)
                .then(book =>  {
                    this.book = book
                    this.imgUrl = this.book.thumbnail,
                    this.bookAuthors = this.book.authors,
                    this.isOnSale = this.book.listPrice.isOnSale
                })
        },
        removeReview(reviewIdx) {
            this.book.reviews.splice(reviewIdx, 1);
            bookService.put(this.book)
                .then(()=>{
                    const msg = {
                        txt: `You removed a review from ${this.book.id} book`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg',msg);
                })
                .catch(() => {
                    this.loadBook();
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg',msg);
                })
        },
        saveReview(review) {
            this.book.reviews.push(review);
            bookService.saveBook(this.book)
                .then(() => {
                    const msg = {
                        txt: `You add a review to ${this.book.id} book`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg',msg);
                })
                .catch(() => {
                    this.loadBook();
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg',msg);
                })
        }
    },
    computed: {
        currencySymbol() {
            if (this.book.listPrice.currencyCode === 'ILS') return this.book.listPrice.amount + ' ₪';
            else if (this.book.listPrice.currencyCode === 'USD') return '$ ' + this.book.listPrice.amount;
            else if (this.book.listPrice.currencyCode === 'EUR') return '€ ' + this.book.listPrice.amount;
        },
        readingLength() {
            if (this.book.pageCount > 500) return 'Long Reading';
            else if (this.book.pageCount > 200) return 'Decent Reading';
            else if (this.book.pageCount < 100) return 'Light Reading';
        },
        yearsDiff() {
            const diff = new Date().getFullYear() - this.book.publishedDate
            if (diff > 10) return 'Veteran Book';
            else if (diff < 1) return 'New!';
        },
        priceColor() {
            return {highPrice: this.book.listPrice.amount > 150, lowPrice: this.book.listPrice.amount < 20}
        },
        formattedLang(){
            const lang = this.book.language;
            switch (lang){
                case 'en':
                    return 'english';
                case 'he':
                    return 'hebrew';
                case 'sp':
                    return 'spanish';
            }
        },
        nextBookLink() {
            this.nextBookId = bookService.getNextBookId(this.book.id);
            return '/book/' + this.nextBookId;
        },
        prevBookLink() {
            this.prevBookId = bookService.getPrevBookId(this.book.id);
            return '/book/' + this.prevBookId;
        }
    },
    created() {
        this.loadBook();
    },
    watch: {
        '$route.params.bookId'() {
            this.loadBook();
        }
    },
    components:{
        bookDescription,
        bookReview,
        reviewList
    }
}