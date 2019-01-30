document.getElementById('button').addEventListener('click', testUrl);
document.getElementById('input').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        testUrl();
    }
});
function testUrl(e) {
    let input = document.getElementById('input').value
    const regEx = input.match(/#.*/g)
    const loader = document.querySelector('.loader');
    const result = document.querySelector('#result')
    const outputURL = document.querySelector('.outputURL');
    
    //check protocols in URL
    if (!(input.indexOf('http://') > -1 || input.indexOf('https://') > -1)) {
        const paragraph = document.querySelector('#first');
        paragraph.className = 'p-2 bg-danger text-dark'
        paragraph.textContent = 'URL must contain either http:// or https://'
        setTimeout(() => {
            paragraph.textContent = '';
            paragraph.className = '';
        }, 2000)

    } else {
        loader.style.display = 'block'
        timer();
        showURL(input, loader, result, outputURL, regEx);

        setTimeout(() => {
            // append gclid if the URL does not include the # but ?
            if (input.includes("?") && !input.includes("#")) {
                window.open(`${input}&gclid=Test-12345`, "_blank");
                loader.style.display = 'none'
            }
            // append gclid if the URL include the ? and #
            else if (input.includes("#") && input.includes("?")) {
                let output = input.replace(/#.*/g, `&gclid=Test-12345${regEx}`);
                window.open(output, "_blank");
                loader.style.display = 'none'
            }
            // append gclid if the URL contains only #
            else if (input.includes("#")) {
                let output = input.replace(/#.*/g, `?gclid=Test-12345${regEx}`);
                window.open(output, "_blank");
                loader.style.display = 'none'

            }
            // append gclid if the URL include the ? and #
            else {
                window.open(`${input}?gclid=Test-12345`, "_blank");
                loader.style.display = 'none'
            }
        }, 5000)
    }
    e.preventDefault();
}

function timer() {
    let time = 4
    let interval = setInterval(() => {

        console.log('test')
        document.querySelector('.timer').innerHTML = `New tab will open in ${time} seconds`
        time = time - 1;
        if (time === 0) {
            clearInterval(interval);
        }

    }, 1000)
}
//Show URL function
function showURL(input, loader, result, outputURL, regEx) {
    if (input.includes("?") && !input.includes("#")) {
        const gclid = '&gclid=Test-12345'
        const url = input;
        result.style.display = 'block'
        outputURL.innerHTML = `
        <div>
        <h4>The the gclid value in the URL of new Tab must equals to:</h4>
        </div>
        <p> ${url}<strong>${gclid}<strong></p>
        `
    }
    // append gclid if the URL include the ? and #
    else if (input.includes("#") && input.includes("?")) {
        const url = input.replace(/#.*/g, `<strong>&gclid=Test-12345</strong>${regEx}`);
        result.style.display = 'block'
        outputURL.innerHTML = `
        <div>
        <h4>The the gclid value in the URL of new Tab must equals to:</h4>
        </div>
        <p> ${url}</p>
        `

    }
    // append gclid if the URL contains only #
    else if (input.includes("#")) {
        let url = input.replace(/#.*/g, `<strong>?gclid=Test-12345</strong>${regEx}`);
        result.style.display = 'block'
        outputURL.innerHTML = `
        <div>
        <h4>The the gclid value in the URL of new Tab must equals to:</h4>
        </div>
        <p> ${url}</p>
        `

    }
    // append gclid if the URL include the ? and #
    else {
        const url = `${input}<strong>?gclid=Test-12345</strong>`
        result.style.display = 'block'
        outputURL.innerHTML = `
        <div>
        <h4>The the gclid value in the URL of new Tab must equals to:</h4>
        </div>
        <p> ${url}</p>
        `
        
    }

}