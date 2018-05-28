//const bus = new Vue()

const TextField = {
    data: function () {
        return {
            count: 0
        }
    },
    props: [ "field" ],
    methods: {
        increment: function () {
            this.count++ //or this.count += 1
        },
        clone: function() {
            const fields = this.$parent.fields
            const idx = fields.indexOf(this.field)
            fields.splice(idx+1, 0, {
                id: Date.now(),
                operator: this.field.operator,
                textField: TextField,
                input: this.field.input,
                name: 'bwinstanceid'
            })
        },
        remove: function() {
            //console.log('emit')
//            bus.$emit('send', 0)
            const fields = this.$parent.fields
            const idx = fields.indexOf(this.field)
            console.log('removing from index ' + idx)
            if (idx >= 0)
                fields.splice(idx, 1)
            else
                console.log("Cannot remove a field")
        }
    },
    template: `
    <div>
        {{count}} id: {{field.id}} Value: {{ field.operator }} | 
        <button @click="increment">Increment</button>
  <!--label class="switch switch-slide">
	<input class="switch-input" type="checkbox" />
	<span class="switch-label" data-on="Yes" data-off="No"></span> 
	<span class="switch-handle"></span>
  </label-->
        <span>
            <label :for="field.id + '_equal'">
                = ...
                <input type="radio" value="equal" :name="field.id + '_operator'" v-model="field.operator">
            </label>
            <label :for="field.id + '_like'">
                like ...
                <input type="radio" value="like" :name="field.id + '_operator'" v-model="field.operator">
            </label>
            <label :for="field.id + '_likepct'">
                like ...%
                <input type="radio" value="likepct" :name="field.id + '_operator'" v-model="field.operator">
            </label>
            <label :for="field.id + '_input'">
                {{ field.name }}:
                <input type="text" :name="field.id + '_input'" v-model="field.input">
            </label>
        </span>
        <button @click="clone">Clone</button>
        <button @click="remove">Remove</button>
    </div>`
}

const MultiField = {
    data: function () {
        return {
            fields: []
        }
    },
 /*   created: function() {
        bus.$on('send', function (field) {
            console.log(this)
            //const idx = this.fields.indexOf(field)
            //if (idx >= 0)
            this.fields.splice(0)
        })
    }, */
    methods: {
        add: function () {
            //this.count++ //or this.count += 1
            //console.log('add clicked')
            this.fields.push({
                id: Date.now(),
                operator: 'equal',
                textField: TextField,
                input: '',
                name: 'bwinstanceid'
            })
        }
    },
    components: {
      'TextField': TextField
    },
    template: `
    <div>
        <button @click="add">Add</button>
        <ul>
            <li v-for="field in fields" :key="field.id">
                <text-field :field="field" ></text-field>
            </li>
        </ul>
    </div>`
}

//main instance
const main = new Vue({
    el: "#main",
    components: {
        'MultiField': MultiField
    }
})

