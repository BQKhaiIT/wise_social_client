
<template>
    <div class="greetings">
      <h1 class="green">{{ msg }}</h1>
      <h2 :class="clsColor" v-on:click="changeColor()">{{ demo }}</h2>
      <button v-on:click="plus()">Count</button> : <p>{{ count }}</p>
      <br>
      <input type="text" placeholder="Nhập dữ liệu vào đây: " v-model="txt_data" v-on:keyup="updateTxtData()">
      <p style="color: black;">{{ txt_data }}</p>
      <p style="color: blue;">{{ word_count }}</p>
      <p class="red" v-if="msg_error == true">Bạn nhập hơi bị nhiều ký tự rồi đấy!</p>
      <p class="green" v-else>Bạn có thể nhập tối da 255 ký tự</p>
      <br>
      <h3>Danh sách người dùng:</h3>
      <table border="1">
        <thead>
          <tr>
            <td>#</td>
            <td>Email</td>
            <td>Address</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in list_user">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>
              <button v-on:click="removeUser(user.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <input type="text" name="email" v-model="email" placeholder="example@gmail.com">
      <input type="text" name="address"  v-model="address" placeholder="Ha Noi">
      <button v-on:click="store()">Add User</button>
      <div class="col-md-12">
        <div class="card-body">
            <h1>{{ msg }}</h1>
            <h3>Comment box: {{ txtMSG }}</h3>
            <button v-on:click="$emit('clickMe', 'Du lieu truyen tu con sang cha')">
                Emit data do parent component
            </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
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
        msg: 'Tôi là thành phần con!'
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
      changeColor() {
        if (this.clsColor == "red") {
          this.clsColor = "green";
        } else {
          this.clsColor = "red";
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
    },
  }
  </script>
  
  <style>
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
  }
  
  h3 {
    font-size: 1.2rem;
  }
  
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
  
  @media (min-width: 1024px) {
  
    .greetings h1,
    .greetings h3 {
      text-align: left;
    }
  }
  
  .red {
    color: red;
  }
  </style>
  