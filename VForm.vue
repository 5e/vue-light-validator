<template>
    <div id="v-form" :data-uid="validationUid">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: ["modelValue"],
    emits: ["update:modelValue"],
    data() {
        return {
            resultsObject: {
                valid: null,
                results: {},
            },
            validationUid: this.$.uid.toString(),
        };
    },
    created() {
        this.$validationEmitter.on(this.validationUid, this.runValidation);
    },
    methods: {
        runValidation(value) {
            this.resultsObject.results[value.uid] = value.result;
            let result = true;
            for (const property in this.resultsObject.results) {
                if (property == "valid") {
                    continue;
                }
                if (this.resultsObject.results[property] != true) {
                    result = false;
                    break;
                }
            }
            this.resultsObject["valid"] = result;
            this.$emit("update:modelValue", this.resultsObject);
        },
    },
};
</script>
  