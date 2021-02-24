export default {
    props: ['info'],
    template: `
          <section class="noteTodos">
                <p>{{info.label}}</p>
          </section>
          `,
    created() {
        
    }
};