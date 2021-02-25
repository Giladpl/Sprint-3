export default {
      props: ['info', 'id', 'pin'],
      template: `
            <section class="note-img note-card" :style="{background: userColor}">
                  <img class="img-src" :src="imgUrl" width="150"/>
                  <textarea v-if="userTitle" :style="{background: userColor}" name="txt" cols="22" rows="2" @change="changeTitle" v-model="userTitle">{{userTitle}}</textarea>
                  <div className="note-icons">
                        <button class="pin-btn" :class="isPinned" @click="togglePin"><img src="../../../../img/pin.png" width="20"/></button>
                        <button class="color-btn"><input class="input-color" type="color" @change="changeColor" v-model="userColor"></button>
                        <button class="trash-btn" @click="removeNote"><img src="../../../../img/trash.png" width="20"/></button>
                  </div>
            </section>
            `,
      data() {
            return {
                  imgUrl: this.info.url,
                  userColor: this.info.style.backgroundColor,
                  userTitle: this.info.title
            }
      },
      methods: {
            changeColor() {
                this.$emit("setColor", this.userColor, this.id);
            },
            removeNote() {
                this.$emit("remove", this.id);
            },
            changeTitle() {
                  this.$emit("setTitle", this.userTitle, this.id);
            },
            togglePin() {
                this.$emit("togglePin", this.id);
            }
      },
      computed: {
		isPinned() {
			return {isPinned: this.pin};
		},
	}
};
