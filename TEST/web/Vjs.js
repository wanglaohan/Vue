// var a = new Vue({
//     el:'#demo',
//     data:{
//         firstName: 'Foo',
//         lastName: 'Bar'
//     },
//     computed:{
//         fullName: {
//             // getter
//             get: function() {
//                 return this.firstName + ' ' + this.lastName
//             },
//             // setter
//             set: function (newValue) {
//                 var names = newValue.split(' ')
//                 this.firstName = names[0]
//                 this.lastName = names[names.length - 1]
//             }
//         }
//     }
// })

var b = new Vue({
    el:'#example',
    data:{
        question:'',
        answer:'I cannot give you an answer until you ask a question!',
        url:'',
        styleObject:{
            color:'red',
            fontSize:'16px'
        },
        classList:{
            active:true
        },
        loginType:'username',
        items:[
            '1',
            '2'
        ]
    },
    watch:{
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods:{
        getAnswer:_.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                this.answer = 'Thinking...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                        vm.url = _.capitalize(response.data.image)
                        console.log('aaa')
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为判定用户停止输入等待的毫秒数
            500
        ),
        changeType:function () {
            var scope = this
            // if(scope.loginType === "username")
            //     scope.loginType = "email"
            // else
            //     scope.loginType = "username"
            scope.items = [
                {message:"bbb"},
                {message:"aaa"}
            ]
        }
    }
})