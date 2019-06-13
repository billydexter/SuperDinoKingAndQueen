var app = new Vue({
  el: '#app',
  data: {
    items: [],
    username: '',
    password: '',
    regiUsername: '',
    regiPassword: '',
    regiMessage: '',
    deleUsername: '',
    delePassword: '',
    deleMessage: '',
    editUsername: '',
    editPassword: '',
    newPassword: '',
    editMessage: '',
    message: '',
    addedComment: '',
    loggedIn: false,
    addedTime: '',
    comments: [],
    ratings: {}
  },
  methods: {
    returnToLogin()
    {
      this.loggedIn = false;
      this.message = '';
      this.deleMessage = '';
      this.regiMessage = '';
      this.editMessage = '';
    },
    async attemptLogin()
    {
      try
      {
          console.log("attempting to log in...");
          let username = this.username;
          let password = this.password;
          let result = await axios.post('/api/login', {
            username: username,
            password: password
          });
          this.message = "Logged in successfully";
          this.loggedIn = true;
      }
      catch(error)
      {
          this.message = "There was a problem logging in.";
      }
    },
    async attemptRegister()
    {
      try
      {
        console.log("attempting to register...");
        console.log(this.regiUsername);
        console.log(this.regiPassword);
        let result = await axios.post('/api/register', {
          username: this.regiUsername,
          password: this.regiPassword
        })
        this.regiMessage = "Register Successful.";
        this.loggedIn = true;
      }
      catch(error)
      {
        this.regiMessage = "Register Unsuccessful.";
      }
    },
    async attemptDelete()
    {
      try
      {
        console.log("attempting to delete...");
        console.log(this.deleUsername);
        console.log(this.delePassword);
        let result = await axios.post('/api/delete', {
          username: this.deleUsername,
          password: this.delePassword
        })
        this.deleMessage = "User was deleted successfully.";
      }
      catch(error)
      {
        this.deleMessage = "User was not deleted.";
      }
    },
    async attemptEdit()
    {
      try
      {
        console.log("attempting to change password...");
        console.log(this.editUsername);
        console.log(this.editPassword);
        console.log(this.newPassword);
        let result = await axios.post('/api/edit', {
          username: this.editUsername,
          oldPassword: this.editPassword,
          newPassword: this.newPassword
        })
        this.editMessage = "Password was changed.";
      }
      catch(error)
      {
        this.editMessage = "Password was not changed.";
      }
    },
  }
});