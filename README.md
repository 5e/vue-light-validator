# vue-light-validator
Lightweight Vue 3 form validator using zero dependencies

## Demo
https://codesandbox.io/s/kind-ishizaka-sn2kfv?file=/src/App.vue

## Install
```
npm install vue-light-validator
```

main.js:
```js
import vueLightValidator from 'vue-light-validator'

const app = createApp(App)
app.use(vueLightValidator);
app.directive('rules', vueLightValidator.directive)
app.component('v-form', vueLightValidator.vForm)
```

## Usage
**Unique IDs MUST be set on each input inside a v-form.**

The v-form component wraps around the inputs used with the v-rules directive.
```html
<v-form v-model="valid">
      <input v-rules="[rules.required, rules.onlyNumbers]" v-model="nameField" id="nameField" />
      <input v-rules="[rules.required, rules.onlyNumbers]" v-model="phoneNumber" id="phoneNumber" />
</v-form>
```

```js
rules: {
    required: (value) => !!value || "Write something",
    onlyNumbers: function (value) {
        let result = /^\d+$/.test(value);
        if (result) {
            return true;
        } else {
            return "Only numbers allowed"
        }
    },
},
```

The v-model bound to v-form will return an object with the validation results. The top level `valid` is true if all validation results are true.
```js
{ 
    "valid": false, 
    "results": { 
        "nameField": true, 
        "phoneNumber": "Write something", 
    } 
}
```


## Custom input components
Custom input components are supported as long as they are wrapped in a v-form. The rules are applied into each input inside the custom component.

Parent:
```html
<v-form v-model="valid">
      <div>
        <text-input v-rules="[rules.required]" />
      </div>
</v-form>
```

Text-input component (both inputs now have the rule applied):
```html
<template>
    <div>
        <input id="firstName" v-model="firstName" />
        <input id="lastName" v-model="lastName" />
    </div>
</template>
```

OR:
```html
<v-form v-model="valid">
      <div>
        <text-input />
      </div>
</v-form>

...

<template>
    <div>
        <input id="firstName" v-model="firstName" v-rules="[rules.required]" />
        <input id="lastName" v-model="lastName" v-rules="[rules.required]" />
    </div>
</template>
```


v-form v-model value:
```js
{ 
    "valid": true, 
    "results": { 
        "firstName": true, 
        "lastName": true 
    } 
} 
```