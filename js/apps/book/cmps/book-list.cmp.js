import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list clean-list">
        <li v-for="book in books" :key="book.id" class="book-preview-container" >
            <router-link :to="'/book/'+book.id"><book-preview :book="book"/></router-link>
        </li>
    </ul>
    `,
    components:{
        bookPreview
    }
}