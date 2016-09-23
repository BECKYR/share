(function (window) {
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame ;   //��ʼ����
         /*  function (cb) {
                    return window.setTimeout(cb, 1000 / 60);
                };*/
    })();

    var cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ; //ȡ���˴ζ���
         /*window.clearTimeout;*/
    })();

    var circleProgress = function (options) {
        if (options.progress !== 0) {
            options.progress =  options.progress ||100;//������������ʾ��ֵ
        }
        if (options.duration !== 0) {
            options.duration =  1000;//����ʱ��
        }
        options.fps = 60;    // requestAnimationFrame / cancelAnimationFrame ֡�ʣ�FPS��������������װ�ò�������ͼ���Ƶ��
        options.color =  'rgb(32, 178, 170)';          //options.color����������ɫ
        options.bgColor =  'rgb(230, 230, 230)';      //options.bgColor ���߹켣����ɫ
        options.textColor = 'black';                   // options.textColor ������ɫ
        options.progressWidth =  0.05;                 //options.progressWidth ���߹켣�Ŀ��
        options.fontScale = 0.5;                       // options.fontScale ����size

        options.toFixed =  0;          //options.toFixed �ɰ� Number ��������Ϊָ��С��λ��������
        var canvas = document.getElementById(options.id);
        if (canvas == null || canvas.getContext == null) {
            return;
        }
        options.width = canvas.width;
        options.height = canvas.height;
        options.context = canvas.getContext('2d');//getContext() �����ɷ���һ�����󣬸ö����ṩ�����ڻ����ϻ�ͼ�ķ��������ԡ�

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
        var r1 = Math.floor(Math.min(width, height) / 2);//floor() ����ִ�е�������ȡ������
        var r2 = Math.floor(r1 * (1 - progressWidth));   //���߹켣�γ�
        var startAngle = -Math.PI / 2;//startAngle endAngle����Բָ�����Ŀ�ʼ��ͽ������һ���Ƕȡ�����Ƕ��û�����������
                                           //���� X ��������������ӷ���ĽǶ�Ϊ 0���Ƕ�������ʱ�뷽������ӡ�
        var endAngle = startAngle + Math.PI * 2 * current / 100;
        var fontSize = Math.floor(r1 * fontScale);

        ctx.save();//save() �������浱ǰͼ��״̬��һ�ݿ�����
        ctx.clearRect(0, 0, width, height);//clearRect() ����ɾ��һ�������ľ�������

        ctx.beginPath();//beginPath() ������һ�������п�ʼ��·����һ���µļ��ϡ�
        if (current > 0) {
            ctx.arc(x, y, r1, startAngle, endAngle, true);//arc() ����ʹ��һ�����ĵ�Ͱ뾶��Ϊһ�������ĵ�ǰ��·�����һ������
            //������Բ�ܵ���ʱ�뷽��TRUE������˳ʱ�뷽��FALSE��������
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