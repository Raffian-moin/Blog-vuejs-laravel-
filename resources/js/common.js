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
        }
    }
}