/*

main-panel
    oth-field-panel* ...
    bw-field-panel*         multiple ORs
        multi-input         various fields
            text-input*     mutliple ORs
    bw-controls
        bw-log-settings
        time-panel
        table


*/
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
    computed: {
        activeFields: function() {
            return panelData.filter(i => i.enabled == true)
        }
    },
    template: `
    <div>
        <span>
            <button @click="add">Add OR</button>
            <label :v-for="multiField in panelData" :for="multiField.id">
                <!--input type="checkbox" :name="multiField.id" v-model="multiField.enabled">
                {{ multiField.label }}-->
            </label>
            <!--label :for="panelData.multiBwInstanceId.id">
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
            </label-->
        </span>
        <ul>
            <!--li v-for="multiField in activeFields" :key="multiField.id">
                <multi-input :multi-inputs="multiField" ></multi-input>
            </li-->
            <!--li v-if="panelData.multiBwInstanceId.enabled" :key="panelData.multiBwInstanceId.id">
                <multi-input :multi-inputs="panelData.multiBwInstanceId" ></multi-input>
            </li>
            <li v-if="panelData.multiOrderId.enabled" :key="panelData.multiOrderId.id">
                <multi-input :multi-inputs="panelData.multiOrderId" ></multi-input>
            </li>
            <li v-if="panelData.multiEngineName.enabled" :key="panelData.multiEngineName.id">
                <multi-input :multi-inputs="panelData.multiEngineName" ></multi-input>
            </li-->
        </ul>
    </div>`
}

const BwControls = {
    data: function () {
        return {
            sql: ''
        }
    },
    //props: [ "field" ],
    methods: {
        submit: function() {
            console.log('submit clicked')
            const _bwPanels = this.$parent.panels.bwPanels
            const _bw = _bwPanels.map(bwp => {
                console.log('outer')
                const _bwinst = bwp.panelData.multiBwInstanceId.inputs.map((input, idx) => {
                    console.log('inner')
                    const _frag = "bwinstanceid ..." + input.text
                    return ((idx > 1) ? 'OR ' : '') + _frag
                }).join('')
                return _bwinst
            }).join('')
            //sql = inputs.map(f => f.text).join(',')
            console.log(_bw)
            this.sql = _bw
        }
    },
    template: `
    <div>
        <span>
            <label for="bwlog_panel_button">
                <input type="submit" name="bwlog_panel_button" @click="submit">
            </label>
        </span>
        {{ sql }}
    </div>`
}

const MainPanel = {
    props: [ "panels" ],
    components: {
        'BwFieldPanel': BwFieldPanel,
        'BwControls': BwControls
    },
    template: `
    <div>
        <ul>
            <li v-for="bwPanel in panels.bwPanels" :key="bwPanel.id">
                <bw-field-panel :panel-data="bwPanel.panelData" ></bw-field-panel>
            </li>
            <bw-controls v-show="panels.bwPanels.length > 0"></bw-controls>
        </ul>
    </div>`
}

//main instance
const main = new Vue({
    el: "#main",
    data: {
        panels: {
            bwPanels: [{
                id: Date.now(),
                // multi.... -> multiField
                panelData: [
                    {
                        field: 'BwInstanceId',
                        enabled: false,
                        id: "multiBwInstanceId-" + Date.now(),
                        inputs: [],
                        label: 'BW Instance Id'
                    },
                    {
                        field: 'OrderId',
                        enabled: false,
                        id: "multiOrderId-" + Date.now(),
                        inputs: [],
                        label: 'Order Id'
                    },
                    {
                        field: 'EngineName',
                        enabled: false,
                        id: "multiEngineName-" + Date.now(),
                        inputs: [],
                        label: 'Engine Name'
                    }
                ]
            }]
        },
        result: ''
    },
    components: {
        'MainPanel': MainPanel,
    }
})

