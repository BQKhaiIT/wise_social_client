<template>
    <div class="wrapper">
        <div class="sign-in-page">
            <div class="signin-popup">
                <div class="signin-pop">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="cmp-info">
                                <div class="cm-logo">
                                    <img src="/src/assets/images/cm-logo.png" alt="">
                                </div>
                                <!--cm-logo end-->
                                <img src="/src/assets/images/cm-main-img.png" alt="">
                            </div>
                            <!--cmp-info end-->
                        </div>
                        <div class="col-lg-6">
                            <div class="login-sec">
                                <ul class="sign-control">
                                    <li data-tab="tab-1" v-on:click="chooseType('login')" :class="{current : choseType == 'login'}"><a href="#" title="">サインイン</a></li>
                                    <li data-tab="tab-2" v-on:click="chooseType('register')" :class="{current : choseType == 'register'}"><a href="#" title="">サインアップ</a></li>
                                </ul>
                                <div class="sign_in_sec" :class="{current : choseType == 'login'}" id="tab-1">
                                    <h3>サインイン</h3>
                                    <form>
                                        <div class="row">
                                            <div class="col-lg-12 no-pdd">
                                                <div class="sn-field">
                                                    <input type="text" name="email" placeholder="メール">
                                                    <i class="fa fa-user"></i>
                                                </div>
                                                <!--sn-field end-->
                                            </div>
                                            <div class="col-lg-12 no-pdd">
                                                <div class="sn-field">
                                                    <input type="password" name="password" placeholder="Password">
                                                    <i class="fa fa-lock"></i>
                                                </div>
                                            </div>
                                            <div class="col-lg-12 no-pdd">
                                                <button type="submit" value="submit">サインイン</button>
                                            </div>
                                        </div>
                                    </form>
                                    <!--login-resources end-->
                                </div>
                                <!--sign_in_sec end-->
                                <div class="sign_in_sec" :class="{current : choseType == 'register'}" id="tab-2">
                                    <!--signup-tab end-->
                                    <div class="dff-tab current" id="tab-3">
                                        <form action="#">
                                            <div class="row">
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="sn-field">
                                                        <input type="text" name="email" v-model="registerEmail"  placeholder="メール">
                                                        <i class="fa fa-envelope"></i>
                                                        <span class="text-danger msgError">{{ registerErrEmailMsg }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="sn-field">
                                                        <input type="text" name="name" v-model="registerFullName"  placeholder="氏名">
                                                        <i class="fa fa-user"></i>
                                                        <span class="text-danger msgError">{{ registerErrFullNameMsg }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="sn-field">
                                                        <input type="text" name="country" v-model="registerCountry"  placeholder="国">
                                                        <i class="fa fa-globe"></i>
                                                        <span class="text-danger msgError">{{ registerErrCountryMsg }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="sn-field">
                                                        <input type="password" name="password" v-model="registerPassword"  placeholder="Password">
                                                        <i class="fa fa-lock"></i>
                                                        <span class="text-danger msgError">{{ registerErrPasswordMsg }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="sn-field">
                                                        <input type="password" name="repeat-password" v-model="registerErrRePassword"  placeholder="Repeat Password">
                                                        <i class="fa fa-lock"></i>
                                                        <span class="text-danger msgError">{{ registerErrRePasswordMsg }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <div class="checky-sec st2">
                                                        <div class="fgt-sec">
                                                            <input type="checkbox" v-on:click="registerCheckAllow()" :checked="this.registerTOS === true" name="cc" id="c2">
                                                            <label for="c2">
                                                                <span></span>
                                                            </label>
                                                            <small>はい、Wise の利用規約を理解し、同意します。</small>
                                                        </div>
                                                        <!--fgt-sec end-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 no-pdd">
                                                    <button :class="{'cursor-not-allow' :this.registerTOS === false}" :disabled="this.registerTOS === false" v-on:click="registerValidation()" >開始する</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!--login-sec end-->
                        </div>
                    </div>
                </div>
                <!--signin-pop end-->
            </div>
        </div>
        <!--sign-in-page end-->
    </div>


</template>
<script>
import axios from 'axios';

  
  //import Vue from 'vue'
  //import axios from 'axios'
  // import component1 from 'component1'
  // import component2 from 'component2'
  
  export default {
    /***********************************************************************************************************
     ******************************* Pass data to child component **********************************************
     **********************************************************************************************************/
    props: ["txtMSG"],
    // components: {component1, component2},
    data() {
      /***********************************************************************************************************
       ******************************* Initialize global variables ***********************************************
       **********************************************************************************************************/
      return {
        choseType: 'login',
        registerEmail: '',
        registerErrEmailMsg: '',
        registerPassword: '',
        registerErrPasswordMsg: '',
        registerCountry: '',
        registerFullName: '',
        registerErrFullNameMsg: '',
        registerRePassword: '',
        registerErrRePasswordMsg: '',
        registerTOS: false,
      }
    },
    /**
     * Define global service socket
     *
     * Listing event from socket.io server
     * "ServerSendCommentToClient" is the name of the channel that sends notifications to all clients installed in the server socket
     */
     sockets: {
        // Send data to server
        ClientSendCommentToServer: function (responseComment) {
            this.comment = responseComment;
        },
        // Listen event from server and render data
        ServerSendCommentToClient: function (responseComment) {
            // Push to the comment list
            if (responseComment.type === 'comment' && this.transaction.id == responseComment.transaction_id) {
                this.pushCommentToList(responseComment);
                this.$forceUpdate();
            }
        },
    },
    created() {
      /***********************************************************************************************************
       *********************** Initialize data when this component is used. **************************************
       **********************************************************************************************************/
      console.log('Init created component and call to function get data from api server.');
    },
    mounted() {
      /***********************************************************************************************************
       ******************** Once created, the interface is displayed and calls mounted. **************************
       **********************************************************************************************************/
    },
    watch: {
      /***********************************************************************************************************
       ********************************* Methods change value for a variable *************************************
       **********************************************************************************************************/
      msg() {
        console.log("When the value of the msg variable changes, this method will be executed.");
      },
      word_count() {
        if (this.word_count > 255) {
          this.msg_error = true;
        } else {
          this.msg_error = false;
        }
      }
    },
    computed: {
      appendMsg() {
        return msg + "Process the value and assign the value to the corresponding variable the var has changed.";
      }
    },
    methods: {
      /***********************************************************************************************************
       ******************************* Default functions that handle local data **********************************
       **********************************************************************************************************/
  
      /**
       * Example default function not using param
       */
      defaultFunction() {
        this.msg = "Replace message here!";
      },
      /**
       * Default local function chose login or register
       * 
       * @param type string 'login' or 'register'
       */
      chooseType (type) {
        this.choseType = type;
      },
      /**
       * Validate function
       * 
       * Show msg error or enable button register
       * Call to function register and send data to server
       */
      registerValidation () {
        //Validate email
        if (this.registerEmail == '') {
            this.registerErrEmailMsg = 'メール ユーザ名を入力してください。';
        } else {
            this.registerErrEmailMsg = '';
        }
        //Validate FullName
        if (this.registerFullName == '') {
            this.registerErrFullNameMsg = '氏名 ユーザ名を入力してください。';
        } else {
            this.registerErrFullNameMsg = '';
        }
        if (this.registerCountry == '') {
            this.registerErrCountryMsg = '国 ユーザ名を入力してください。';
        } else if (this.registerCountry < 4) {
            this.registerErrCountryMsg = '国名は 3 文字以上である必要があります';
        } else {
            this.registerErrCountryMsg = '';
        }
        //Valodate password
        if (this.registerPassword == '') {
            this.registerErrPasswordMsg = 'Password ユーザ名を入力してください。';
        } else if (this.registerPassword < 8) {
            this.registerErrPasswordMsg = 'Password 名は 8 ユーザ名を入力してください。';
        } else {
            this.registerErrPasswordMsg = '';
        }

        //Validate Repassword
        if (this.registerPassword != this.registerRePassword) {
            this.registerErrPasswordMsg = '確認用パスワードが間違っています。';
        } else {
            this.registerErrRePasswordMsg = '';
        }

        //Check all var error
        if (this.registerErrorEmailMsg == '' &&
            this.registerErrorPasswordMsg == '' &&
            this.registerErrorRePasswordMsg == '' &&
            this.registerErrorFullNameMsg == '' &&
            this.registerErrorCountryMsg == ''
        ) {
            //Call to server
            this.register();
        }
        return null;
      },

      registerCheckAllow () {
        if (this.registerTOS === true) {
            this.registerTOS = false;
        }
        if (this.registerTOS === false) {
            this.registerTOS = true;
        }
      },
      leaveRoom() {
            this.$socket.emit('ClientSendCommentToServer', {
                transaction_id: this.transaction.id,
                // Pass param obj]
            });
        },
        // Join a room
        joinRoom() {
            this.$socket.emit('ClientSendCommentToServer', {
                // Pass param obj
                transaction_id: this.transaction.id
            });
      },
      plus() {
        this.count++;
      },
      updateTxtData() {
        this.word_count = this.txt_data.length;
      },
      removeUser(id) {
        for (let i = 0; i < this.list_user.length; i++) {
          if (id == this.list_user[i].id) {
            this.list_user.splice(i, 1);
          }
        }
      },
      store() {
        //Get max value
        let max = 0;
        for (let i = 0; i < this.list_user.length; i++) {
          if (this.list_user[i].id > max) {
            max = this.list_user[i].id;
          }
        }
        let newUser = {
          "id": max+1,
          "email": this.email,
          "address": this.address
        };
        this.list_user.push(newUser);
        this.email = '';
        this.address = '';
      },
      /**
       * Example default function using param 
       *
       * @param int pageNum number of page
       * @return boolean
       */
      defaultFunctionUsingParam(pageNum) {
        console.log(pageNum);
        return false;
      },
  
      /***********************************************************************************************************
       ******* Async and await functions for manipulating server-side data through internal API protocols ********
       **********************************************************************************************************/
  
      /**
       * Call API sample
       */
      async callAPI() {
        try {
          const callAPI = await axios.get('/apiendpoint', {
            /************ Attach param for request here ***************/
          });
          console.log(callAPI.data);
        } catch (err) {
          console.log(err);
        }
      },

      /**
       * Async await function register
       * 
       * Call to APT/ register
       * Method post pass param
       * Redirect router/ auth
       */
      async register() {
        try {
            const callRegisterAPI = await axios.post('/register', {
                //Pass param to header
            }).then(function (res) {
                //Api resource success
            }).catch (function (err){
                //Api resource error code
            });
        } catch (err) {
            //Cath to api failed
        }

      }
    },
  }
</script>

<style>
.msgError {
    font-size: 10px !important;
    right: 0px !important;
}
.cursor-not-allow {
    cursor: not-allowed !important;
}
</style>