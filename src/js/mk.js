export default {
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
    get(json = {
        data: {},
        success: ()=>{},
        error: ()=>{}
    }){
        $.ajax({
            type     : 'GET',
            url      : json.url,
            data     : json.data,
            dataType : 'jsonp',
            success: function (data) {
                json.success(data)
            },
            error : function (XMLHttpRequest, textStatus, errorThrown) {
                json.error(XMLHttpRequest, textStatus, errorThrown)
            }
        });
    }
}