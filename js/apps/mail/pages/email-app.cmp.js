import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';


export default {
    template: `
        <section class="email-app">
            <email-filter @filtered="setFilter" />
            <email-list :emails="emailsToShow"/>
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: null
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        
    },
    created() {
        emailList
    },
    components: {
        emailList
    }
}