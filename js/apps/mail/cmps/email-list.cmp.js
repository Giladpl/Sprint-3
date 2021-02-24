import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
    <ul class="email-list clean-list">
        <li v-for="email in emails" :key="email.id" class="email-preview-container" >
            <email-preview :email="email"/>
        </li>
    </ul>
    `,
    components:{
        emailPreview
    }
}