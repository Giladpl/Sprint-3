export default {
    props:['book'],
    template:`
        <section class="book-preview">
            <h3>{{book.title}}</h3>
            <img :src="imgUrl" width="130"/>
            <p>price: {{currencySymbol}}</p>
        </section>
        `,
    data() {
        return {
            imgUrl: this.book.thumbnail
        }
    },
    computed: {
        currencySymbol() {
            if (this.book.listPrice.currencyCode === 'ILS') return this.book.listPrice.amount + ' ₪';
            else if (this.book.listPrice.currencyCode === 'USD') return '$ ' + this.book.listPrice.amount;
            else if (this.book.listPrice.currencyCode === 'EUR') return '€ ' + this.book.listPrice.amount;
        }
    }
}