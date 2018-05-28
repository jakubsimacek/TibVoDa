const bus = new Vue()

const TextField = {
    data: function () {
        return {
            count: 0
        }
    },
    methods: {
        increment: function () {
            this.count++ //or this.count += 1
        },
        remove: function() {
            console.log('emit')
            bus.$emit('send', 0)
        }
    },
    template: `<div>
  {{count}}
  <button @click="increment">Increment</button>
  <button @click="remove">Remove</button>
  </div>`
}

const MultiField = {
    data: function () {
        return {
            fields: []
        }
    },
    created: function() {
        bus.$on('send', function (field) {
            console.log(this)
            //const idx = this.fields.indexOf(field)
            //if (idx >= 0)
            this.fields.splice(0)
        })
    },
    methods: {
        add: function () {
            //this.count++ //or this.count += 1
            console.log('add clicked')
            this.fields.push(TextField)
        }
    },
    components: {
      'TextField': TextField
    },
    template: `<ul>
  <li v-for="field in fields"><text-field ></text-field></li>
  <button @click="add">Add</button>
  </ul>`
}

//main instance
const main = new Vue({
    el: "#main",
    components: {
        'MultiField': MultiField
    }
})
