export default {
	template: `
 <header class="app-header">
     <div class="logo-container">
         <img src="img/logo.svg" width="50">
         <h1 class="logo">AppSus</h1>
     </div>
      <nav>
          <router-link to="/">Home</router-link>
          <!-- <router-link to="/about">About</router-link> -->
          <router-link to="/keep">Keep</router-link>
          <router-link to="/mail">Mail</router-link>
      </nav>
  </header>
  `,
};
