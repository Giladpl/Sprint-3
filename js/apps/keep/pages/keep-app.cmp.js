import { keepsService } from '../services/keep.service';
import keepPreview from '../cmps/keep-preview.cmp';

export default {
	template: `
        <section class="keeps-app" v-for="keep in keeps">
          <keep-preview/>
        </section>
    `,
	data() {
		return {
			keeps: null,
		};
	},
	methods: {
		loadKeeps() {
			keepsService.query().then((keeps) => (this.keeps = keeps));
		},
	},
	computed: {},
	created() {},
	components: {
		keepPreviews,
	},
};
