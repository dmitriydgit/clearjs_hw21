"use strict";

(function(){

    const   btn = document.getElementById("play"),
            firstBlock = document.querySelector('#first-line'),
            secondBlock = document.querySelector('#second-line'),
            thirdBlock = document.querySelector('#third-line'),
            typeSelector = document.querySelector("#type-selector"),
            lineSelector = document.querySelector("#line-selector"),
            groups = [".first-group", ".second-group",".third-group"];

    let nameFormat = (name) => {
        return  name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : "Lohn Doh";
    };
    let urlFomat =  (url) => {
        return  url.indexOf("http://") === -1 ? `http://${url}` :  url ;
    };
    
    let descriptionFormat = (descr) => {
        return (descr.length > 15 ) ? descr.substring(0 , 15) + "..." : descr;
    };
    let dateFormat = (date) => {
        var format = "YYYY/MM/DD HH:mm";
        return  (!date.isNaN) ? moment(date).format(format) : console.log("Error, data is incorrect") ;
    };
    let printDataToConsole = (data) => {
        console.log(data);
    };
    let showBlock = (elemSelector, action) => {
        document.querySelector(elemSelector).classList.add(action);
    };
    let hideBlock = (elemSelector, action) => {
        document.querySelector(elemSelector).classList.remove(action);
    };
    let clearGallery = () => {
        firstBlock.innerHTML = secondBlock.innerHTML = thirdBlock.innerHTML = "";
        for (let i = 0; i < groups.length; i++){
            hideBlock(groups[i], "show");
        }
    };

    let getReadyDataForGallery = () => {
        return data.map((item, index)=>{
            return {
                    url: urlFomat(item.url),
                    name: nameFormat(item.name),
                    description: descriptionFormat(item.description),
                    date: dateFormat(item.date)
                    }
            })
         };

    let print = (block, result) => {
        block.innerHTML += result;
    }

    let chooseOutputMethod = (value, arr) => {
        let  output;
        switch(value) {
            case "0": output = arr.length;
            break;
            case "1": output = 3;
            break;
            case "2":output = 6;
            break;
        };
        return output;
    }

    let byildWithReplace = (output,readyDataForGallery) => {
        let replaceItemTemplate =
            '<div class="col-sm-3 col-xs-6">\
                <img src="$url" alt="$name" class="img-thumbnail">\
                <div class="info-wrapper">\
                    <div class="text-muted">$name</div>\
                    <div class="text-muted top-padding">$description</div>\
                    <div class="text-muted">$date</div>\
                </div>\
            </div>';

        for(let key = 0; key < output; key ++){
            let result = replaceItemTemplate
            .replace(/\$name/gi, readyDataForGallery[key].name)
            .replace("$url", readyDataForGallery[key].url)
            .replace("$description", readyDataForGallery[key].description)
            .replace("$date", readyDataForGallery[key].date);

            print(firstBlock, result);
        }
    }

    let buildWithItemTemplate = (output,readyDataForGallery) => {
        for(let key = 0; key < output; key ++){
            let result = 
                `<div class="col-sm-3 col-xs-6">\
                    <img src="${readyDataForGallery[key].url}" alt="${readyDataForGallery[key].name}" class="img-thumbnail">\
                    <div class="info-wrapper">\
                        <div class="text-muted">${readyDataForGallery[key].name}</div>\
                        <div class="text-muted top-padding">${readyDataForGallery[key].description}</div>\
                        <div class="text-muted">${readyDataForGallery[key].date}</div>\
                    </div>\
                </div>`;
            print(secondBlock, result);
        }
    }

    let buildWithDOMManipulation = (output,readyDataForGallery) => {
        for(let key = 0; key < output; key ++){
            let divContainer = document.createElement("div"),
            image = document.createElement("img"),
            divInfoWrapper = document.createElement("div"),
            divName = document.createElement("div"),
            divDescription = document.createElement("div"),
            divDate = document.createElement("div"),
            nameNode = document.createTextNode(readyDataForGallery[key].name),
            descrNode = document.createTextNode(readyDataForGallery[key].description),
            dateNode = document.createTextNode(readyDataForGallery[key].date);

            divContainer.classList.add("col-sm-3", "col-xs-6");
            image.classList.add("img-thumbnail");                    
            image.src = readyDataForGallery[key].url;
            image.alt = readyDataForGallery[key].name;
            divInfoWrapper.classList.add("info-wrapper");
            divName.classList.add("text-muted");
            divDescription.classList.add("text-muted", "top-padding");
            divDate.classList.add("text-muted");

            thirdBlock.appendChild(divContainer);
            divContainer.appendChild(image);
            divContainer.appendChild(divInfoWrapper);
            divInfoWrapper.appendChild(divName);
            divInfoWrapper.appendChild(divDescription);
            divInfoWrapper.appendChild(divDate);
            divName.appendChild(nameNode);
            divDescription.appendChild(descrNode);
            divDate.appendChild(dateNode);
        }
    }
    
    let init = () => {
        let readyDataForGallery = getReadyDataForGallery(),
            buildMethod = document.getElementById("type-selector").value,
            appearenceMethod = document.getElementById("line-selector").value,
            output = chooseOutputMethod(appearenceMethod, readyDataForGallery); // все, 3 или 6 картинок
        
        switch(buildMethod) {
            case '1':
                clearGallery();
                showBlock('.first-group', "show");
                byildWithReplace(output, readyDataForGallery);
            break;
            case '2':
                clearGallery();
                showBlock('.second-group', "show");
                buildWithItemTemplate(output,readyDataForGallery);
            break;
            case '3':
                clearGallery();
                showBlock('.third-group', "show");
                buildWithDOMManipulation(output,readyDataForGallery);
            break;
            default: console.log("Choose buiding method!")
        }
    }

    btn.addEventListener("click", init);

})();

