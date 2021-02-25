export default {
    props: ['info', 'id', 'pin'],
    template: `
          <section class="noteTxt note-card" :style="{background: userColor}">
                <textarea v-if="userTxt" :style="{background: userColor}" name="txt" cols="22" rows="5" @change="changeTxt" v-model="userTxt">{{userTxt}}</textarea>
                <div className="note-icons">
                    <button class="pin-btn" :class="isPinned" @click="togglePin"><img src="../../../../img/pin.png" width="20"/></button>
                    <button class="color-btn"><input class="input-color" type="color" @change="changeColor" v-model="userColor"></button>
                    <button class="trash-btn" @click="removeNote"><img src="../../../../img/trash.png" width="20"/></button>
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