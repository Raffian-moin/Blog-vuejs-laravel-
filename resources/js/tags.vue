<template>
    <div>
		<div class="content">
			<div class="container-fluid">	
				<!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
				<div class="_1adminOverveiw_table_recent _box_shadow _border_radious _mar_b30 _p20">
					<p class="_title0">Tags<Button size="small" @click="addModal=true"><Icon type="md-add-circle"/>Add Tag</Button></p>

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
							<tr v-for="(tag,index) in tags" :key="index" v-if="tags.length">
								<td>{{index+1}}</td>
								<td class="_table_name">{{tag.tagName}}</td>
								<td>{{tag.created_at}}</td>
								<td>
									<Button type="info" ghost>Info</Button>
									<Button type="error" ghost>Error</Button>
								</td>
							</tr>

						</table>
						<Modal
							v-model="addModal"
							title="Add tag"
							:mask-closable=false
						>
							<Input v-model="data.tagName" size="large" placeholder="Add your Tag" />
							<div slot="footer">
								<Button type="default" size="small">Cancel</Button>
								<Button type="info" size="small" @click="addTag()"
								:loading="isAdding" :disabled="isAdding">{{isAdding?'Adding..':'Add tag'}}</Button>
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
	data(){
		return{
			data:{
				tagName:''
			},
			tags:[],
			addModal:false,
			isAdding:false,
		}
	},
	methods:{
		async addTag(){
			if(this.data.tagName.trim()==''){
				return this.error('tag name is requires');
			}
			const response=await this.callApi('post','/admintag',this.data);
			if(response.status==200){
				this.success('successfully added');
				this.data.tagName=''
			}
			else{
				this.somethingWentWrong('something went wrong');
			}
		},
	 },
	// async created(){
	// 	const response=await this.callApi('get','/tag');
	// 	if(response.status==200){
	// 			this.tags=response.data;
	// 		}
	// 		else{
	// 			this.somethingWentWrong('something went wrong');
	// 		}
	// }
	async created(){
		const res = await this.callApi('get', '/admintag')
		if(res.status==200){
			this.tags = res.data
		}else{
			this.somethingWentWrong();
		}
	}, 
}
</script>