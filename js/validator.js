// định nghĩ Validator
function Validator(options) {
    var validateRules = {}
    function getparentElement (element,selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    // xử lý validate
    function Validate(inputElement, rule) {
        var errorElement = getparentElement(inputElement,options.formGroup).querySelector('.form-message')
        var errorMessage;
        
        var rulesFunction = validateRules[rule.selector];
        for (let i = 0; i < rulesFunction.length; i++) {
            switch (inputElement.type) {
                case 'radio': 
                case 'checkbox':
                    errorMessage = rulesFunction[i](formElement.querySelector(rule.selector +':checked'))
                    break;
            
                default:
                    errorMessage = rulesFunction[i](inputElement.value);
                    break;
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            getparentElement(inputElement,options.formGroup).classList.add('invalid')
            errorElement.innerText = errorMessage;
        }
        else {
            getparentElement(inputElement,options.formGroup).classList.remove('invalid')
            errorElement.innerText = '';
        }
        return !errorMessage
    }
    // lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    
    options.rules.forEach(rule => {
        // gán các rule vào object validateRules 
        if (Array.isArray(validateRules[rule.selector])) {
            validateRules[rule.selector].push(rule.Check);
        }
        else {
            validateRules[rule.selector] = [rule.Check];
        }

        // lấy ra các thẻ input rồi xử lý sự kiện
        var inputElements = formElement.querySelectorAll(rule.selector)
        Array.from(inputElements).forEach(inputElement => {
            if (inputElement) {
                // sự kiện blur khỏi input
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                }
                // sự kiện mỗi khi người dùng nhập vào ô input
                inputElement.oninput = function () {
                    var errorElement = getparentElement(inputElement,options.formGroup).querySelector('.form-message')
                    getparentElement(inputElement,options.formGroup).classList.remove('invalid')
                    errorElement.innerText = ''
                }
            }
        })
    });
    
    // xử lý sự kiện submit form 
    var isFillInForm = true; // flat : đã điền đúng tất cả vào form
    var isValid = [];
    formElement.onsubmit = function (e) {
        e.preventDefault();

        isValid.splice(0,options.rules.length * 2);
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                isValid.push(Validate(inputElement, rule));     
            }
        });
        // kiểm tra form điền đúng
        for (let i = 0; i < isValid.length; i++) {
            if (isValid[i] === false) {
                isFillInForm = false;
            }
            else {
                isFillInForm = true;
            }
        }
        if(isFillInForm) {
            // Trường hợp submit với Javascript
            if (typeof options.onSubmit === 'function') {
                var inputValid = formElement.querySelectorAll('[name]')
                var formInput = Array.from(inputValid).reduce((values,input) => {
                    switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('[name]:checked').value;
                                break;
                            case 'checkbox':
                                if(input.matches(':checked')){
                                    if(!Array.isArray(values[input.name])){
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                }
                                break;
                            default:
                                values[input.name] = input.value;
                                break;
                        }
                        return values;
                    },{})
                options.onSubmit(formInput)
            }
            // Trường hợp submit với hành vi mặc định
            else {

            }
        }
        
    }

}


// định nghĩa rules
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        Check: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        Check: function (value) {
            var mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.match(mailRegex) ? undefined : 'Trường này phải là email';
        }
    }
}
Validator.isLength = function (selector, min) {
    return {
        selector: selector,
        Check: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}
Validator.isConfirm = function (selector,selectorPasswordInput) {
    return {
        selector: selector,
        Check: function (value) {
            let password = document.querySelector(selectorPasswordInput).value;
            return (value === password) ? undefined : 'Vui lòng nhập đúng mật khẩu';
        }
    }
}