# vue-light-validator
Lightweight Vue 3 form validator using zero dependencies

<a href="https://www.npmjs.com/package/vue-light-validator"><img src="https://img.shields.io/npm/v/vue-light-validator"></a>
<a href="https://bundlejs.com/?q=vue-light-validator"><img src="https://img.shields.io/bundlejs/size/vue-light-validator"></a>

## [Documentation & demo](https://5e.github.io/vue-light-validator/#/) 

## Features
- Provides a directive to use validation functions on an input value
- V-Form wrapper returns a boolean if all inputs are valid
- Lightweight package which uses no dependencies
- Easy to use and flexible

```html
<v-form v-model="valid">
      <input v-rules="[rules.required, rules.onlyNumbers]" v-model="phoneNumber" id="phoneNumber" />
      <input v-rules="[rules.required]" v-model="firstName" id="firstName" />
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

//v-form value returns

{
    "valid": false,
    "results": {
        "phoneNumber": "Write something",
        "firstName": true
    }
}

```
