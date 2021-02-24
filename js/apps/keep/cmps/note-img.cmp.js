export default {
      props: ['info', 'id'],
      template: `
            <section class="noteImg note-card" :style="{background: userColor}">
                  <img :src="imgUrl" width="150"/>
                  <textarea v-if="userTitle" :style="{background: userColor}" name="txt" cols="22" rows="1" @change="changeTitle" v-model="userTitle">{{userTitle}}</textarea>
                  <div className="note-icons">
                        <button>pin or not</button>
                        <button><input type="color" @change="changeColor" v-model="userColor"></button>
                        <button @click="removeNote">remove</button>
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
      }
};
