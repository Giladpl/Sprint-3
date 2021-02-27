export default {
	template: `
    <header class="app-header">
        <div class="main-screen" @click="toggleMenu"></div>
        <div class="main-header">
            <div class="logo-container">
                <img src="../../img/logo.png" width="40" height="60">
                <h1 class="logo">AppSus</h1>
            </div>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/keep">Keep</router-link>
                <router-link to="/mail">Mail</router-link>
                <router-link to="/book">book</router-link>
                <!-- <router-link to="/about">About</router-link> -->
            </nav>
            <button class="menu-btn" @click="toggleMenu">☰</button>
        </div>
    </header>
  `,
    methods: {
        toggleMenu() {
            // document.body.classList.toggle('menu-open');
            this.$emit('toggleMenu', 'menu-open');
        }
    },
};
