Vue.component ('search',{
    template: `
        <input 
        type="text"
        v-model = "currentInput"
        
        >
    `,
    data() {
        return {
            currentInput: 'search...'
        }
    },
    watch: {
        currentInput() {
            console.log(this.currentInput);
            this.$emit('inputed', this.currentInput);
        }
    },
    
})
new Vue ({
    el: '.app',
    data: {
        currentInput: 'search'
    },
    methods: {
        kek2 (data) {
            console.log('kek2');
            this.currentInput = data;
        }
    }
})