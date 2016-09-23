(function (window) {
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame ;   //开始动画
         /*  function (cb) {
                    return window.setTimeout(cb, 1000 / 60);
                };*/
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ; //取消此次动画
         /*window.clearTimeout;*/
    })();

    var circleProgress = function (options) {
        if (options.progress !== 0) {
            options.progress =  options.progress ||100;//进度条最终显示的值
        }
        if (options.duration !== 0) {
            options.duration =  1000;//持续时间
        }
        options.fps = 60;    // requestAnimationFrame / cancelAnimationFrame 帧率（FPS）用于描述成像装置产生连续图像的频率
        options.color =  'rgb(32, 178, 170)';          //options.color进度条的颜色
        options.bgColor =  'rgb(230, 230, 230)';      //options.bgColor 行走轨迹背景色
        options.textColor = 'black';                   // options.textColor 字体颜色
        options.progressWidth =  0.05;                 //options.progressWidth 行走轨迹的宽度
        options.fontScale = 0.5;                       // options.fontScale 字体size

        options.toFixed =  0;          //options.toFixed 可把 Number 四舍五入为指定小数位数的数字
        var canvas = document.getElementById(options.id);
        if (canvas == null || canvas.getContext == null) {
            return;
        }
        options.width = canvas.width;
        options.height = canvas.height;
        options.context = canvas.getContext('2d');//getContext() 方法可返回一个对象，该对象提供用于在画布上绘图的方法和属性。

        var step = function () {
            if (options.current < options.progress && options.duration > 0) {
                drawCircleProgress(options);
                options.current += options.progress * (1000 / options.fps) / options.duration;
                canvas.setAttribute('data-requestID', requestAnimationFrame(step));
            } else {
                options.current = options.progress;
                drawCircleProgress(options);
                canvas.removeAttribute('data-requestID');
            }
        };

        cancelAnimationFrame(canvas.getAttribute('data-requestID'));
        options.current = 0;
        step();
    };

    var drawCircleProgress = function (options) {
        var ctx = options.context;
        var width = options.width;
        var height = options.height;
        var current = options.current;
        var color = options.color;
        var bgColor = options.bgColor;
        var textColor = options.textColor;
        var progressWidth = options.progressWidth;
        var fontScale = options.fontScale;

        var x = width / 2;
        var y = height / 2;
        var r1 = Math.floor(Math.min(width, height) / 2);//floor() 方法执行的是向下取整计算
        var r2 = Math.floor(r1 * (1 - progressWidth));   //行走轨迹形成
        var startAngle = -Math.PI / 2;//startAngle endAngle沿着圆指定弧的开始点和结束点的一个角度。这个角度用弧度来衡量。
                                           //沿着 X 轴正半轴的三点钟方向的角度为 0，角度沿着逆时针方向而增加。
        var endAngle = startAngle + Math.PI * 2 * current / 100;
        var fontSize = Math.floor(r1 * fontScale);

        ctx.save();//save() 方法保存当前图像状态的一份拷贝。
        ctx.clearRect(0, 0, width, height);//clearRect() 方法删除一个画布的矩形区域。

        ctx.beginPath();//beginPath() 方法在一个画布中开始子路径的一个新的集合。
        if (current > 0) {
            ctx.arc(x, y, r1, startAngle, endAngle, true);//arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
            //弧沿着圆周的逆时针方向（TRUE）还是顺时针方向（FALSE）遍历。
            ctx.arc(x, y, r2, endAngle, startAngle, false);
        } else {
            ctx.arc(x, y, r1, 0, Math.PI * 2, true);
            ctx.arc(x, y, r2, Math.PI * 2, 0, false);
        }
        ctx.closePath();
        ctx.fillStyle = bgColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, r1, startAngle, endAngle, false);
        ctx.arc(x, y, r2, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.fillStyle = textColor;
        ctx.font = '' + fontSize + 'px arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText('' + current.toFixed(options.toFixed) + '%', x, y);
        ctx.restore();
    };

    window.circleProgress = circleProgress;

})(this);