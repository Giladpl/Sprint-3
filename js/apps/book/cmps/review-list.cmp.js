export default {
    props: ['reviews'],
    template: `
    <ul class="review-list clean-list">
        <li v-for="(review, idx) in reviews" class="review-preview" >
            <span>Full name: <h4>{{review.fullName}}</h4></span>
            <p>Date: {{review.datepicker}}</p>
            <p>{{review.textarea}}</p>
            <button class="remove-btn" @click="removeReview(idx)">X</button>
        </li>
    </ul>
    `,
    methods: {
        removeReview(reviewIdx) {
            this.$emit('removeReview', reviewIdx)
        }
    }
}