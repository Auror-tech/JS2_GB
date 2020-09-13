Vue.component ('search',{
    props: ['currentInput'],
    template: `
        <input 
        type="text"
        v-bind:value="this.currentInput"
        v-on:input="$emit('input', $event.target.value)"
        >
    `,
    methods: {
        onClickHandler(){
            console.log('hhh');
        }
    },
})
Vue.component('blog-post', {
    props: ['currentInput'],
    template: '<h3>{{ currentInput }}</h3>'
  })
new Vue ({
    el: '#app',
    data: {
        currentInput: 'search...'
    },
    methods: {
        // onClickHandler () {
        //     console.log('h');
        // }
    }
})