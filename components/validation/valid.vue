<template >
  <div id="app">
    <v-layout align-center="align-center" justify-center="justify-center">
      <v-flex class="login-form text-xs-center">
        <!--  <cart class="subTitle">
              <template v-if="options.isLoggingIn">Oturum Aç</template
              ><template v-else>Kayıt Ol</template>
            </cart> -->
        <v-card-title v-if="options.isLoggingIn" primary-title>
          Oturum Aç
        </v-card-title>
        <v-card-title v-else primary-title> Kayıt Ol </v-card-title>
        <v-card light="light" outlined>
          <v-card-text>
            <form>
              <v-text-field
                v-model="user.email"
                light="light"
                label="E-posta"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                v-model="user.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Şifre"
                hint="En az 8 karakter"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <p
                v-show="wrongPassAndEmail && options.isLoggingIn"
                class="red--text"
              >
                E-posta veya şifre yanlış
              </p>
              <p v-show="isUse" class="red--text">E-posta kullanılıyor</p>
              <v-btn
                v-if="options.isLoggingIn"
                @click.prevent="login"
                block="block"
                type="submit"
                elevation="0"
                >giriş yap</v-btn
              >

              <v-btn
                :disabled="isCurrect"
                v-else
                block="block"
                type="submit"
                @click.prevent="submit"
                elevation="0"
                >Kayıt OL</v-btn
              >
            </form>
          </v-card-text>
        </v-card>
        <div v-if="options.isLoggingIn" class="text-center">
          <span>Bir hesabınız yok mu?</span
          ><v-btn plain light="light" @click="options.isLoggingIn = false"
            >KAYIT OL</v-btn
          >
        </div>
        <div v-else class="text-center">
          <span>Zeten hesabınız var mı?</span
          ><v-btn plain light="light" @click="options.isLoggingIn = true"
            >giriş yap</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      user: {
        email: "",
        password: "",
      },
      options: {
        isLoggingIn: true,
      },
      wrongPassAndEmail: false,
      rules: {
        required: (value) => !!value || "",
        min: (v) => v.length >= 8 || "Min 8 karakter",
        counter: (value) => value.length <= 20 || "Maksimum 20 karakter",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Geçersiz E-posta.";
        },
      },
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("createUser", this.user).then((params) => {
        console.log(this.isUse);
        if (!this.isUse) {
          console.log(this.isUse);
          this.options.isLoggingIn = true;
          alert("KAYIT BAŞARILI.")
        } else {
          console.log(this.isUse, "kullanılıyor");
          this.options.isLoggingIn = false;
        }
      });
    },
    isEmail(value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || false;
    },
    reset() {
      this.$refs.form.reset();
    },
    login() {
      this.$store.dispatch("login", this.user).then((err) => {
        if (err) {
          this.wrongPassAndEmail = true;
        } else {
          this.wrongPassAndEmail = false;
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    isCurrect() {
      if (
        this.user.email == "" ||
        this.user.password.length < 8 ||
        this.isEmail(this.user.email) == false
      ) {
        return true;
      } else {
        return false;
      }
    },
    isUse() {
      return this.$store.getters.getAlreadyUse;
    },
  },
};
</script>
<style scoped>
.login-form {
  max-width: 500px;
}
</style>