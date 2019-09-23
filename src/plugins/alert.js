import Vue from 'vue'

class AlertMessage {
    constructor(text, color) {
        this.text = text;
        this.color = color;
    }
}

let alert = {
    install (Vue, options) {

        Vue.prototype.$alert = new Vue({
            data: {
                stack: []
            },
            methods: {
                success(text) {
                    this.stack.push(new AlertMessage(text, 'green lighten-2'));
                    this.clear()
                },

                info(text) {
                    this.stack.push(new AlertMessage(text, 'blue lighten-2'));
                    this.clear()
                },

                warning(text) {
                    this.stack.push(new AlertMessage(text, 'orange lighten-2'));
                    this.clear()
                },

                error(text) {
                    this.stack.push(new AlertMessage(text, 'red lighten-2'));
                    this.clear()
                },

                clear() {
                    let alert = this;
                    setTimeout(function () {
                        alert.stack.pop()
                    }, 2000)
                }
            }
        })

    }
};

Vue.use(alert);

export default Vue.prototype.$alert;

