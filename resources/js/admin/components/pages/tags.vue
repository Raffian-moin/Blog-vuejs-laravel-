<template>
  <div>
    <div class="content">
      <div class="container-fluid">
        <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
        <div
          class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20"
        >
          <p class="_title0">
            Tags<Button size="small" @click="addModal = true"
              ><Icon type="md-add-circle" />Add Tag</Button
            >
          </p>

          <div class="_overflow _table_div">
            <table class="_table">
              <!-- TABLE TITLE -->
              <tr>
                <th>ID</th>
                <th>Tag Name</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
              <!-- TABLE TITLE -->

              <!-- ITEMS -->
              <tr v-for="(tag, index) in tags" :key="index" v-if="tags.length">
                <td>{{ index + 1 }}</td>
                <td class="_table_name">{{ tag.tagName }}</td>
                <td>{{ tag.created_at }}</td>
                <td>
                  <Button type="info" ghost @click="showEditModal(tag, index)"
                    >Show</Button
                  >
                  <Button type="error" ghost @click="deleteTag(tag.id, index)"
                    >Delete</Button
                  >
                </td>
              </tr>
            </table>
            <!-- add tag model -->
            <Modal v-model="addModal" title="Add tag" :mask-closable="false">
              <Input
                v-model="data.tagName"
                size="large"
                placeholder="Add your Tag"
              />
              <div slot="footer">
                <Button type="default" size="small" @click="addModal = false"
                  >Cancel</Button
                >
                <Button
                  type="info"
                  size="small"
                  @click="addTag()"
                  :loading="isAdding"
                  :disabled="isAdding"
                  >{{ isAdding ? "Adding.." : "Add tag" }}</Button
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
                  >{{ isAdding ? "Adding.." : "Update tag" }}</Button
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
        tagName: "",
      },
      editData: {
        tagName: "",
      },
      tags: [],
      addModal: false,
      editModal: false,
      isAdding: false,
      index: -1,
    };
  },
  methods: {
    // tag add method
    async addTag() {
      if (this.data.tagName.trim() == "") {
        return this.error("tag name is requires");
      }
      const response = await this.callApi("post", "/admintag", this.data);
      if (response.status == 200) {
        this.success("successfully added");
        this.data.tagName = "";
        this.addModal = false;
      } else {
        this.somethingWentWrong("something went wrong");
      }
    },
    // tag edit method
    async editTag(id) {
      if (this.editData.tagName.trim() == "") {
        return this.error("tag name is requires");
      }
      const response = await this.callApi(
        "put",
        "/admintag/" + id,
        this.editData
      );
      if (response.status == 200) {
        // this.$set(this.tags[this.index].tagName=this.editData.tagName);
        // this.$set(this.tags[this.index],this.tags[this.index].tagName,this.editData.tagName);
        // Vue.set(this.tags, this.index, this.editData.tagName);

        // this.tags.splice(this.index, 1,this.editData.tagName);
        this.$set(this.tags, this.index, this.editData.tagName);
        this.success("successfully edited");
        this.editModal = false;
        this.editData.tagName = "";
      } else {
        this.somethingWentWrong("something went wrong");
      }
    },
    // tag delete method
    async deleteTag(id, index) {
      var result = confirm("Want to delete?");
      if (result) {
        const response = await this.callApi("delete", "/admintag/" + id);
        if (response.status == 200) {
          this.tags.splice(index, 1);
          this.success("successfully deleted");
        } else {
          this.somethingWentWrong("something went wrong");
        }
      }
    },
    // show modal when click to edit
    showEditModal(tag, index) {
      this.editData = tag;
      this.index = index;
      this.editModal = true;
    },
  },
  async created() {
    const res = await this.callApi("get", "/admintag");
    if (res.status == 200) {
      this.tags = res.data;
    } else {
      this.somethingWentWrong();
    }
  },
};
</script>