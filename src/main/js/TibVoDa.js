//const bus = new Vue()

const TextInput = {
    /*data: function () {
        return {
            count: 0
        }
    },*/
    props: [ "input" ],
    methods: {
        clone: function() {
            const inputs = this.$parent.inputs
            const idx = inputs.indexOf(this.input)
            if (idx >= 0)
                inputs.splice(idx+1, 0, {
                    id: Date.now(),
                    operator: this.input.operator,
                    textInput: TextInput,
                    text: this.input.text,
                    name: 'bwinstanceid'
                })
            else
                console.log("Cannot clone an input")
        },
        remove: function() {
            const inputs = this.$parent.inputs
            const idx = inputs.indexOf(this.input)
            if (idx >= 0)
                inputs.splice(idx, 1)
            else
                console.log("Cannot remove an input")
        }
    },
    template: `
    <div>
        <span>
            <label :for="input.id + '_equal'">
                = ...
                <input type="radio" value="equal" :name="input.id + '_operator'" v-model="input.operator">
            </label>
            <label :for="input.id + '_like'">
                like ...
                <input type="radio" value="like" :name="input.id + '_operator'" v-model="input.operator">
            </label>
            <label :for="input.id + '_likepct'">
                like ...%
                <input type="radio" value="likepct" :name="input.id + '_operator'" v-model="input.operator">
            </label>
            <label :for="input.id + '_input'">
                {{ input.name }}:
                <input type="text" :name="input.id + '_input'" v-model="input.text">
            </label>
        </span>
        <button @click="clone">Clone</button>
        <button @click="remove">Remove</button>
    </div>`
}

const MultiInput = {
    /*data: function () {
        return {
            inputs: []
        }
    },*/
    props: [ "inputs" ],
 /*   created: function() {
        bus.$on('send', function (field) {
            console.log(this)
            //const idx = this.inputs.indexOf(field)
            //if (idx >= 0)
            this.inputs.splice(0)
        })
    }, */
    methods: {
        add: function () {
            //this.count++ //or this.count += 1
            //console.log('add clicked')
            this.inputs.push({
                id: Date.now(),
                operator: 'equal',
                textInput: TextInput,
                text: '',
                name: 'bwinstanceid'
            })
        }
    },
    components: {
      'TextInput': TextInput
    },
    template: `
    <div>
        <button @click="add">Add</button>
        <ul>
            <li v-for="input in inputs" :key="input.id">
                <text-input :input="input" ></text-input>
            </li>
        </ul>
    </div>`
}

const FieldPanel = {
    props: [ "panelData" ],
    components: {
        'MultiInput': MultiInput
    },
    methods: {
        add: function () {

        }
    },
    template: `
    <div>
        <span>
            <button @click="add">Add OR</button>
            <input type="checkbox" :id="panelData.multiBwInstanceId.id" v-model="panelData.multiBwInstanceId.enabled">
            <input type="checkbox" :id="panelData.multiOrderId.id" v-model="panelData.multiOrderId.enabled">
            <input type="checkbox" :id="panelData.multiEngineName.id" v-model="panelData.multiEngineName.enabled">
        </span>
        <ul>
            <li v-if="panelData.multiBwInstanceId.enabled" :key="panelData.multiBwInstanceId.id">
                <multi-input :input="panelData.multiBwInstanceId.inputs" ></multi-input>
            </li>
            <li v-if="panelData.multiOrderId.enabled" :key="panelData.multiOrderId.id">
                <multi-input :input="panelData.multiOrderId.inputs" ></multi-input>
            </li>
            <li v-if="panelData.multiEngineName.enabled" :key="panelData.multiEngineName.id">
                <multi-input :input="panelData.multiEngineName.inputs" ></multi-input>
            </li>
        </ul>
    </div>`
}

const BwLogPanel = {
    /*data: function () {
        return {
            count: 0
        }
    },*/
    //props: [ "field" ],
    methods: {
        submit: function() {
            const inputs = this.$parent.inputs
            this.$parent.result = inputs.map(f => f.text).join(',')
        }
    },
    template: `
    <div>
        <span>
            <label for="bwlog_panel_button">
                <input type="submit" name="bwlog_panel_button" @click="submit">
            </label>
        </span>
    </div>`
}
//main instance
const main = new Vue({
    el: "#main",
    data: {
        panelData: {
            multiBwInstanceId: {
                enabled: false,
                id: "multiBwInstanceId" + Date.now(),
                inputs: []
            },
            multiOrderId: {
                enabled: false,
                id: "multiOrderId" + Date.now(),
                inputs: []
            },
            multiEngineName: {
                enabled: false,
                id: "multiEngineName" + Date.now(),
                inputs: []
            }
        },
        result: ''
    },
    components: {
        'FieldPanel': FieldPanel,
        'BwLogPanel': BwLogPanel
    }
})

