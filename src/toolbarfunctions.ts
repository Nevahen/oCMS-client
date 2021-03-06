function heading1(txt, elementData, h){

        let str = ""

        for(let i = 0; i < h; i++){

            str += "#";

        }

        str += " "
    
        return[txt.slice(0, elementData.selectionStart), str, txt.slice(elementData.selectionStart)].join('');
}

function link(txt, elementData){    
    if(elementData.selectionType === 'point'){
        const str = "[Link description](Link url)"
        return [txt.slice(0, elementData.selectionStart), str, txt.slice(elementData.selectionStart)].join('');
    }
    else{
        let sub = txt.substr(elementData.selectionStart, elementData.selectionLength)
        let str = `[${sub}](Link URL)`;
        return [txt.slice(0, elementData.selectionStart), str, txt.slice(elementData.selectionEnd)].join('');
    }
}

function image(txt, elementData){    
    if(elementData.selectionType === 'point'){
        const str = "![Link description](Image url)"
        return [txt.slice(0, elementData.selectionStart), str, txt.slice(elementData.selectionStart)].join('');
    }
    else{
        let sub = txt.substr(elementData.selectionStart, elementData.selectionLength)
        let str = `![${sub}](Image URL)`;
        return [txt.slice(0, elementData.selectionStart), str, txt.slice(elementData.selectionEnd)].join('');
    }
}

function checkElement(ref){

    var findings = {}

    if(ref.selectionStart === ref.selectionEnd){
        findings['selectionType'] = 'point'
    }
    else{
        findings['selectionType'] = 'selection'
        findings['selectionLength'] = ref.selectionEnd - ref.selectionStart;
    }

    findings['selectionStart'] = ref.selectionStart;
    findings['selectionEnd'] = ref.selectionEnd;
    findings['length'] = ref.textLength;


    return findings;
}

export function doOperation(operation, text, ref){
    const elementData = checkElement(ref);
    switch(operation){        
        case 'h1':{
            return heading1(text,elementData, 1);
        }
        case 'h2':{
            return heading1(text,elementData, 2);
        }
        case 'h3':{
            return heading1(text,elementData, 3);
        }
        case 'h4':{
            return heading1(text,elementData, 4);
        }
        case 'link':{
            return link(text,elementData)
        }
        case 'image':{
            return image(text, elementData)
        }
        default:{
            break;
        }
    }
}