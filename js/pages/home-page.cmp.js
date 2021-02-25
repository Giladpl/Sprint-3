export default {
	template: `
      <section class="home-page">
      <div class="home-container">
            <router-link :to="'/keep'">Keep</router-link> |
            <router-link :to="'/mail'">Mail</router-link>
        </div>
      </section>
  `,
};
