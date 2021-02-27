import { myRouter } from './routes.js';
import appHeader from './cmps/app-header.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

const options = {
	el: '#app',
	router: myRouter,
	template: `
        <section :class="menuClass">
            <user-msg />
            <app-header @toggleMenu="toggleMenu"/>
            <router-view />
            <footer><p> &copy; Coffeerights 2021</p></footer>
        </section>
    `,
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        toggleMenu() {
            this.isActive = !this.isActive;
        }
    },
    computed: {
		menuClass() {
			return {
				'menu-open': this.isActive,
			};
		},
	},
	components: {
		appHeader,
		userMsg,
	},
};

const app = new Vue(options);
