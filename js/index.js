/**
 * Created by Administrator on 2016/9/4 0004.
 */
window.onload = function () {
    var flag = 0;
    var obj1 = document.getElementsByClassName("slider-list")[0].getElementsByTagName("li");
    var obj2 = document.getElementsByClassName("slider-markers")[0].getElementsByTagName("li");
    obj2[0].style.backgroundColor = "#FFFFFF";
    obj2[0].style.border = "3px solid #ee6557";
    var pre = obj2[0];
    for(var num=0;num<obj2.length;num++)
    {
        obj2[num].onclick = function(){
            if (pre != obj2[num]){
                var pre_name = pre.classList[0];//前一个的类名
                var now = this.classList[0];
                console.log(now);
                this.style.border = "3px solid #ee6557";
                this.style.backgroundColor = "#FFFFFF";
                pre.style.border = "none";
                pre.style.background="#C5C5C5";
                document.getElementsByClassName(pre_name+'_content')[0].style.display = "none";
                document.getElementsByClassName(now+'_content')[0].style.display = "block";
                pre = this;
            }
        }
    }


}
var login = function(){
    var log = document.getElementById("log");
    var close = document.getElementsByClassName("close")[0];
    log.onclick = function(){
        document.getElementsByClassName("log_box")[0].style.display = "block";
    }
    close.onclick = function(){
        document.getElementsByClassName("log_box")[0].style.display = "none";
    }

}


var title = document.getElementsByClassName("tabs");
var body = document.getElementsByClassName('tab_contant');
for(i=0;i<title.length;i++){
    title[i].id = i;
    title[i].onclick = function () {
        tab(this.id);
    }
}
function tab(nowid){
    for(j=0;j<title.length;j++){
        if(nowid == j){
            title[j].style.backgroundColor = 'white';
            body[j].style.display = 'block';
        }else{
            title[j].style.backgroundColor = '';
            body[j].style.display = '';
        }
    }
}


