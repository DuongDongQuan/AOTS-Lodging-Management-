<template>
    <div class="flex justify-between items-center my-5">
        <h1 class="text-xl uppercase font-bold">Danh sách khách trọ</h1>
        <button
            class="px-5 p-1.5 rounded bg-blue-700 font-bold text-white"
            type="button"
            @click="Create"
        >
            Thêm khách trọ
        </button>
    </div>
    <div class="relative overflow-x-auto mt-5">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">STT</th>
                    <th scope="col" class="px-6 py-3">Họ tên</th>
                    <th scope="col" class="px-6 py-3">Thông tin cá nhân</th>
                    <th scope="col" class="px-6 py-3">Địa chỉ</th>
                    <th scope="col" class="px-6 py-3">Phòng</th>
                    <th scope="col" class="px-6 py-3">Liên lạc chính</th>
                    <th scope="col" class="px-6 py-3">Trạng thái</th>
                    <th scope="col" class="w-60"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in renters"
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
                        <p>SĐT: {{ item.phone }}</p>
                        <p>CCCD: {{ item.id_card }}</p>
                        <p>Ngày sinh: {{ item.birth_day_f }}</p>
                        <p>Giới tính: {{ item.sex_f }}</p>
                    </td>
                    <td class="px-6 py-4">
                        {{ item.address_f }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.room?.name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.main_contact ? "ok" : "" }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.status }}
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
</template>

<script>
import axios from "../fetch/axios";
import { Modal } from "flowbite";
import moment from "moment";

export default {
    // props: [],
    name: "renters",
    data() {
        return {
            renters: [],
            // renterModal: {
            //     txtTitle: "",
            //     submitType: null,
            //     dataService: {
            //         name: null,
            //         price: null,
            //         unit: null,
            //     },
            // },
            // modal: null,
        };
    },
    async mounted() {
        // this.modal = new Modal(document.querySelector("#serviceModal"));
        await this.getRenters();
    },
    methods: {
        async getRenters() {
            const res = await axios.get("/renter");
            this.renters = await res.data.map((item) => {
                item.birth_day_f = moment(item.birth_day).format("DD/MM/YYYY");
                item.sex_f = item.sex ? "Nam" : "Nữ";
                item.address_f = `${item.address}, ${item.commune}, ${item.district}, ${item.province}`;
                return item;
            });
        },
        // async Create() {
        //     this.modal.toggle();
        //     this.renterModal = {
        //         txtTitle: "Thêm mới dịch vụ",
        //         submitType: "create",
        //         dataService: {
        //             name: null,
        //             price: null,
        //             unit: null,
        //         },
        //     };
        // },
        // async Update(serviceItem) {
        //     this.modal.toggle();
        //     this.renterModal = {
        //         txtTitle: "Sửa dịch vụ",
        //         submitType: "update",
        //         dataService: {
        //             _id: serviceItem._id,
        //             name: serviceItem.name,
        //             price: serviceItem.price,
        //             unit: serviceItem.unit,
        //         },
        //     };
        // },
        // async Submit() {
        //     const submitType = this.serviceModal.submitType;
        //     const data = this.serviceModal.dataService;

        //     if (submitType === "create") {
        //         // "service/store" là url của backend apis
        //         await axios.post("service/store", data);
        //     } else {
        //         const { _id, ...rest } = data;
        //         await axios.put(`service/update/${_id}`, rest);
        //     }

        //     await this.getServices();
        //     this.modal.hide();
        // },
        async Delete(_id) {
            await axios.delete(`service/renter/${_id}`);
            await this.getRenters();
        },
    },
};
</script>
