<template>
  <div>
    <div class="content">
      <div class="container-fluid">
        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
        <div
          class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
        >
          <p class="_title0">
            Category<Button size="small" @click="addModal = true"
              ><Icon type="md-add-circle" />Add Category</Button
            >
          </p>

          <div class="_overflow _table_div">
            <table class="_table">
              <!-- TABLE TITLE -->
              <tr>
                <th>ID</th>
                <th>Category Image</th>
                <th>Category Name</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
              <!-- TABLE TITLE -->

              <!-- ITEMS -->
              <tr v-for="(category, index) in categories" :key="index" v-if="categories.length">
                <td>{{ index + 1 }}</td>
                <td class="table_image"><img :src="category.categoryIconImage"></td>
                <td class="_table_name">{{ category.categoryName }}</td>
                <td>{{ category.created_at }}</td>
                <td>
                  <Button type="info" ghost @click="showEditModal(category, index)"
                    >Show</Button
                  >
                  <Button type="error" ghost @click="deleteCategory(category.id, index)"
                    >Delete</Button
                  >
                </td>
              </tr>
            </table>
            <!-- add categoty model -->
            <Modal
              v-model="addModal"
              title="Add Category"
              :mask-closable="false"
            >
            <Input v-model="data.categoryName" placeholder="Add category name" />
              <div class="space"></div>
              <Upload
                type="drag"
                action="/upload"
                :headers="{
                  'x-csrf-token': token,
                  'X-Requested-With': 'XMLHttpRequest',
                }"
                :on-success="handleSuccess"
                :on-error="handleError"
                :max-size="2048"
                :on-exceeded-size="handleMaxSize"
              >
                <div style="padding: 20px 0">
                  <Icon
                    type="ios-cloud-upload"
                    size="52"
                    style="color: #3399ff"
                  ></Icon>
                  <p>Click or drag files here to upload</p>
                </div>
              </Upload>
              <div class="image_thumb" v-if="data.categoryIconImage">
                <img :src="`/uploads/${data.categoryIconImage}`" alt="" />
              </div>
              <div class="demo-upload-list" v-if="data.categoryIconImage">
                <img :src="`${data.categoryIconImage}`" />
                <div class="demo-upload-list-cover">
                  <Icon type="ios-trash-outline" @click="deleteImage"></Icon>
                </div>
              </div>
              <!-- <Input
                v-model="data.tagName"
                size="large"
                placeholder="Add your category"
              /> -->
              <div slot="footer">
                <Button type="default" size="small" @click="addModal = false"
                  >Cancel</Button
                >
                <Button
                  type="info"
                  size="small"
                  @click="addCategory()"
                  :loading="isAdding"
                  :disabled="isAdding"
                  >{{ isAdding ? "Adding.." : "Add Category" }}</Button
                >
              </div>
            </Modal>

            <!-- edit model -->
            <Modal v-model="editModal" title="Edit tag" :mask-closable="false">
              <Input v-model="editData.tagName" size="large" />
              <div slot="footer">
                <Button type="default" size="small" @click="editModal = false"
                  >Cancel</Button
                >
                <Button
                  type="info"
                  size="small"
                  @click="editTag(editData.id)"
                  :loading="isAdding"
                  :disabled="isAdding"
                  >{{ isAdding ? "Adding.." : "Update category" }}</Button
                >
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        categoryName: "",
        categoryIconImage: "",
      },
      editData: {
        categoryName: "",
      },
      categories: [],
      addModal: false,
      editModal: false,
      isAdding: false,
      index: -1,
      token: "",
    };
  },
  methods: {
    // tag add method
    async addCategory() {
      if (this.data.categoryName.trim() == "") {
        return this.error("category name is requires");
      }
      if (this.data.categoryIconImage.trim() == "") {
        return this.error("image is requires");
      }
      const response = await this.callApi("post", "/admincategory", this.data);
      if (response.status == 200) {
        this.success("successfully added");
        this.data.categoryName = "";
        this.data.categoryIconImage = "";
        this.addModal = false;
      } else {
        this.somethingWentWrong("something went wrong");
      }
    },
    // tag edit method
    async editCategory(id) {
      if (this.editData.categoryName.trim() == "") {
        return this.error("tag name is requires");
      }
      const response = await this.callApi(
        "put",
        "/adminCategory" + id,
        this.editData
      );
      if (response.status == 200) {
        // this.$set(this.tags[this.index].tagName=this.editData.tagName);
        // this.$set(this.tags[this.index],this.tags[this.index].tagName,this.editData.tagName);
        // Vue.set(this.tags, this.index, this.editData.tagName);

        // this.tags.splice(this.index, 1,this.editData.tagName);
        this.$set(this.categories, this.index, this.editData.categoryName);
        this.success("successfully edited");
        this.editModal = false;
        this.editData.tagName = "";
      } else {
        this.somethingWentWrong("something went wrong");
      }
    },
    // tag delete method
    async deleteCategory(id, index) {
      var result = confirm("Want to delete?");
      if (result) {
        const response = await this.callApi("delete", "/admintcategory/" + id);
        if (response.status == 200) {
          this.categories.splice(index, 1);
          this.success("successfully deleted");
        } else {
          this.somethingWentWrong("something went wrong");
        }
      }
    },
    // show modal when click to edit
    showEditModal(category, index) {
      this.editData = category;
      this.index = index;
      this.editModal = true;
    },
    async deleteImage(){
      let image=this.data.categoryIconImage;
      this.data.categoryIconImage=''
      const response = await this.callApi("post", "/delete_iamge/",{imageName:image});
      if(response.status==200){
        this.data.categoryIconImage=image;
      }
    }
  },
  async created() {
    this.token = window.Laravel.csrfToken;
    const res = await this.callApi("get", "/admincategory");
    if (res.status == 200) {
      this.categories = res.data;
    } else {
      this.somethingWentWrong();
    }
  },
};
</script>

