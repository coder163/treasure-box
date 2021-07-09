


export function generateTree(headers,postContent) {
    // let postContent = document.getElementById('post-content');
    // let headers = postContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let toc = [];
    for (let i = 0; i < headers.length; ++i) {
        let header = headers[i];

        toc.push({
            level: parseInt(header.tagName.substr(1)),
            anchor: header.id,
            title: escapeHtml(header.textContent)
        });
    }

    let baseLevel = baseLevelOfToc(toc);

    return tocToTree(toPerfectToc(toc, baseLevel), baseLevel);

}
// Escape @text to Html.
let escapeHtml = function(text) {
    // console.log(text)
    let map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

let toPerfectToc = function(p_toc, p_baseLevel) {
    let i=0;
    let curLevel = p_baseLevel - 1;
    let perfToc = [];
    for (i in p_toc) {
        let item = p_toc[i];

        // Insert empty header.
        while (item.level > curLevel + 1) {
            curLevel += 1;
            let tmp = { level: curLevel,
                anchor: '',
                title: '[EMPTY]'
            };
            perfToc.push(tmp);
        }

        perfToc.push(item);
        curLevel = item.level;
    }

    return perfToc;
};

// Return the topest level of @toc, starting from 1.
let baseLevelOfToc = function(p_toc) {
    let level = -1;
    let i;
    for (i in p_toc) {
        if (level === -1) {
            level = p_toc[i].level;
        } else if (level > p_toc[i].level) {
            level = p_toc[i].level;
        }
    }

    if (level === -1) {
        level = 1;
    }

    return level;
};
let tocToTree = function(p_toc, p_baseLevel) {
    let i=0;
    let front = '<li>';
    let ending = ['</li>'];
    let curLevel = p_baseLevel;

    for (i in p_toc) {
        let item = p_toc[i];
        if (item.level === curLevel) {
            front += '</li>';
            front += '<li>';
            front += itemToHtml(item);
        } else if (item.level > curLevel) {
            // assert(item.level - curLevel == 1)
            front += '<ul>';
            ending.push('</ul>');
            front += '<li>';
            front += itemToHtml(item);
            ending.push('</li>');
            curLevel = item.level;
        } else {
            while (item.level < curLevel) {
                let ele = ending.pop();
                front += ele;
                if (ele === '</ul>') {
                    curLevel--;
                }
            }
            front += '</li>';
            front += '<li>';
            front += itemToHtml(item);
        }
    }
    while (ending.length > 0) {
        front += ending.pop();
    }
    front = front.replace("<li></li>", "");
    front = '<ul>' + front + '</ul>';
    return front;
};

let itemToHtml = function(item) {
    let title=item.title.length>21?item.title.substring(0,19)+'...':item.title
    return '<a href="#' + item.anchor + '" data="' + item.anchor + '">' + title + '</a>';
};


export default {
    generateTree
}