export default {
    props: ['info', 'id'],
    template: `
          <section class="noteTxt" :style="{background: userColor}">
                <textarea v-if="userTxt" :style="{background: userColor}" name="txt" cols="22" rows="3" @change="changeTxt" v-model="userTxt">{{userTxt}}</textarea>
                <div className="note-icons">
                <button>pin or not</button>
                <button><input type="color" @change="changeColor" v-model="userColor"></button>
                <button @click="removeNote">remove</button>
                </div>
          </section>
          `,
    data() {
        return {     
            userColor: this.info.style.backgroundColor,
            userTxt: this.info.txt
        }       
    },
    methods: {
        changeTxt() {
            this.$emit("setTxt", this.userTxt, this.id);
        },
        changeColor() {
            this.$emit("setColor", this.userColor, this.id);
        },
        removeNote() {
            this.$emit("remove", this.id);
        }
      },
    created() {
        
    }
};