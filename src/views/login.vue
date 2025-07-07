<template>
  <q-layout view="lHh Lpr lFf" class="bg-blue-1">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card
          flat
          bordered
          class="q-pa-xl shadow-2"
          style="width: 360px; max-width: 90vw"
        >
          <q-card-section class="text-center">
            <q-icon name="directions_car" size="48px" color="primary" />
            <div class="text-h5 q-mt-sm">Login Bos Rental</div>
            <div class="text-caption text-grey-7">
              Silakan masuk untuk melanjutkan
            </div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="username"
              label="Username"
              outlined
              dense
              clearable
              :rules="[(val) => !!val || 'Wajib diisi']"
              class="q-mb-md"
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              clearable
              :rules="[(val) => !!val || 'Wajib diisi']"
              @keyup.enter="handleLogin"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Login"
              color="primary"
              @click="handleLogin"
              unelevated
            />
          </q-card-actions>

          <q-slide-transition>
            <div
              v-if="error"
              class="text-negative text-caption text-center q-mt-sm"
            >
              {{ error }}
            </div>
          </q-slide-transition>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useAuthStore } from "../stores/auth.js";

const username = ref("");
const password = ref("");
const error = ref("");

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value);
  if (success) {
    $q.notify({ type: "positive", message: "Login berhasil!" });
    router.push("/"); // ke dashboard atau halaman utama
  } else {
    $q.notify({ type: "negative", message: "Username atau password salah" });
    error.value = "Username atau password salah";
  }
};
</script>
