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
            const _multiInputs = this.$parent.multiInputs
            const _input = this.input
            const _idx = _multiInputs.inputs.indexOf(_input)
            if (_idx >= 0)
                _multiInputs.inputs.splice(_idx+1, 0, {
                    id: Date.now(),
                    operator: _input.operator,
                    textInput: TextInput,
                    text: _input.text,
                    name: _input.name,
                    label: _input.label
                })
            else
                console.log("Cannot clone an input")
        },
        remove: function() {
            const _multiInputs = this.$parent.multiInputs
            const _input = this.input
            const _idx = _multiInputs.inputs.indexOf(_input)
            if (_idx >= 0)
                _multiInputs.inputs.splice(_idx, 1)
            else
                console.log("Cannot remove an input")
        }
    },
    template: `
    <div>
        <span>
            {{ input.label }}
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
    props: [ "multiInputs" ],
    methods: {
        add: function () {
            //this.count++ //or this.count += 1
            //console.log('add clicked')
            const _multi = this.multiInputs
            _multi.inputs.push({
                id: Date.now(),
                operator: 'equal',
                textInput: TextInput,
                text: '',
                name: _multi.name,
                label: _multi.label
            })
        }
    },
    components: {
      'TextInput': TextInput
    },
    template: `
    <div>
        <button @click="add">Add {{ multiInputs.label }}</button>
        <ul>
            <li v-for="input in multiInputs.inputs" :key="input.id">
                <text-input :input="input" ></text-input>
            </li>
        </ul>
    </div>`
}

const BwFieldPanel = {
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
            <label :for="panelData.multiBwInstanceId.id">
                <input type="checkbox" :name="panelData.multiBwInstanceId.id" v-model="panelData.multiBwInstanceId.enabled">
                Bw Instance Id
            </label>
            <label :for="panelData.multiOrderId.id">
                <input type="checkbox" :id="panelData.multiOrderId.id" v-model="panelData.multiOrderId.enabled">
                Order Id
            </label>
            <label :for="panelData.multiEngineName.id">
                <input type="checkbox" :id="panelData.multiEngineName.id" v-model="panelData.multiEngineName.enabled">
                Engine name
            </label>
        </span>
        <ul>
            <li v-if="panelData.multiBwInstanceId.enabled" :key="panelData.multiBwInstanceId.id">
                <multi-input :multi-inputs="panelData.multiBwInstanceId" ></multi-input>
            </li>
            <li v-if="panelData.multiOrderId.enabled" :key="panelData.multiOrderId.id">
                <multi-input :multi-inputs="panelData.multiOrderId" ></multi-input>
            </li>
            <li v-if="panelData.multiEngineName.enabled" :key="panelData.multiEngineName.id">
                <multi-input :multi-inputs="panelData.multiEngineName" ></multi-input>
            </li>
        </ul>
    </div>`
}

const MainPanel = {
    props: [ "panels" ],
    components: {
        'BwFieldPanel': BwFieldPanel
    },
    template: `
    <div>
        <ul>
            <li v-for="bwPanel in panels.bwPanels" :key="bwPanel.id">
                <bw-field-panel :panel-data="bwPanel.panelData" ></bw-field-panel>
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
        panels: {
            bwPanels: [{
                id: Date.now(),
                panelData: {
                    multiBwInstanceId: {
                        enabled: false,
                        id: "multiBwInstanceId" + Date.now(),
                        inputs: [],
                        label: 'BW Instance Id'
                    },
                    multiOrderId: {
                        enabled: false,
                        id: "multiOrderId" + Date.now(),
                        inputs: [],
                        label: 'Order Id'
                    },
                    multiEngineName: {
                        enabled: false,
                        id: "multiEngineName" + Date.now(),
                        inputs: [],
                        label: 'Engine Name'
                    }
                }
            }]
        },
        result: ''
    },
    components: {
        'MainPanel': MainPanel,
        'BwLogPanel': BwLogPanel
    }
})

