export default {
    template: `
            <section class="keep-add">
                <div class="btn-container">
                    <button class="txt-btn" @click="onTxt"><img src="../../../../img/txt.png" width="35"/></button>
                    <button class="list-btn" @click="onTodos"><img src="../../../../img/list.png" width="35"/></button>
                    <button class="img-btn" @click="onImg"><img src="../../../../img/picture.png" width="35"/></button>
                    <button class="vid-btn" @click="onVid"><img src="../../../../img/video.png" width="35"/></button>
                </div>
                <form @submit.prevent="addKeep">
                    <input class="add-keep-input" list="books" :placeholder="placeholderTxt" v-model="userAdd.userInput">
                    <button class="add-btn"><img src="../../../../img/add.png" width="15"/></button>
                </form>
            </section>`,
    data() {
        return {
            userAdd : {
                userInput: null,
                typeInput: 'noteTxt'
            }
        }
    },
    methods:{
        addKeep() {
            this.$emit('added', this.userAdd);
            this.userAdd = {
                userInput: null,
                typeInput: 'noteTxt'
            }
        },
        onTxt() {
            this.userAdd.typeInput = 'noteTxt';
        },
        onTodos() {
            this.userAdd.typeInput = 'noteTodos';
        },
        onImg() {
            this.userAdd.typeInput = 'noteImg';
        },
        onVid() {
            this.userAdd.typeInput = 'noteVid';
        }
    },
    computed: {
        placeholderTxt() {
            if (this.userAdd.typeInput === 'noteTxt') return 'Enter a text note';
            else if (this.userAdd.typeInput === 'noteTodos') return 'Enter a todos (todo, todo,..)';
            else if (this.userAdd.typeInput === 'noteImg') return 'Enter a url img';
            else if (this.userAdd.typeInput === 'noteVid') return 'Enter a url video';
        } 
    }
}