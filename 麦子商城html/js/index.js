//作用：需要将所有的DOM元素对象以及相关的资源全部都加载完毕之后，再来实现的事件函数
window.onload = function () {
    // 路径导航的数据渲染
    navPathDataBind()
    function navPathDataBind() {
        /**
         * 思路：
         * 1、先获取路径导航的页面元素（navPath）
         * 2、再来获取所需要的数据（data.js->goodData.path）
         * 3、由于数据是需要动态产生的，那么相应的DOM元素也应该是动态产生的，含义需要根据数据的数量来进行创建DOM元素
         * 4、在遍历数据创建DOM元素的最后一条，只创建a标签，而不创建i标签
         */

            //1.获取页面导航的元素对象
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');

        //2.获取数据
        var path = goodData.path;

        //3.遍历数据
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                //只需要创建a且没有href属性
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                //4.创建a标签
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                //5.创建i标签
                var iNode = document.createElement('i');
                iNode.innerText = '/';

                //6.让navPath元素来追加a和i
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }




    }
    // 放大镜的移入移出
    bigClassBind()
    function bigClassBind() {
        /*
            思路：
            1、获取小图框元素，并且设置移入事件(onmouseenter)
            2、动态的来创建蒙版元素以及大图框和大图片元素、
            3、移出时需要移除(onmouseLeave)蒙版元素和大图框以及大图片
        */
        // 1、获取小图框元素
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        // 获取leftTop元素
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
        // 2.设置移入的事件
        smallPic.onmouseenter = function () {
            // 3.创建蒙版元素
            var maskDiv = document.createElement('div')
            maskDiv.id = "mask"
            // 4.创建大图框元素
            var BigPic = document.createElement('div')
            BigPic.id = "bigPic"
            // 5.创建大图片元素
            var BigImg = document.createElement('img')
            BigImg.src = "images/b1.png"
            // 6.大图框来追加大图片
            BigPic.appendChild(BigImg)
            // 7.让小图框追加蒙版元素
            smallPic.appendChild(maskDiv)
            //8.让leftTop元素追加大图框
            leftTop.appendChild(BigPic)
            // 设置移动事件
            smallPic.onmousemove = function (event) {
                // event.clientX:鼠标点距离浏览器左侧X轴的值
                // getBoundingClientRect().left:小图框元素距离浏览器左侧可视left值
                // offsetWidth为元素的占位宽度
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2
                // 判断
                if (left < 0) {
                    left = 0
                }else if (left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if (top < 0) {
                    top = 0
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

                // 设置left和top属性
                maskDiv.style.left = left + "px"
                maskDiv.style.top = top + "px"

                // 移动的比例关系 = 蒙版元素的移动距离 / 大图片元素移动的距离
                // 蒙版元素移动的距离 = 小图框的距离 - 蒙版元素的宽度
                // 大图片的元素的移动距离 = 大图片的距离 - 大图框元素的速度

                var scale = (smallPic.clientWidth -maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)
                BigImg.style.left = -left / scale + "px";
                BigImg.style.top = -top / scale + "px";
            }

            //设置移出事件
            smallPic.onmouseleave = function () {
                //  让小图框移出蒙版元素
                smallPic.removeChild(maskDiv)
                // 让leftTop元素移出大图框
                leftTop.removeChild(BigPic)
            }
        }

    }

    // 动态渲染缩略图的数据
    thumbnailData();
    function thumbnailData(){

        //1.获取piclist下的ul
        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList ul');

        //2.获取imagessrc数据
        var imagessrc = goodData.imagessrc;

        //3.遍历数组
        for(var i = 0; i<imagessrc.length; i++){
            //4.创建li元素
            var newLi = document.createElement('li');

            //5.创建img元素
            var newImg = document.createElement('img');
            newImg.src = imagessrc[i].s;

            //6.让li追加img属性
            newLi.appendChild(newImg);

            //7.让ul追加li元素
            ul.appendChild(newLi);
        }

    }

    //点击缩略图的效果
    thumbnailClick();
    function thumbnailClick(){

        //1.获取所有的li元素
        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #picList ul li');
        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');

        var imgessrc = goodData.imagessrc;

        smallPic_img.src = imgessrc[0].s;
        //2.循环点击这些li元素
        for(var i =0; i<liNodes.length; i++){
            liNodes[i].index = i;
            liNodes[i].onclick = function(){
                var idx = this.index;
                bigImgIndex = idx;

                //变换小图路径
                smallPic_img.src = imgessrc[idx].s;
            }
        }
    }

    //点击缩略图左右箭头切换图片的效果
    thumbnailLeftRightClick();
    function thumbnailLeftRightClick(){

        //1.获取箭头的a标签
        var prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev');
        var next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next');

        //2.获取可视的div以及ul元素和所有的Li元素
        var picList = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList');

        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #picList ul');

        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #picList ul li');

        // console.log(picList, ul, liNodes)
        //3.计算

        //发生起点
        var start = 0;

        //步长
        var step = (liNodes[0].offsetWidth + 20) *2;

        //可移动的距离(图片的总数 - div中显示的数量) *(li的宽度 + 20)
        var endPosition = (liNodes.length - 5) *(liNodes[0].offsetWidth + 20);

        //4.发生事件
        prev.onclick = function(){
            start-=step;
            if(start < 0){
                start = 0;
            }
            ul.style.left = -start + "px";
        }

        next.onclick = function(){
            start+=step;
            if(start > endPosition){
                start = endPosition;
            }
            ul.style.left = -start + "px";
        }
    }


    //商品详情数据的动态渲染
    rightTopData();
    function rightTopData(){

        //1.查找元素
        var rightTop = document.querySelector('#wrapper #content .contentMain #center #right .rightTop');

        //2.查找数据
        var goodsDetail =goodData.goodsDetail;

        //3.生成模板
        var s = `<h3>${goodsDetail.title}</h3>
                 <p>${goodsDetail.recommend}</p>
                 <div class="priceWrap">
                        <div class="priceTop">
                            <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                            <div class="price">
                                <span>￥</span>
                                <p>${goodsDetail.price}</p>
                                <i>降价通知</i>
                            </div>
                            <p>
                                <span>累计评价</span>
                                <span>${goodsDetail.evaluateNum}</span>
                            </p>
                 </div>
                 <div class="priceBottom">
                        <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                 </div>
                 <div class="support">
                    <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                    <p>${goodsDetail.support}</p>
                 </div>
                 <div class="address">
                    <span>配&nbsp;送&nbsp;至</span>
                    <p>${goodsDetail.address}</p>
                 </div>`;
        //4.重新渲染rightTop元素
        rightTop.innerHTML = s;
    }



}
