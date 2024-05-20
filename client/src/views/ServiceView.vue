<template>
    <div class="flex justify-between items-center my-5">
        <h1 class="text-xl uppercase font-bold">Danh sách dịch vụ</h1>
        <button
            class="px-5 p-1.5 rounded bg-blue-700 font-bold text-white"
            type="button"
            @click="Create"
        >
            Thêm dịch vụ
        </button>
    </div>
    <div class="relative overflow-x-auto mt-5">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">STT</th>
                    <th scope="col" class="px-6 py-3">Tên dịch vụ</th>
                    <th scope="col" class="px-6 py-3">Đơn giá</th>
                    <th scope="col" class="px-6 py-3">Đơn vị tính</th>
                    <th scope="col" class="w-60"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in services"
                    :key="index"
                    class="bg-white border-b"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {{ index + 1 }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.price }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.unit }}
                    </td>
                    <td class="px-6 py-4 flex justify-center gap-2">
                        <button
                            @click="Update(item)"
                            class="px-4 py-1 rounded bg-cyan-700 text-white font-bold"
                        >
                            Chỉnh sửa
                        </button>
                        <button
                            @click="Delete(item._id)"
                            class="px-4 py-1 rounded bg-red-800 text-white font-bold"
                        >
                            Xóa
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div
        id="serviceModal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto max-h-full"
    >
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow">
                <!-- header -->
                <div
                    class="flex items-start justify-between p-4 border-b rounded-t"
                >
                    <h3>
                        {{ serviceModal.txtTitle }}
                    </h3>
                </div>
                <!-- body -->
                <div class="p-6 space-y-6">
                    <!-- ten dich vu -->
                    <div>
                        <label> Tên dịch vụ </label>
                        <div>
                            <input
                                type="text"
                                id="name"
                                placeholder="tên dịch vụ"
                                v-model="serviceModal.dataService.name"
                            />
                        </div>
                    </div>
                    <!-- don gia -->
                    <div>
                        <label> Đơn giá </label>
                        <div>
                            <input
                                type="number"
                                id="price"
                                placeholder="đơn giá"
                                v-model="serviceModal.dataService.price"
                            />
                        </div>
                    </div>
                    <!-- don vi tinh -->
                    <div>
                        <label> Đơn vị tính </label>
                        <div>
                            <input
                                type="text"
                                id="unit"
                                placeholder="đơn vị tính"
                                v-model="serviceModal.dataService.unit"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="Submit" type="button">Lưu</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../fetch/axios";
import { Modal } from "flowbite";

export default {
    // props: [],
    name: "services",
    data() {
        return {
            services: [],
            serviceModal: {
                txtTitle: "",
                submitType: null,
                dataService: {
                    name: null,
                    price: null,
                    unit: null,
                },
            },
            modal: null,
        };
    },
    async mounted() {
        this.modal = new Modal(document.querySelector("#serviceModal"));
        await this.getServices();
    },
    methods: {
        async getServices() {
            const res = await axios.get("/service");
            this.services = res.data;
        },
        async Create() {
            this.modal.toggle();
            this.serviceModal = {
                txtTitle: "Thêm mới dịch vụ",
                submitType: "create",
                dataService: {
                    name: null,
                    price: null,
                    unit: null,
                },
            };
        },
        async Update(serviceItem) {
            this.modal.toggle();
            this.serviceModal = {
                txtTitle: "Sửa dịch vụ",
                submitType: "update",
                dataService: {
                    _id: serviceItem._id,
                    name: serviceItem.name,
                    price: serviceItem.price,
                    unit: serviceItem.unit,
                },
            };
        },
        async Submit() {
            const submitType = this.serviceModal.submitType;
            const data = this.serviceModal.dataService;

            if (submitType === "create") {
                // "service/store" là url của backend apis
                await axios.post("service/store", data);
            } else {
                const { _id, ...rest } = data;
                await axios.put(`service/update/${_id}`, rest);
            }

            await this.getServices();
            this.modal.hide();
        },
        async Delete(_id) {
            await axios.delete(`service/delete/${_id}`);
            await this.getServices();
        },
    },
};
</script>
