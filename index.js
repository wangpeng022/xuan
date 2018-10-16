        var model={
            clickXY: [],
            canvas:'',
            ctx: ''
        };
        window.onload=wResize;
        window.onresize=wResize;
        function wResize(){
            model.canvas = document.getElementById('action1');
            model.ctx = model.canvas.getContext('2d')
            model.winH = document.documentElement.clientHeight;
            model.winW = document.documentElement.clientWidth;
            // console.log(model.winH,model.winW,'--');
            if (model.winH>model.winW) {
                model.maxLong = model.winH
            } else {
                model.maxLong = model.winW
            }
            model.canvas.height = model.winH;
            model.canvas.width = model.winW;
            var n = 0;
            var nRow = model.winW > model.winH ? 4 : 8;
            var nClo = model.winW > model.winH ? 8 : 4;
            model.itemH = model.winH / nRow;
            model.itemW = model.winW / nClo;
            model.clickXY = [];
            for (var i = 0; i < nClo; i++) {
                for (var j = 0; j < nRow; j++) {
                    var item = {
                        x: model.itemW * i,
                        y: model.itemH * j,
                        w: model.itemW,
                        h: model.itemH,
                        i: j + n,
                    }
                    model.clickXY.push(item)
                }
                n += j;
            }
            drawWhite();
        }
        // console.log(model.winW,model.winH,model.itemW,model.itemH);
        // console.log(model.clickXY);

        var bgColor = ['#88CCCC'];
        var colorArr = ['#FF5500', '#7AB900', '#B848FF', '#FF2525'];

        function drawWhite() {
            model.canvas.removeEventListener('mousedown',touchFn);
            model.canvas.addEventListener('mousedown', touchFn, false)
        }
        function touchFn(e) {
            var x = event.pageX - model.canvas.getBoundingClientRect().left
            var y = event.pageY - model.canvas.getBoundingClientRect().top
            for (var i of model.clickXY) {
                if (x > (i.x) && x < (i.x + i.w) && y > (i.y) && y < (i.y + i.h)) {
                    console.log("我是第" + i.i + "个图形");
                    draw(model.ctx);
                    var opacity = 1;
                    var switchy = 1;
                    requestAnimationFrame(function step() {
                        if (switchy) {
                            opacity-=.1;
                            if (opacity<=0) {
                                opacity=0;
                                switchy = 0;
                            }
                        }
                        model.ctx.fillStyle = '#fff';
                        model.ctx.globalAlpha = opacity;
                        model.ctx.clearRect(i.x-1, i.y-1, i.w+2, i.h+2);
                        model.ctx.fillRect(i.x, i.y, i.w, i.h);
                        if (opacity==0) {
                            return;
                        }
                        requestAnimationFrame(step);
                    });
                    break
                }
            }
        }

        function draw(ctx) {
            var num = Math.round(Math.random() * 3 + 3)
            var pramas = {
                x: model.winW/ 2,
                y: model.winH/ 2,
                num: num,
                r: 30,
                strokeStyle: colorArr[Math.round(Math.random() * 3)],
                width: 6 * Math.round(Math.random() * 3)
            };
            // console.log(pramas.r);
            // ctx.translate(model.winW/ 2, model.winH/ 2);
            requestAnimationFrame(function step() {
                pramas.r += 20;
                ctx.clearRect(-model.winW, -model.winH, 2 * model.winW, 2 * model.winH);
                drawPolygon(ctx, pramas);
                // ctx.rotate(Math.PI / 180 * 1);

                if (pramas.r >= model.maxLong) {
                    // return ctx.clearRect(0, 0, model.winW, model.winH);
                }
                requestAnimationFrame(step);
            });
        }

        function drawPolygon(ctx, conf) {
            var x = conf && conf.x || 0; //中心点x坐标
            var y = conf && conf.y || 0; //中心点y坐标
            var num = conf && conf.num || 3; //图形边的个数
            var r = conf && conf.r || 100; //图形的半径
            var width = conf && conf.width || 5;
            var strokeStyle = conf && conf.strokeStyle;
            var fillStyle = conf && conf.fillStyle;
            //开始路径
            ctx.beginPath();
            var startX = x + r * Math.cos(2 * Math.PI * 0 / num);
            var startY = y + r * Math.sin(2 * Math.PI * 0 / num);
            ctx.moveTo(startX, startY);
            for (var i = 1; i <= num; i++) {
                var newX = x + r * Math.cos(2 * Math.PI * i / num);
                var newY = y + r * Math.sin(2 * Math.PI * i / num);
                ctx.lineTo(newX, newY);
            }
            ctx.closePath();
            //路径闭合
            if (strokeStyle) {
                ctx.strokeStyle = strokeStyle;
                ctx.lineWidth = width;
                ctx.lineJoin = 'round';
                ctx.stroke();
            }
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                ctx.fill();
            }
        }