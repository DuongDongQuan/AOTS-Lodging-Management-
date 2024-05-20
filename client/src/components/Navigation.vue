<template>
    <nav class="bg-blue-500 p-5 flex justify-end items-center gap-5 text-xl text-white font-bold">
        <RouterLink class="hover:text-blue-950" to="/">Trang chủ</RouterLink>
        <RouterLink class="hover:text-blue-950" to="/room">Phòng thuê</RouterLink>
        <RouterLink class="hover:text-blue-950" to="/renter">Khách trọ</RouterLink>
        <RouterLink class="hover:text-blue-950" to="/service">Dịch vụ</RouterLink>
    </nav>
    <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>
