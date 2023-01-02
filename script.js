window.onload = function() {
    
    function getlastcode() {
        document.getElementById("ta").innerText = localStorage.getItem("lastcode");
    }
    
    getlastcode()
    
    x = document.getElementById("ta")

    let val = "live";

    function mode_check() {

        let modes = document.getElementsByName("mode"); // get modes from Radio button
        
        for (var mode of modes) {
            if (mode.checked) { // find the current selection
                val = mode.value;
            }
        }

        if (val == "live") {
            intepreter_mode() // for dynamic updates; only HTML and CSS
        }

        if (val == "editor") {
            editor_mode() // for running JS as well
        }
    }

    x.onkeyup = function() {
        if (val != "editor") {
            intepreter_mode()
        }
    }

    function editable1() {
        document.getElementById("ta").contentEditable = true;
    }

    editable1();

    function getDate() {
        let date = new Date();
        let month = (date.getMonth() + 1)
        let day = date.getDate();

        if (month < 10) month = `0${month}`
        if (day < 10) day = `0${day}`
        
        let final_date = ' ' + date.getFullYear() + '-' + month + '-' + day 
        document.getElementsByTagName('span')[1].innerHTML = final_date;
    }

    getDate();

    function getTime() {
        let time = new Date();
        
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let seconds = time.getSeconds()
        
        if (seconds < 10) seconds = `0${seconds}`
        if (minutes < 10) minutes = `0${minutes}`
        if (hours < 10) hours = `0${hours}`

        let final_time = ' ' + hours + ":" + minutes + ":" + seconds;
        document.getElementsByTagName('span')[0].innerHTML = final_time;

        if(hours == 0 && minutes == 0 && seconds == 0){
            getDate()
        }
    }

    getTime()
    setInterval(getTime, 1000);

    function get_code() {
        let code = document.getElementById('ta').textContent;
        return code;
    }

    setInterval(mode_check, 1000);

    function intepreter_mode() {
        document.getElementById('compiler').style.display = "none"
        document.getElementById('compile').style.display = "none"
        document.getElementById('compile2').style.display = "none"
        document.getElementById('ta').style.height = "100%"
        let code = get_code()
        run_code(code.replace(/<script>/g, "<br> <br> <span style=\"color:red; background: black\">!!Warning: Scripts are disabled in Live Mode as some functions can create infinite loops; Use <b>Editor Mode to run Scripts</b> "))
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("lastcode", code);
        }
        //document.getElementById('code').innerHTML = code; //updated to better solution.
    }

    function editor_mode() {
        document.getElementById('compiler').style.display = "inline"
        document.getElementById('compile').style.display = "inline"
        document.getElementById('compile2').style.display = "inline"
        document.getElementById('ta').style.height = "92%"
    }

    document.getElementById("compile").addEventListener("click", run);

    function run() {
        let code = get_code()
         if (typeof(Storage) !== "undefined") {
            localStorage.setItem("lastcode", code);
        }
        run_code(code)
    }


    function run_code(code) {
        let iframe = document.getElementById('code');
        iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        iframe.document.open();
        iframe.document.write(code);
        iframe.document.close();
        return false;
    }

    save = document.getElementById("compile2")

    save.onclick = function(){
        download(get_code(), 'your_code', 'html')
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            // Prevent the Save dialog to open
            e.preventDefault();
            let code = get_code();
            download(code, "your_code", "html")
        }
    });

    function download(code, name, type) {
        saveAs(
            new Blob(
                [code], {
                    type: type + code.characterSet
                }
            ), name + '.' + type
        );
    }
}