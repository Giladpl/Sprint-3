export default {
    template: `
        <section class="book-review">
            <form @submit.prevent="saveReview">
                <fieldset class="rating flex-center">
                    <input type="text" placeholder="Enter your full name" v-model="review.fullName">
                    <legend>Please rate:</legend>
                    <input type="date" value ="getDate" v-model="review.datepicker"/>
                    <ul class="review-rate">
                        <li v-for="star in 5" @click="setRate(star)"  class="fa fa-star" :class="{ fill : star <= review.rate }"></li>
                    </ul>
                    <textarea name="comment" cols="30" rows="3"  v-model="review.textarea">Enter text here...</textarea>
                    <button class="save-review-btn">save</button>
                </fieldset>
            </form>
        </section>
    `,
    data() {
        return {
            review: {
                fullName: null,
                rate: 5,
                datepicker: null,
                textarea: ''
            }
        }
    },
    methods:{
        saveReview(){
            if (!this.review.fullName) this.review.fullName = 'Books Reader';
            if (!this.review.datepicker) this.review.datepicker = this.getDate();
            this.$emit('saveReview', this.review);
            this.review = {
                fullName: null,
                rate: 5,
                datepicker: null,
                textarea: ''
            }
        },
        getDate() {
            return new Date().toISOString().substr(0, 10);
        },
        setRate(rate) {
            this.review.rate = rate;
        },
    }
}