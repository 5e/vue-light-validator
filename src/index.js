let listeners = [];
import VForm from './VForm.vue'

export default {
    install(app, options) {
        app.config.globalProperties.$validationEmitter = this.emitter();
    },

    directive: {
        mounted(el, binding, vnode, prevVnode) {
            let vForm = el.closest("#v-form");
            let formUid = vForm.dataset.uid;
            const vm = binding.instance;
            function emitting() {
                if (el.tagName != "INPUT") { //there could be multiple inputs nested
                    let inputList = el.getElementsByTagName("input");
                    for (let i = 0; i < inputList.length; i++) {
                        const input = inputList[i];
                        for (let j = 0; j < binding.value.length; j++) {
                            const rule = binding.value[j];
                            let result = rule(input.value);
                            vm.$validationEmitter.emit(formUid, {
                                uid: input.id,
                                result: result,
                            });
                            if (result != true) {
                                //skip the rest of the rules as there's no need, go to next input
                                break;
                            }
                        }

                    }
                } else {
                    //only check rules on single input
                    const input = el;
                    for (let i = 0; i < binding.value.length; i++) {
                        const rule = binding.value[i];
                        let result = rule(input.value);
                        vm.$validationEmitter.emit(formUid, {
                            uid: input.id,
                            result: result,
                        });
                        if (result != true) {
                            break;
                        }
                    }
                }
            }
            emitting(); //first emit on inital load to validate v-model
            el.addEventListener("validation", emitting);
        },
        updated(el, binding) {
            //updated needed to trigger validation on v-model change
            //emit an input event to trigger validation
            const event = new Event("validation");
            el.dispatchEvent(event);
        },
    },

    vForm: VForm,

    emitter() {
        return {
            on(event, callback) {
                listeners.push({ event, callback });
            },
            emit(event, data) {
                listeners.forEach(listener => {
                    if (listener.event === event) {
                        listener.callback(data);
                    }
                });
            }
        };
    }
};