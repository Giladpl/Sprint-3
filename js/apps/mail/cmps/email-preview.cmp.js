export default {
    props:['email'],
    template:`
        <section class="email-preview">
            <h4>{{email.sender}}</h4>
            <p>{{email.subject}}</p>
            <p>{{email.sentAt}}</p>
        </section>
        `,
}