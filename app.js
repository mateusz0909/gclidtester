document.getElementById('button').addEventListener('click', testUrl);


function testUrl(e) {
    let input = document.getElementById('input').value
    const regEx = input.match(/#.*/g)
    if (!(input.indexOf('http://')>-1 || input.indexOf('https://')>-1)) {
        const paragraph = document.querySelector('#first');
        paragraph.className = 'p-1 m-1 bg-warning text-dark'
        paragraph.textContent = 'URL must contain either http:// or https://'
        setTimeout(()=>{
            paragraph.textContent = '';
            paragraph.className = '';
        },2000)

    } else {
        // append gclid if the URL does not include the # but ?
        if (input.includes("?") && !input.includes("#")) {
            window.open(`${input}&gclid=Test-12345`, "_blank");
        }
        // append gclid if the URL include the ? and #
        else if (input.includes("#") && input.includes("?")) {
            let output = input.replace(/#.*/g, `&gclid=Test-12345${regEx}`);
            window.open(output, "_blank");
        }
        // append gclid if the URL include the ? and #
        else {
            window.open(`${input}?gclid=Test-12345`, "_blank");
        }
    }



    e.preventDefault();
}


// function openNewBackgroundTab(){
//     var a = document.createElement("a");
//     a.href = "http://www.google.com/";
//     var evt = document.createEvent("MouseEvents");
//     //the tenth parameter of initMouseEvent sets ctrl key
//     evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
//                                 true, false, false, false, 0, null);
//     a.dispatchEvent(evt);
// }