export default{
    data(){
        return{

        }
    },
    methods:{
        async callApi(method,url,dataObj){
            try {
                return await axios({
                    method: method,
                    url: url,
                    data: dataObj
                  });
            } catch (error) {
                return error.response;
            }
           
        },
        info (title='hey',nodesc) {
            this.$Notice.info({
                title: title,
                desc:nodesc
            });
        },
        success (title='great',nodesc) {
            this.$Notice.success({
                title: title,
                desc: nodesc
            });
        },
        warning (title='hey',nodesc) {
            this.$Notice.warning({
                title: 'Notification title',
                desc: nodesc
            });
        },
        error (title='oops',nodesc) {
            this.$Notice.error({
                title: title,
                desc: nodesc
            });
        },
        somethingWentWrong (title='oops',nodesc) {
            this.$Notice.error({
                title: 'Notification title',
                desc: nodesc
            });
        },
        handleSuccess (res, file) {
            this.data.categoryIconImage=res;
        },
        handleError (res, file) {
            console.log(res,res);
            console.log(res,file);
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: `${file.errors.file.length? file.errors.file[0] : 'something went wrong' }`
            });
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
    }
}