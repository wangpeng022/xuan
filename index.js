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
            console.log(model.winH,model.winW,'--');

            model.canvas.height = model.winH;
            model.canvas.width = model.winW;
            model.canvas = document.getElementById('action1');
            var n = 0;
            var nRow = model.winW > model.winH ? 4 : 8;
            var nClo = model.winW > model.winH ? 8 : 4;
            model.itemH = model.winH / nRow;
            model.itemW = model.winW / nClo;
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

        // var bgColor = ['#88CCCC'];
        // var colorArr = ['#FF5500', '#7AB900', '#B848FF', '#FF2525'];

        function drawWhite() {
            model.canvas.removeEventListener('mousedown',touchFn);
            model.canvas.addEventListener('mousedown', touchFn, false)
        }
        function touchFn(e) {
            var x = event.pageX - model.canvas.getBoundingClientRect().left
            var y = event.pageY - model.canvas.getBoundingClientRect().top
            for (var i of model.clickXY) {
                if (x > (i.x) && x < (i.x + i.w) && y > (i.y) && y < (i.y + i.h)) {
                    console.log("我是第" + i.i + "个图形")
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