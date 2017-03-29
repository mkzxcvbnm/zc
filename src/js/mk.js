let path = 'http://qingshang.fankeweb.cn/index.php/api/index'
module.exports = {
    rem(size = 750){
        let html = document.getElementsByTagName('html')[0];
        let setSize = () => {
            let _w = document.documentElement.clientWidth;
            _w = _w > size ? size: _w;
            html.style.fontSize = _w/size * 100 + 'px';
        };
        setSize();
        window.onresize = setSize;
        return this;
    },
    http(url, params={}, success=()=>{}, error=()=>{}){
        this.$http.jsonp(path + url,{
            params: params
        })
        .then((response) => {
            success(response)
        })
        .catch((response) => {
            error(response)
            console.log(response)
        })
    },
    //测试随机数
    random(){
        if (Math.random()<.5) {
            return 0;
        }else{
            return 1;
        }
    }
}