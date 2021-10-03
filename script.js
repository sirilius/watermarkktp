var val = "";
        var inputFile = document.getElementById("inputFile");
            inputFile.addEventListener("change", handleImage, false)
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');

        function automate(img) {

            document.getElementById("text").addEventListener("keyup", function() {
                if (document.getElementById("top-left").checked) {
                    var align = "start";
                    var vertical = "40";
                    var horizontal = "30";
                }

                if (document.getElementById("top-center").checked) {
                    var align = "center";
                    var vertical = "40";
                    var horizontal = "400";
                }

                if (document.getElementById("top-right").checked) {
                    var align = "end";
                    var vertical = "40";
                    var horizontal = "770";
                }

                if (document.getElementById("bottom-left").checked) {
                    var align = "start";
                    var vertical = "530";
                    var horizontal = "30";
                }

                if (document.getElementById("bottom-center").checked) {
                    var align = "center";
                    var vertical = "530";
                    var horizontal = "400";
                }

                if (document.getElementById("bottom-right").checked) {
                    var align = "end";
                    var vertical = "530";
                    var horizontal = "770";
                }

                var color = document.getElementById("colorPicker").value;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                theimg(img);
                thetext();
                val = document.getElementById("text").value;
                ctx.font = "30px Arial";
                ctx.textAlign = align;
                ctx.fillStyle = color;
                ctx.fillText(val, horizontal, vertical);
            });

            document.addEventListener("click", function() {
                if (document.getElementById("top-left").checked) {
                    align = "start";
                    vertical = "40";
                    horizontal = "30";
                }

                if (document.getElementById("top-center").checked) {
                    var align = "center";
                    var vertical = "40";
                    var horizontal = "400";
                }

                if (document.getElementById("top-right").checked) {
                    var align = "end";
                    var vertical = "40";
                    var horizontal = "770";
                }

                if (document.getElementById("bottom-left").checked) {
                    var align = "start";
                    var vertical = "530";
                    var horizontal = "30";
                }

                if (document.getElementById("bottom-center").checked) {
                    var align = "center";
                    var vertical = "530";
                    var horizontal = "400";
                }

                if (document.getElementById("bottom-right").checked) {
                    var align = "end";
                    var vertical = "530";
                    var horizontal = "770";
                }

                var color = document.getElementById("colorPicker").value;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                theimg(img);
                thetext();
                val = document.getElementById("text").value;
                ctx.font = "30px Arial";
                ctx.textAlign = align;
                ctx.fillStyle = color;
                ctx.fillText(val, horizontal, vertical);
            })

            document.getElementById("colorPicker").addEventListener("change", function() {
                if (document.getElementById("top-left").checked) {
                    align = "start";
                    vertical = "40";
                    horizontal = "30";
                }

                if (document.getElementById("top-center").checked) {
                    var align = "center";
                    var vertical = "40";
                    var horizontal = "400";
                }

                if (document.getElementById("top-right").checked) {
                    var align = "end";
                    var vertical = "40";
                    var horizontal = "770";
                }

                if (document.getElementById("bottom-left").checked) {
                    var align = "start";
                    var vertical = "530";
                    var horizontal = "30";
                }

                if (document.getElementById("bottom-center").checked) {
                    var align = "center";
                    var vertical = "530";
                    var horizontal = "400";
                }

                if (document.getElementById("bottom-right").checked) {
                    var align = "end";
                    var vertical = "530";
                    var horizontal = "770";
                }

                var color = document.getElementById("colorPicker").value;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                theimg(img);
                thetext();
                val = document.getElementById("text").value;
                ctx.font = "30px Arial";
                ctx.textAlign = align;
                ctx.fillStyle = color;
                ctx.fillText(val, horizontal, vertical);
            })
        }
        
        function thetext() {
            ctx.fillStyle = "white";
            ctx.font = "0px Arial";
            ctx.textAlign = "center";
            ctx.fillText(val, 0, 0)
        }

        function theimg(img) {
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = '#ffffff00';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function handleImage(e) {
            var reader = new FileReader();
            var img = "";
            var src = "";

            reader.onload = function(event) {
                img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, 0, 0);
                }

                img.src = event.target.result;
                src= event.target.result;
                canvas.classList.add("show");
                theimg(img);
                thetext();
                automate(img);
            }

            reader.readAsDataURL(e.target.files[0]);
        }

        function download() {
            var download = document.getElementById("download");
            var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
            download.setAttribute("href", image);
        }

        $("#inputFile").on("change", function() {
            var filename = $(this).val().split("\\").pop();
            $(this).siblings(".label-file").html(filename);

            if (document.getElementsByClassName("label-file")[0].innerHTML == "") {
                document.getElementsByClassName("label-file")[0].innerHTML = "Choose file"
            }
        })